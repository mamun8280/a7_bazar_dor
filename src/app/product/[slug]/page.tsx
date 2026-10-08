import Link from "next/link";
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
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
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

  // Price Summary
  const minimumPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const maximumPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const averagePrice =
    product.markets.reduce(
      (total, market) =>
        total + (market.min + market.max) / 2,
      0
    ) / product.markets.length;

  // Group markets by division
  const marketsByDivision = product.markets.reduce(
    (groups, market) => {
      if (!groups[market.division]) {
        groups[market.division] = [];
      }

      groups[market.division].push(market);

      return groups;
    },
    {} as Record<string, Product["markets"]>
  );

  return (
    <main className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">

        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/"
            className="font-medium text-gray-500 transition hover:text-green-700"
          >
            হোম
          </Link>

          <span className="text-gray-400">›</span>

          <Link
            href={`/category/${product.category}`}
            className="font-medium text-gray-500 transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span className="text-gray-400">›</span>

          <span className="font-semibold text-gray-900">
            {product.nameBn}
          </span>
        </div>

        {/* Product Summary */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-8 md:flex-row">

            {/* Product Image */}
            <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-green-50 text-8xl md:w-1/2">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            {/* Product Info */}
            <div className="flex-1">

              {/* Category + Unit */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  প্রতি {unit}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                বিভিন্ন বাজারে {product.nameBn}-এর আজকের
                বাজারদর, সর্বনিম্ন ও সর্বোচ্চ দাম এক নজরে দেখুন।
              </p>

              {/* Today's Price */}
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {toBanglaNumber(product.today)} টাকা
                  <span className="ml-2 text-base font-normal text-gray-500">
                    / {unit}
                  </span>
                </p>
              </div>

              {/* Price Change */}
              <div className="mt-4">
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

        {/* Price Summary */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              দামের সারসংক্ষেপ
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              বিভিন্ন বাজারের আজকের দামের সারসংক্ষেপ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Minimum */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700">
                {toBanglaNumber(minimumPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit}
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {toBanglaNumber(maximumPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit}
              </p>
            </div>

            {/* Average */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {toBanglaNumber(averagePrice.toFixed(1))} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit}
              </p>
            </div>
          </div>
        </section>

    
        {/* Market Wise Price */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              বিভিন্ন বাজারে {product.nameBn}-এর সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <div className="space-y-6">
            {Object.entries(marketsByDivision).map(
              ([division, markets]) => (
                <div key={division}>

                  {/* Division */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-600" />

                    <h3 className="text-lg font-bold text-gray-900">
                      {division}
                    </h3>
                  </div>

                  {/* Markets */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {markets.map((market) => (
                      <div
                        key={`${market.division}-${market.market}`}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {market.market}
                            </h4>

                            <p className="mt-1 text-xs text-gray-500">
                              {market.division}
                            </p>
                          </div>

                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                            আজ
                          </span>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">

                          {/* Minimum */}
                          <div className="rounded-xl bg-green-50 p-3">
                            <p className="text-xs text-gray-500">
                              সর্বনিম্ন
                            </p>

                            <p className="mt-1 font-bold text-green-700">
                              {toBanglaNumber(market.min)} টাকা
                            </p>
                          </div>

                          {/* Maximum */}
                          <div className="rounded-xl bg-red-50 p-3">
                            <p className="text-xs text-gray-500">
                              সর্বোচ্চ
                            </p>

                            <p className="mt-1 font-bold text-red-600">
                              {toBanglaNumber(market.max)} টাকা
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;