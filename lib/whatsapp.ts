import { SITE_URL } from "./site";

// The WhatsApp number that receives every enquiry from the website.
// International format, digits only: no "+", spaces or dashes (62 = Indonesia).
export const WHATSAPP_NUMBER = "6282326300167";

// The same number written for people to read. Shown in the footer.
// If you change the number above, update this one too.
export const WHATSAPP_DISPLAY_NUMBER = "+62 823-2630-0167";

// The first line of EVERY message, so the team can see the chat came from this website.
// The domain is taken from SITE_URL in lib/site.ts.
export const WHATSAPP_GREETING = `Hi Peptide Pens Bali, I'm contacting you from ${new URL(SITE_URL).hostname}.`;

// Pre-written messages, so visitors never start with an empty chat.
// The greeting above is added in front of each one automatically.
export const WHATSAPP_MESSAGES = {
  general: "I'd like to ask about your peptide pens.",
  delivery: "I'd like to check peptide pen delivery availability for my area in Bali.",
};

// The message sent from a product card. The product name is filled in automatically,
// so new products in data/products.ts get their own message without extra work.
export function getProductMessage(productName: string) {
  return `I'm interested in the ${productName}. Could you please provide more information?`;
}

// The order message the cart sends on WhatsApp: one line per product. It is used for
// products that can't be bought online, and when a visitor prefers to order on WhatsApp.
// The team confirms prices and delivery in the chat.
export function getCartMessage(lines: { name: string; quantity: number }[]) {
  const list = lines.map((line) => `• ${line.quantity} × ${line.name}`).join("\n");
  return `I'd like to order:\n\n${list}\n\nCould you please confirm availability and delivery?`;
}

// Turns a message into a link that opens WhatsApp with the greeting and the
// message already typed in.
export function getWhatsAppUrl(message: string) {
  const text = `${WHATSAPP_GREETING}\n\n${message}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
