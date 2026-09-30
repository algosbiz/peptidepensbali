import { ShoppingBag } from "@phosphor-icons/react/ssr";
import { useCart } from "@/lib/cart";

// The bag icon in the header. The small badge shows how many items are in the cart.
export default function CartButton() {
  const { count, open } = useCart();

  let label = "Open cart, empty";
  if (count === 1) label = "Open cart, 1 item";
  if (count > 1) label = `Open cart, ${count} items`;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={label}
      className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-heading transition-colors hover:border-heading"
    >
      <ShoppingBag size={22} aria-hidden="true" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-button-dark px-1 text-[11px] leading-none font-semibold text-white"
        >
          {count}
        </span>
      )}
    </button>
  );
}
