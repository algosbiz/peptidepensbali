// The Atlas Longevity online shop at peptidesbali.online (a WooCommerce shop).
// This site takes its prices, stock and pen types from the shop (see lib/shop-data.ts),
// and "Proceed to Checkout" hands the cart to the shop's checkout.
export const SHOP_URL = "https://peptidesbali.online";

// One way to buy a product (and dose) in the shop, e.g. Retatrutide 10 mg as a reusable pen.
export type ShopOffer = {
  shopId: number; // the shop's id for exactly this item, used in the checkout link
  penType?: string; // the shop's short code for the pen type, e.g. "reusable-pen" (pens only)
  penTypeName?: string; // the pen type as visitors see it, e.g. "Reusable Pen" (pens only)
  price: number; // in rupiah
  regularPrice: number; // in rupiah; higher than price while the shop has it on sale
  inStock: boolean;
};

// Every offer, grouped by product and dose (see offerKey). A product or dose that the shop
// doesn't sell has no entry, so it is ordered on WhatsApp.
export type ShopOffers = Record<string, ShopOffer[]>;

export function offerKey(productId: number, option?: string) {
  return option ? `${productId}|${option}` : `${productId}`;
}

// The offers (one per pen type) for a product and dose. Empty when the shop doesn't sell it.
export function getOffers(offers: ShopOffers, productId: number, option?: string) {
  return offers[offerKey(productId, option)] ?? [];
}

// The offer for a pen type. Without a pen type, the first one: the disposable pen.
export function findOffer(offers: ShopOffer[], penType?: string) {
  return penType ? offers.find((offer) => offer.penType === penType) : offers[0];
}

// 3300000 -> "Rp3,300,000", written the same way as on the shop.
export function formatPrice(rupiah: number) {
  return `Rp${rupiah.toLocaleString("en-US")}`;
}

// A link that opens the shop's checkout with the cart already filled in, e.g.
//   https://peptidesbali.online/checkout-link/?products=9752:2,4972:1
// Each "shopId:quantity" pair is one cart line (a WooCommerce feature).
// If a product sold out in the meantime, the shop leaves it out and says so at checkout.
export function getCheckoutUrl(lines: { shopId: number; quantity: number }[]) {
  const products = lines.map((line) => `${line.shopId}:${line.quantity}`).join(",");
  return `${SHOP_URL}/checkout-link/?products=${products}`;
}
