# Peptide Pens Bali website

The single-page website for **peptidepensbali.com** (Peptide Pens Bali by Atlas Longevity),
built with Next.js, TypeScript and Tailwind CSS.

It is a product catalogue with a simple cart, connected to the Atlas Longevity online shop
[peptidesbali.online](https://peptidesbali.online/) (WooCommerce). There are no payments,
accounts or database on this site:

- **Prices, stock and pen types** (disposable pen, reusable pen, cartridge) are read from the
  online shop automatically and refreshed every 10 minutes. Change a price in the shop and this
  site follows; nothing has to be typed in here.
- **Proceed to Checkout** takes visitors to the online shop's checkout with the same products
  already in its cart. There they pay.
- Products the online shop doesn't sell are ordered on WhatsApp instead, with the order already
  written.

The layout is shop-style: a header with product search and a "Browse categories" menu, a slider
with featured products at the top, the catalogue grouped by category, and on phones a toolbar
fixed to the bottom of the screen (Shop, Categories, Cart, WhatsApp).

---

## Run the website on your computer

You need [Node.js](https://nodejs.org) installed (version 20.9 or newer).

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser. The page updates automatically every time
you save a file.

### Testing on a phone, or sharing with ngrok

While `npm run dev` is running, Next.js only fully trusts `localhost`. If the site is opened
from another address, the page still shows but **no button works** (menu, cart, quantity,
Add to cart). `next.config.ts` therefore also allows:

- phones on the same Wi-Fi, e.g. `http://192.168.1.20:3000` (your computer's address)
- ngrok links ending in `.ngrok-free.app`

If you use another address or tunnel, add its hostname to `allowedDevOrigins` in
`next.config.ts` (the dev server restarts by itself when you save).

To share the site with a client, the production version is faster and behaves exactly like the
real website:

```bash
npm run build
npm run start
```

Then point ngrok at port 3000 (`ngrok http 3000`).

---

## Where things live

```
app/
  layout.tsx       SEO (page title, description, share image) and fonts
  page.tsx         The list of sections, in the order they appear on the page
  globals.css      Brand colours, heading styles and animations
components/        One file per section of the page (Hero, Products, FAQ, ...)
data/
  products.ts      Product categories and the products in each one
  faq.ts           FAQ questions and answers
lib/
  whatsapp.ts      WhatsApp number and pre-written messages (including the order message)
  shop.ts          The online shop address, price format and checkout link
  shop-data.ts     Reads prices, stock and pen types from the online shop (and how often)
  cart.ts          How the cart remembers products (you rarely need to touch this)
  site.ts          Website address, catalogue link and menu links
public/images/     All images (logo, hero, products, about, delivery, share image)
```

---

## How the cart works

1. Each product card has a **quantity picker** (− 1 +) and an **Add to cart** button.
   Products that come in several doses (e.g. Retatrutide 5 / 10 / 20 / 30 mg) also have a
   **dose picker**; the photo changes to match the chosen dose. Pens also have a **pen type**
   dropdown (Disposable Pen, Reusable Pen, Cartridge). The card shows the online shop's price for
   the chosen dose and pen type; if the shop has sold out of it, the button says
   **Out of stock**. Adding a product opens the cart panel on the right.
2. The **Cart** button in the header (and in the toolbar at the bottom of phone screens) shows
   how many items are in the cart and opens it.
3. In the cart, visitors can change quantities or remove products. The same product in two
   doses or two pen types shows as two separate lines. Each line shows its price, and the
   **Subtotal** adds them up.
4. **Proceed to Checkout** opens the checkout of the online shop at peptidesbali.online in a new
   tab, with the same products, doses, pen types and quantities already in the shop's cart, using
   a link like `https://peptidesbali.online/checkout-link/?products=9753:2,4976:1`. The visitor
   fills in their details and pays there (any delivery or payment fees are added there). Under
   the button, **Order on WhatsApp instead** sends the whole order on WhatsApp.
5. Products the online shop doesn't sell (they have no `shopId`, see below) show
   **Price on WhatsApp** on their card and are marked **Order on WhatsApp** in the cart, like
   anything that sold out after it was added. If the cart only has such products, Proceed to
   Checkout opens WhatsApp. If it has both kinds, an extra **Order the rest on WhatsApp** button
   sends just those. The WhatsApp message looks like:

   ```
   Hi Peptide Pens Bali, I'm contacting you from peptidepensbali.com.

   I'd like to order:

   • 1 × Semaglutide Pen
   • 1 × Retatrutide + Cagrilintide Pen (10 mg + 5 mg)

   Could you please confirm availability and delivery?
   ```

Good to know:

- The cart is saved in the visitor's own browser, so it is still there after a refresh. Nothing
  is sent anywhere until the visitor presses one of the checkout buttons.
- New products added to `data/products.ts` get an Add to cart button automatically. Give them a
  `shopId` so they can be bought online (see "Connect a product to the online shop" below).
- Prices and stock are at most 10 minutes old. If something sells out in between, the shop
  leaves it out of its cart and shows a message at checkout.
- To change the WhatsApp order message, edit `getCartMessage` in **`lib/whatsapp.ts`**.
- The cart panel is `components/CartDrawer.tsx`, the header cart button is
  `components/CartButton.tsx`, and the product card buttons are `components/AddToCart.tsx`.
- Each card also keeps an **Ask on WhatsApp** link for questions about one product.

---

## Common changes

### Change a product, or add a new one

Open **`data/products.ts`**. Each product is one block. A pen with several doses:

```ts
{
  id: 57,
  name: "New Peptide Pen",
  category: "recovery",
  format: "Disposable peptide pen",
  image: "/images/products/new-peptide-pen-5-mg.webp",
  options: [
    { label: "5 mg", image: "/images/products/new-peptide-pen-5-mg.webp" },
    { label: "10 mg", image: "/images/products/new-peptide-pen-10-mg.webp" },
  ],
},
```

- `options` is optional. Leave it out for bundles, protocols and accessories. With one option
  (e.g. `[{ label: "10 mg" }]`) the dose is simply shown on the card; with several, visitors
  choose one. An option only needs its own `image` if its photo is different.
- `tag` is optional: a small label above the name, used for the protocol goal
  (e.g. `tag: "Fat Loss Stacks"`).

To add a product, copy a block, paste it into the list, give it a **new** `id` that no product has
used before (the highest is 62 now), and set `category` to the `id` of one of the categories at
the top of the same file:

| `category` id       | Shown as                         |
| ------------------- | -------------------------------- |
| `weight-management` | 01 Weight Management Pens        |
| `recovery`          | 02 Recovery Pens                 |
| `wellness`          | 03 Wellness Pens                 |
| `longevity`         | 04 Longevity Pens                |
| `performance`       | 05 Muscle Growth & Performance Pens |
| `focus-sleep`       | 06 Focus & Sleep Pens            |
| `libido`            | 07 Libido & Sexual Wellness Pens |
| `nasal-sprays`      | 08 Nasal Spray Peptides          |
| `bundles`           | 09 Bundles                       |
| `protocols`         | 10 Peptide Protocols             |
| `accessories`       | 11 Pen Accessories & Services    |

Its dose picker, quantity picker, Add to cart button and WhatsApp link are created
automatically, and its category button at the top of the catalogue shows the new count.

Never change or reuse an existing `id`: visitors' saved carts remember products by their id. If two
products share an id, or a product uses a category that doesn't exist, the site stops with an error
message telling you what to fix.

To add a whole new category row, add a block to the `categories` list at the top of the file
(`label` is the short name used on its button).

The product names, doses and photos follow the full catalogue at
[peptidesbali.online](https://peptidesbali.online/). Prices are never typed into this file: they
come from the online shop (see below).

### Connect a product to the online shop

A product shows a price, a pen type dropdown and can be checked out online only if it has a
`shopId`: its id in the shop at peptidesbali.online.

- A product **without doses** (bundles, protocols, accessories, nasal sprays) gets
  `shopId: 1234,` next to its `image`.
- A product **with doses** gets a `shopId` on each dose instead, for the **disposable pen** version:
  `{ label: "10 mg", image: "...", shopId: 9753 }`. The reusable pen and cartridge of the same
  dose are found from it automatically, with their own prices.
- A product or dose without a `shopId` shows "Price on WhatsApp" and is ordered on WhatsApp.

To find an id, open `https://peptidesbali.online/wp-json/wc/store/v1/products?search=NAME` in a
browser (replace NAME, e.g. `tesamorelin`). Each product shows its `"id"`. For a product with doses,
look under `"variations"`: each one lists its own `"id"` with its `"Pen Type"` and `"MG"`. If the
shop ever deletes and re-creates a product, its id changes, so update it here too.

### Prices, stock and pen types (automatic)

`lib/shop-data.ts` reads the online shop's public product list and the page is rebuilt in the
background **every 10 minutes** (`SHOP_REFRESH_SECONDS`). So:

- a new price, a sale price (shown crossed out next to the new one), or a product that sells out
  or comes back in stock shows on this site within about 10 minutes;
- a new pen type that the shop adds to a pen shows up in its dropdown by itself;
- a new **dose** or a new **product** still has to be added to `data/products.ts` (it needs a
  photo and a `shopId`).

If the shop can't be reached at that moment, the site simply keeps showing the last prices it
read and tries again on the next visit. A new deployment, however, needs the shop: if
peptidesbali.online is down while Vercel builds the site, that build fails and the previous
version stays online. Just redeploy once the shop is back.

### Choose the products in the slider

The slider at the top of the page shows the products listed in `featuredProductIds`, near the top
of **`data/products.ts`**:

```ts
export const featuredProductIds = [1, 2, 10, 4, 7, 17];
```

Use the product `id`s, in the order the slides should appear. The slide text (category, available
doses, "View product" link) is filled in from the product automatically. The slider only moves
when visitors use the arrows, the dots, a swipe or the arrow keys.

### Product search

The search box in the header (the magnifying glass on phones) needs no upkeep: it searches every
product in `data/products.ts` by name, category, format, protocol goal and dose. Picking a result
scrolls to that product's card and briefly outlines it in gold.

### Add or replace a product image

Put the image in **`public/images/products/`** and make sure the `image` path in
`data/products.ts` matches the file name.

- Best shape for **pens and nasal sprays: square**, for example 1200 × 1200 pixels (the same as
  the current pen photos).
- Best shape for **bundles, protocols and accessories: 3:2**, for example 1200 × 800 pixels. These
  rows have `widePhotos: true` in the `categories` list, which gives their cards a wide picture
  frame. Other shapes work but get cropped to fit the frame, so for a picture with text on it,
  first add plain space around it until it has the right shape.
- `.webp` or `.jpg` both work; the site resizes images automatically and sends them as AVIF
  (or WebP to older browsers), so they load quickly on phones.
- `semaglutide-peptide-pen-bali.webp` is a temporary placeholder, because there is no Semaglutide
  pen photo yet. Save the real (square) photo with the same file name and it will appear with no
  code changes.
- Keep photos light: use `.webp`. The current pen photos are the client's own compressed WebP
  files (about 45-55 KB each); if you only have a PNG, export it as `.webp` at about 80% quality.

### Change the WhatsApp number or messages

Open **`lib/whatsapp.ts`**.

- `WHATSAPP_NUMBER`: digits only, starting with the country code (62 for Indonesia), no `+`.
- `WHATSAPP_DISPLAY_NUMBER`: the same number written nicely, shown in the header and footer.
- `WHATSAPP_MESSAGES`, `getProductMessage` and `getCartMessage` (the cart's WhatsApp order
  message): the text that appears in WhatsApp.
- `WHATSAPP_GREETING`: the first line of **every** message, so the team knows the chat came
  from this website: "Hi Peptide Pens Bali, I'm contacting you from peptidepensbali.com." The
  domain comes from `SITE_URL` in `lib/site.ts`.

### Change the FAQ

Open **`data/faq.ts`**. Each question has a `question` and an `answer`. Add an optional `link`
if the answer should end with a clickable link.

### Change text on the page

Open the matching file in **`components/`**:

| Section on the page                              | File                  |
| ------------------------------------------------ | --------------------- |
| Gold bar, logo, menu and the header's WhatsApp contact | `Header.tsx` (links: `lib/site.ts`) |
| Product search in the header                     | `SearchBox.tsx`       |
| "Browse categories" button (laptops)             | `CategoryMenu.tsx`    |
| Toolbar at the bottom of phone screens           | `MobileToolbar.tsx`   |
| Featured product slider at the top               | `ProductSlider.tsx` (products: `featuredProductIds` in `data/products.ts`) |
| "Peptide Pens Bali" headline and pen photo       | `Hero.tsx`            |
| "Looking for peptide pens in Bali?" + checklist  | `Intro.tsx`           |
| Product catalogue                                | `Products.tsx` + `ProductCard.tsx` (products: `data/products.ts`) |
| "What Are Peptide Pens?" and the advantages      | `AboutPens.tsx`       |
| Pens vs vials comparison                         | `Comparison.tsx`      |
| "Who Uses Peptide Pens?"                         | `WhoUses.tsx`         |
| Delivery areas                                   | `Delivery.tsx`        |
| Injectables, nasal sprays, research peptides     | `MoreProducts.tsx`    |
| Why Atlas Longevity + Customer Support           | `WhyAtlas.tsx`        |
| FAQ                                              | `FAQ.tsx` (questions: `data/faq.ts`) |
| Black "Order Peptide Pens in Bali Today" block   | `WhatsAppCTA.tsx`     |
| Footer                                           | `Footer.tsx`          |
| Round WhatsApp button (bottom right, laptops only) | `FloatingWhatsApp.tsx` |

Lists such as the delivery areas or the checklists are written at the top of their file, so you
can edit them without touching the layout below.

### Change the brand colours

Open **`app/globals.css`**. The colours are at the top:

| Name            | Colour    | Used for                                                  |
| --------------- | --------- | --------------------------------------------------------- |
| `primary`       | `#bc8222` | Brand gold: buttons, highlights, logo colour              |
| `primary-dark`  | `#8c5e12` | Gold for small text, so it stays readable on light backgrounds |
| `primary-light` | `#f3e7d0` | Soft gold tint (icon circles)                             |
| `secondary`     | `#0b0b0b` | Brand ink: dark cards and the black call-to-action        |
| `accent`        | `#f4f1e8` | Warm cream section background                             |
| `background`    | `#ffffff` | Page background                                           |
| `heading`       | `#0b0b0b` | Headings                                                  |
| `body`          | `#666666` | Paragraph text                                            |
| `line`          | `#e7e0d0` | Thin borders                                              |
| `surface`       | `#f9f7f2` | Very light warm grey: header row with the search, footer  |
| `button`        | `#a0691a` | Main buttons: top of the deep gold gradient (white text)  |
| `button-dark`   | `#8a5810` | Main buttons: bottom of the gradient and hover colour     |

The main buttons ("View product", "Add to cart", "Browse Peptide Pens", the search button, the
round WhatsApp button) use `button` and `button-dark`. Keep them this dark: white text needs a
dark enough background to stay readable.

Change a value and it updates everywhere on the site. In the components these appear as class
names like `bg-primary` or `text-heading`.

### Change the fonts

Fonts are loaded in **`app/layout.tsx`** (Poppins for headings, Inter for everything else) and
connected to Tailwind in `app/globals.css` under "FONTS".

### Change SEO (Google title, description, share image)

Open **`app/layout.tsx`** and edit `title`, `description` and `shareImage`. The share image
(shown when the link is posted on WhatsApp, Facebook, etc.) is
`public/images/og/peptide-pens-bali-og.jpg` (1200 × 630 pixels).

The website address used for SEO is `SITE_URL` in **`lib/site.ts`**. The sitemap and robots
file (`app/sitemap.ts`, `app/robots.ts`) are generated from it automatically.

### Change the order of sections

Open **`app/page.tsx`** and move the lines around. Each line is one section.

---

## Publish the website

Check that everything builds without errors:

```bash
npm run build
```

The simplest way to host a Next.js site is [Vercel](https://vercel.com): import the project,
keep the default settings, then point the `peptidepensbali.com` domain at it.

---

## Good to know

- **No database or admin panel.** All content is in the files above; edit, save, publish.
- **Menu links** (`#pens`, `#faq`, ...) jump to the section with the matching `id` in its
  component, for example `<section id="faq">` in `FAQ.tsx`. These are the same links the old
  site used, so existing bookmarks keep working. Every product card and category row has its own
  link too (`#product-4`, `#category-bundles`, ...), which the search, the slider and the
  category menus use.
- **Search engine data** (the invisible "structured data" that describes the business and the
  FAQ to Google) is built automatically from `lib/whatsapp.ts`, `lib/site.ts` and `data/faq.ts`.
- **Replaced an image but still see the old one?** The browser keeps a copy. Do a hard refresh
  (Ctrl + Shift + R) or clear the browser cache.
