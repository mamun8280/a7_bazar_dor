
import Link from "next/link";
import MarqueeText from "react-marquee-text";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit?: string;
  image?: string;
  today: number;
  change?: {
    dir?: "up" | "down" | "flat";
    pct?: number;
  };
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  kilograms: "কেজি",
  g: "গ্রাম",
  gram: "গ্রাম",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  ml: "মিলিলিটার",
  piece: "পিস",
  pieces: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
  maund: "মণ",
};

const toBanglaNumber = (value: number | string) =>
  String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );

const Marquee = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 60 },
      }
    );

    if (res.ok) {
      const data: unknown = await res.json();

      if (Array.isArray(data)) {
        products = data as Product[];
      } else if (
        typeof data === "object" &&
        data !== null &&
        "products" in data &&
        Array.isArray(data.products)
      ) {
        products = data.products as Product[];
      }
    }
  } catch (error) {
    console.error("Failed to fetch marquee products:", error);
  }

  if (products.length === 0) {
    return (
      <div className="border-y border-gray-200 bg-white px-4 py-3 text-center text-sm text-gray-500">
        বাজারের পণ্যের দাম লোড করা যাচ্ছে না।
      </div>
    );
  }

  return (
    <div
      aria-label="সর্বশেষ পণ্যের দাম ও পরিবর্তন"
      className="w-full overflow-hidden border-y border-gray-200 bg-white py-2 text-gray-900"
    >
      <MarqueeText direction="right" duration={30}>
        {products.map((product) => {
          const unitKey = product.unit?.toLowerCase() ?? "";
          const unit = unitBn[unitKey] ?? product.unit ?? "";

          const direction = product.change?.dir ?? "flat";
          const percentage = product.change?.pct ?? 0;

          const isUp = direction === "up";
          const isDown = direction === "down";

          const arrow = isUp ? "▲" : isDown ? "▼" : "—";

          const changeColor = isUp
            ? "text-green-700"
            : isDown
              ? "text-red-600"
              : "text-gray-500";

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
              className="mx-3 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-1 py-1 transition-opacity hover:opacity-70 sm:mx-5 sm:gap-3"
            >
              <span
                aria-hidden="true"
                className="text-lg sm:text-xl"
              >
                {product.image || "🛒"}
              </span>

              <span className="text-sm font-medium text-gray-800 sm:text-base">
                {product.nameBn}
              </span>

              <span className="text-sm font-semibold text-gray-950 sm:text-base">
                {toBanglaNumber(product.today)} টাকা
                {unit ? `/${unit}` : ""}
              </span>

              <span
                className={`inline-flex items-center gap-1 text-xs font-bold sm:text-sm ${changeColor}`}
              >
                <span aria-hidden="true">{arrow}</span>
                <span>{toBanglaNumber(percentage)}%</span>
              </span>

              <span
                aria-hidden="true"
                className="ml-1 text-gray-300"
              >
                |
              </span>
            </Link>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
