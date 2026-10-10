
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  markets?: Market[];
}

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

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

const toBanglaNumber = (value: number | string) =>
  String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );

const formatPrice = (value: number | null) => {
  if (value === null || !Number.isFinite(value)) {
    return "তথ্য নেই";
  }

  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2);

  return `${toBanglaNumber(formatted)} টাকা`;
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Protect this page: login is required.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { slug } = await params;


  const res = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid products API response");
  }

  const products = data as Product[];

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const unit =
    unitBn[product.unit?.toLowerCase()] || product.unit;


  const priceDifference =
    product.today - product.yesterday;

  const priceChangeText =
    priceDifference > 0
      ? `গতকালের তুলনায় আজ দাম ${toBanglaNumber(priceDifference)} টাকা বেড়েছে`
      : priceDifference < 0
        ? `গতকালের তুলনায় আজ দাম ${toBanglaNumber(Math.abs(priceDifference))} টাকা কমেছে`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const priceChangeColor =
    priceDifference > 0
      ? "text-red-600"
      : priceDifference < 0
        ? "text-green-600"
        : "text-gray-500";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

 
  const markets = Array.isArray(product.markets)
    ? product.markets.filter(
        (market) =>
          Number.isFinite(market.min) &&
          Number.isFinite(market.max) &&
          market.min <= market.max
      )
    : [];

  const minimumPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  const maximumPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : null;

  return (
    <main className="min-h-screen bg-[#f4f7f1] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-gray-500"
        >
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href="/#সব-পণ্য"
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span aria-hidden="true">›</span>

          <span className="font-semibold text-gray-800">
            {product.nameBn}
          </span>
        </nav>

      
        <section className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-4xl sm:h-20 sm:w-20">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  {product.categoryNameBn}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  প্রতি {unit}
                </span>
              </div>

              <p className={`mt-2 text-xs ${priceChangeColor}`}>
                {priceChangeText}
              </p>
            </div>
          </div>

          <div className="w-full border-t border-gray-100 pt-4 sm:w-auto sm:min-w-[150px] sm:border-t-0 sm:pt-0 sm:text-right">
            <p className="text-xs font-medium text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              {formatPrice(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              প্রতি {unit}
            </p>

            <div
              className={`mt-2 flex items-center gap-1 text-xs font-semibold sm:justify-end ${changeColor}`}
            >
              <span>{changeIcon}</span>
              <span>
                {toBanglaNumber(product.change.pct)}%
              </span>
            </div>
          </div>
        </section>

        
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-xl font-bold text-[#0E833C] sm:text-2xl">
                {formatPrice(minimumPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-2 text-xl font-bold text-red-600 sm:text-2xl">
                {formatPrice(maximumPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বাধিক
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                {averagePrice === null
                  ? "তথ্য নেই"
                  : formatPrice(averagePrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit} · বাজারগুলোর আনুমানিক গড়
              </p>
            </div>
          </div>
        </section>

       
        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              বিভিন্ন বাজারের দামের তুলনা
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500">
                  <th className="whitespace-nowrap px-4 py-3">
                    বাজার
                  </th>
                  <th className="whitespace-nowrap px-4 py-3">
                    বিভাগ
                  </th>
                  <th className="whitespace-nowrap px-4 py-3">
                    সর্বনিম্ন
                  </th>
                  <th className="whitespace-nowrap px-4 py-3">
                    সর্বাধিক
                  </th>
                  <th className="whitespace-nowrap px-4 py-3">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {markets.map((market, index) => {
                  const avgMarketPrice =
                    (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                      className={`border-b border-gray-200 transition last:border-none hover:bg-gray-100/60 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-[#f9fafb]"
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-3.5 font-medium text-gray-900">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-gray-600">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-gray-900">
                        {formatPrice(market.min)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-gray-900">
                        {formatPrice(market.max)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-gray-900">
                        {formatPrice(avgMarketPrice)}
                      </td>
                    </tr>
                  );
                })}

                {markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

       
        <div className="pb-4">
          <Link
            href="/#সব-পণ্য"
            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
