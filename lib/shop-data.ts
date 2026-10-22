import { products } from "@/data/products";
import { SHOP_URL, offerKey, type ShopOffer, type ShopOffers } from "./shop";

// READING PRICES FROM THE ONLINE SHOP
// Prices, stock and pen types are not typed into this website: they are read from the
// shop's public product list at peptidesbali.online. Change a price in the shop and this
// site shows it within SHOP_REFRESH_SECONDS. Only runs on the server.

// How often (in seconds) the site re-reads the shop. 600 = every 10 minutes.
export const SHOP_REFRESH_SECONDS = 600;

// The name of the shop's product option that holds the pen type
// (Disposable Pen, Reusable Pen, Cartridge).
const PEN_TYPE = "Pen Type";

// The parts of the shop's answers that this site uses.
type ShopPrices = { price: string; regular_price: string; currency_minor_unit: number };
type ShopItem = { id: number; prices: ShopPrices; is_in_stock: boolean; is_purchasable: boolean };
type ShopProduct = ShopItem & {
  type: string;
  attributes: { name: string; terms: { name: string; slug: string }[] }[];
  variations: { id: number; attributes: { name: string; value: string }[] }[];
};
type ShopVariation = ShopItem & { parent: number };

// Tries up to 3 times, because a request to the shop now and then fails for a moment.
// If it keeps failing, the error stops the update: visitors keep seeing the last prices
// that were read successfully (and a new deployment fails instead of going live without them).
async function fetchWithRetry(url: string) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, { next: { revalidate: SHOP_REFRESH_SECONDS } });
      if (response.ok) return response;
      throw new Error(`peptidesbali.online answered ${response.status} for ${url}`);
    } catch (error) {
      if (attempt === 3) throw error;
    }
  }
}

// Reads every page of a product list from the shop (100 items per page).
async function fetchAll<T>(query: string): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const response = await fetchWithRetry(
      `${SHOP_URL}/wp-json/wc/store/v1/products?${query}&per_page=100&page=${page}`
    );
    items.push(...((await response.json()) as T[]));
    if (page >= Number(response.headers.get("X-WP-TotalPages") ?? 1)) return items;
  }
}

function toOffer(item: ShopItem, penType?: { slug: string; name: string }): ShopOffer[] {
  // The shop sends prices in cents (sen), so 330000000 means Rp3,300,000.
  const unit = 10 ** item.prices.currency_minor_unit;
  const price = Number(item.prices.price) / unit;
  if (!item.is_purchasable || !(price > 0)) return [];
  return [
    {
      shopId: item.id,
      penType: penType?.slug,
      penTypeName: penType?.name,
      price,
      regularPrice: Math.max(price, Number(item.prices.regular_price) / unit || 0),
      inStock: item.is_in_stock,
    },
  ];
}

// Every product and dose on this site that has a shopId (data/products.ts), with the ways
// the shop sells it: one offer per pen type, each with its price and stock.
export async function getShopOffers(): Promise<ShopOffers> {
  const fields = "id,type,prices,is_in_stock,is_purchasable,attributes,variations,parent";
  const [shopProducts, shopVariations] = await Promise.all([
    fetchAll<ShopProduct>(`_fields=${fields}`),
    fetchAll<ShopVariation>(`type=variation&_fields=${fields}`),
  ]);
  const productsById = new Map(shopProducts.map((item) => [item.id, item]));
  const variationsById = new Map(shopVariations.map((item) => [item.id, item]));

  // A shopId is either a whole product (a bundle, nasal spray or accessory), or one
  // variation of a pen: one dose as a disposable pen. For a pen, the same dose in the
  // other pen types is found automatically, so new pen types in the shop appear here too.
  function offersFor(shopId: number): ShopOffer[] {
    const variation = variationsById.get(shopId);
    if (!variation) {
      const item = productsById.get(shopId);
      return item?.type === "simple" ? toOffer(item) : [];
    }

    const parent = productsById.get(variation.parent);
    const chosen = parent?.variations.find((v) => v.id === shopId);
    if (!parent || !chosen) return [];
    const penTypeNames = parent.attributes.find((a) => a.name === PEN_TYPE)?.terms ?? [];

    // Same dose = every option except the pen type matches the chosen variation.
    const sameDose = parent.variations.filter((v) =>
      chosen.attributes.every(
        (a) => a.name === PEN_TYPE || v.attributes.some((b) => b.name === a.name && b.value === a.value)
      )
    );
    // The chosen variation (the disposable pen) first, then the others in the shop's order.
    sameDose.sort((a, b) => Number(b.id === shopId) - Number(a.id === shopId));

    return sameDose.flatMap((v) => {
      const item = variationsById.get(v.id);
      const slug = v.attributes.find((a) => a.name === PEN_TYPE)?.value;
      const name = penTypeNames.find((term) => term.slug === slug)?.name;
      return item ? toOffer(item, slug && name ? { slug, name } : undefined) : [];
    });
  }

  const offers: ShopOffers = {};
  for (const product of products) {
    if (product.shopId) offers[offerKey(product.id)] = offersFor(product.shopId);
    for (const option of product.options ?? []) {
      if (option.shopId) offers[offerKey(product.id, option.label)] = offersFor(option.shopId);
    }
  }
  return offers;
}
