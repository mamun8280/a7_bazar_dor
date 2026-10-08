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
    return (
      <main className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            পণ্যটি পাওয়া যায়নি
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-8 md:flex-row">

            {/* Product Image */}
            <div className="flex h-64 items-center justify-center rounded-2xl bg-green-50 text-8xl md:w-1/2">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <p className="text-sm font-medium text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {product.unit}
              </p>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-4xl font-bold text-gray-900">
                  {product.today} টাকা
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    গতকাল
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {product.yesterday} টাকা
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    গত সপ্তাহ
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {product.lastWeek} টাকা
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    গত মাস
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {product.lastMonth} টাকা
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    product.change.dir === "up"
                      ? "bg-green-100 text-green-700"
                      : product.change.dir === "down"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {product.change.pct}%
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