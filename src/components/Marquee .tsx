import MarqueeText from "react-marquee-text";

interface Product {
  id: number;
  nameBn: string;
  price: number;
  unit: string;
  icon?: string;
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
        {products.map((product, index) => {
          const change =
            index % 3 === 0 ? 2.5 : index % 3 === 1 ? -1.8 : 1.2;

          const isUp = change > 0;

          const unit =
            unitBn[product.unit.toLowerCase()] || product.unit;

          return (
            <span
              key={product.id}
              className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm"
            >
              {/* Emoji */}
              <span>{product.icon || "🛒"}</span>

              {/* Name */}
              <span className="text-2xl text-black">
                {product.nameBn}
              </span>

              {/* Price */}
              <span className="text-2xl text-black">
                {product.price} টাকা/{unit}
              </span>

              {/* Arrow */}
              <span
                className={
                  isUp
                    ? "font-bold text-red-600"
                    : "font-bold text-green-600"
                }
              >
                {isUp ? "▲" : "▼"}
              </span>

              {/* Percentage */}
              <span className="text-black">
                {Math.abs(change)}%
              </span>

              {/* Separator */}
              <span className="mx-2 text-gray-600">|</span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;