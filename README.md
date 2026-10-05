# Peptide Pens Bali website

The single-page website for **peptidepensbali.com** (Peptide Pens Bali by Atlas Longevity),
built with Next.js, TypeScript and Tailwind CSS.

It is a product catalogue with a simple cart, not a full shop: there are no prices, payments,
accounts or database. Visitors add products to the cart, and **Proceed to Checkout** opens
WhatsApp with the whole order already written. The Atlas Longevity team confirms price,
availability and delivery in the chat.

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
  whatsapp.ts      WhatsApp number and pre-written messages (including the checkout message)
  cart.ts          How the cart remembers products (you rarely need to touch this)
  site.ts          Website address, catalogue link and menu links
public/images/     All images (logo, hero, products, about, delivery, share image)
```

---

## How the cart works

1. Each product card has a **quantity picker** (− 1 +) and an **Add to cart** button.
   Products that come in several doses (e.g. Retatrutide 5 / 10 / 20 / 30 mg) also have a
   **dose picker**; the photo changes to match the chosen dose. Adding a product opens the cart
   panel on the right.
2. The **bag icon** in the header shows how many items are in the cart and opens it.
3. In the cart, visitors can change quantities or remove products. The same product in two
   doses shows as two separate lines.
4. **Proceed to Checkout** opens WhatsApp with a message like:

   ```
   Hi Peptide Pens Bali, I'm contacting you from peptidepensbali.com.

   I'd like to order:

   • 2 × Retatrutide Pen (10 mg)
   • 1 × Summer Cut Bundle

   Could you please confirm availability and delivery?
   ```

Good to know:

- The cart is saved in the visitor's own browser, so it is still there after a refresh. Nothing
  is sent anywhere until the visitor presses Proceed to Checkout.
- New products added to `data/products.ts` get an Add to cart button automatically.
- To change the checkout message, edit `getCartMessage` in **`lib/whatsapp.ts`**.
- The cart panel is `components/CartDrawer.tsx`, the header bag icon is
  `components/CartButton.tsx`, and the product card buttons are `components/AddToCart.tsx`.
- Each card also keeps an **Or ask on WhatsApp** link for questions about one product.

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
used before (the highest is 56 now), and set `category` to the `id` of one of the categories at
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
[peptidesbali.online](https://peptidesbali.online/). Prices are not shown on this site; the team
confirms them on WhatsApp.

### Add or replace a product image

Put the image in **`public/images/products/`** and make sure the `image` path in
`data/products.ts` matches the file name.

- Best shape: **3:2**, for example 1200 × 800 pixels (the same as the current product photos).
  Other shapes work but get cropped to 3:2. For a square or tall picture with text on it, first
  add plain space on the left and right so it becomes 3:2 (that is how the bundle, protocol and
  accessory pictures were prepared).
- `.webp` or `.jpg` both work; the site converts and resizes images automatically.
- `semaglutide-pen.webp` is a temporary placeholder, because there is no Semaglutide pen photo
  yet. Save the real photo with the same file name and it will appear with no code changes.

### Change the WhatsApp number or messages

Open **`lib/whatsapp.ts`**.

- `WHATSAPP_NUMBER`: digits only, starting with the country code (62 for Indonesia), no `+`.
- `WHATSAPP_DISPLAY_NUMBER`: the same number written nicely, shown in the footer.
- `WHATSAPP_MESSAGES`, `getProductMessage` and `getCartMessage` (the Proceed to Checkout
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
| Gold bar and top menu                            | `Header.tsx` (links: `lib/site.ts`) |
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
| Round WhatsApp button (bottom right)             | `FloatingWhatsApp.tsx` |

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
| `button`        | `#a0691a` | Main buttons: top of the deep gold gradient (white text)  |
| `button-dark`   | `#8a5810` | Main buttons: bottom of the gradient and hover colour     |

The main buttons (header "Chat on WhatsApp", "Browse Peptide Pens", the round WhatsApp
button) use `button` and `button-dark`. Keep them this dark: white text needs a dark enough
background to stay readable.

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
  site used, so existing bookmarks keep working.
- **Search engine data** (the invisible "structured data" that describes the business and the
  FAQ to Google) is built automatically from `lib/whatsapp.ts`, `lib/site.ts` and `data/faq.ts`.
- **Replaced an image but still see the old one?** The browser keeps a copy. Do a hard refresh
  (Ctrl + Shift + R) or clear the browser cache.
