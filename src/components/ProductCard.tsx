import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  pieces: "পিস",
  dozen: "ডজন",
  maund: "মণ",
};

const toBanglaNumber = (value: number | string) => {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const unit = unitBn[product.unit?.toLowerCase()] || product.unit;

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  const changeColor =
    product.change.dir === "up"
      ? "bg-green-100 text-green-700"
      : product.change.dir === "down"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
       
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-4xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

       
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-gray-900">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            প্রতি {unit}
          </p>
        </div>
      </div>

     
      <div className="mt-5 pt-1">
        <p className="text-sm text-gray-500">
          আজকের দাম
        </p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-xl font-bold text-gray-900">
            {toBanglaNumber(product.today)} টাকা
          </p>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${changeColor}`}
          >
            {changeIcon} {toBanglaNumber(product.change.pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;