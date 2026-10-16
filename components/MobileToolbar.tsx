import { ShoppingBag, SquaresFour, Storefront, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { useCart } from "@/lib/cart";
import { WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/whatsapp";

// The bar stuck to the bottom of the screen on phones: shop, categories, cart and
// WhatsApp are always one tap away. Hidden on laptops and desktops.
export default function MobileToolbar({ onOpenCategories }: { onOpenCategories: () => void }) {
  const { count, open } = useCart();
  const item =
    "flex h-16 w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold text-heading";

  return (
    <nav
      aria-label="Shortcuts"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-4">
        <li>
          <a href="#pens" className={item}>
            <Storefront size={22} aria-hidden="true" />
            Shop
          </a>
        </li>
        <li>
          <button type="button" onClick={onOpenCategories} className={item}>
            <SquaresFour size={22} aria-hidden="true" />
            Categories
          </button>
        </li>
        <li>
          <button type="button" onClick={open} className={item}>
            <span className="relative">
              <ShoppingBag size={22} aria-hidden="true" />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-2.5 grid h-4 min-w-4 place-items-center rounded-full bg-button-dark px-1 text-[10px] leading-none text-white"
                >
                  {count}
                </span>
              )}
            </span>
            Cart
            {count > 0 && (
              <span className="sr-only">
                , {count} {count === 1 ? "item" : "items"}
              </span>
            )}
          </button>
        </li>
        <li>
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className={item}
          >
            <WhatsappLogo size={22} weight="fill" className="text-primary-dark" aria-hidden="true" />
            WhatsApp
          </a>
        </li>
      </ul>
    </nav>
  );
}
