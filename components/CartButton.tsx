import { ShoppingBag } from "@phosphor-icons/react/ssr";
import { useCart } from "@/lib/cart";

// The bag icon in the header. The small badge shows how many items are in the cart.
// With `labelled`, "Cart" and the item count are also written next to the icon.
export default function CartButton({ labelled = false }: { labelled?: boolean }) {
  const { count, open } = useCart();
  const items = `${count} ${count === 1 ? "item" : "items"}`;

  return (
    <button
      type="button"
      onClick={open}
      // Icon-only version: screen readers need a spoken name. The labelled version
      // uses its visible text instead.
      aria-label={labelled ? undefined : count ? `Open cart, ${items}` : "Open cart, empty"}
      className="group flex shrink-0 items-center gap-3 text-left"
    >
      {/* Desktop (labelled): a dark circle that matches the "Browse categories" button.
          Phones: an outlined circle like the menu and search buttons next to it. */}
      <span
        className={`relative grid h-11 w-11 place-items-center rounded-full transition-colors ${
          labelled
            ? "bg-secondary text-white group-hover:bg-[#262626]"
            : "border border-line text-heading group-hover:border-heading"
        }`}
      >
        <ShoppingBag size={labelled ? 20 : 22} aria-hidden="true" />
        {count > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-button-dark px-1 text-[11px] leading-none font-semibold text-white ring-2 ring-white"
          >
            {count}
          </span>
        )}
      </span>
      {labelled && (
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-heading">Cart</span>
          <span className="sr-only">, </span>
          <span className="block text-xs text-body">{items}</span>
        </span>
      )}
    </button>
  );
}
