import { notFound } from "next/navigation";

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

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

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

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const unit =
    unitBn[product.unit?.toLowerCase()] || product.unit;

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
    <main className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-8 md:flex-row">

            {/* Product Image */}
            <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-green-50 text-8xl md:w-1/2">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <p className="text-sm font-medium text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {unit}
              </p>

              {/* Today's Price */}
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {toBanglaNumber(product.today)} টাকা
                </p>
              </div>

              {/* Price History */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    গতকাল
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {toBanglaNumber(product.yesterday)} টাকা
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    গত সপ্তাহ
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {toBanglaNumber(product.lastWeek)} টাকা
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    গত মাস
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {toBanglaNumber(product.lastMonth)} টাকা
                  </p>
                </div>
              </div>

              {/* Price Change */}
              <div className="mt-6">
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${changeColor}`}
                >
                  {changeIcon}{" "}
                  {toBanglaNumber(product.change.pct)}%
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;