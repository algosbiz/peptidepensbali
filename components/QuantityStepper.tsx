import { Minus, Plus } from "@phosphor-icons/react/ssr";
import { MAX_QUANTITY } from "@/lib/cart";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
};

// The "−  1  +" control used on product cards and in the cart.
// At the limits (1 and 99) the buttons use aria-disabled instead of disabled:
// a truly disabled button would throw keyboard focus back to the top of the page.
export default function QuantityStepper({ value, onChange, label }: QuantityStepperProps) {
  const atMin = value <= 1;
  const atMax = value >= MAX_QUANTITY;
  const buttonClass =
    "grid h-full w-8 place-items-center text-heading transition-colors hover:text-primary-dark aria-disabled:cursor-not-allowed aria-disabled:text-heading/25";

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-11 shrink-0 items-center rounded-full border border-line bg-white px-1"
    >
      <button
        type="button"
        onClick={() => !atMin && onChange(value - 1)}
        aria-disabled={atMin}
        aria-label="Decrease quantity"
        className={buttonClass}
      >
        <Minus size={14} weight="bold" aria-hidden="true" />
      </button>
      <span aria-live="polite" className="w-7 text-center text-[15px] font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => !atMax && onChange(value + 1)}
        aria-disabled={atMax}
        aria-label="Increase quantity"
        className={buttonClass}
      >
        <Plus size={14} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}
