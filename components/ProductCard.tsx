import Image from "next/image";
import AddToCart from "./AddToCart";
import type { Product } from "@/data/products";

// One product in the catalogue. The same card is reused for every product;
// only the data passed in changes.
export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex-1 px-5 pt-5 pb-4">
        <h4 className="font-heading text-lg font-semibold text-heading">{product.name}</h4>
        <p className="mt-1 text-sm text-body">{product.format}</p>
      </div>

      <AddToCart product={product} />
    </article>
  );
}
