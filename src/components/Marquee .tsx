import MarqueeText from "react-marquee-text";

interface Product {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
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

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <div className="border-y border-gray-200 bg-white py-2 text-black">
      <MarqueeText direction="right" duration={30}>
        {products.map((product) => {
          const unit =
            unitBn[product.unit?.toLowerCase()] || product.unit;

          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          const arrow =
            isUp ? "▲" : isDown ? "▼" : "—";

          const arrowColor =
            isUp
              ? "text-green-600"
              : isDown
                ? "text-red-600"
                : "text-gray-500";

          return (
            <span
              key={product.id}
              className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm"
            >
              {/* Product Icon */}
              <span className="text-2xl">
                {product.image || "🛒"}
              </span>

              {/* Product Name */}
              <span className="font-medium text-2xl text-black">
                {product.nameBn}
              </span>

              {/* Price */}
              <span className="font-semibold text-2xl text-black">
                {toBanglaNumber(product.today)} টাকা/{unit}
              </span>

              {/* Change */}
              <span className={`font-bold ${arrowColor}`}>
                {arrow}
              </span>

              {/* Percentage */}
              <span className="text-black text-2xl">
                {toBanglaNumber(product.change.pct)}%
              </span>

              {/* Separator */}
              <span className="mx-2 text-gray-400">
                |
              </span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
