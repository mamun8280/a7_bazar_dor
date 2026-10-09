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
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-gray-600";

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

  return (
    <main className="min-h-screen bg-[#f4f7f1] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">

    
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="transition hover:text-green-700">
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-semibold text-gray-800">
            {product.nameBn}
          </span>
        </div>

        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gray-50 text-4xl border border-gray-100">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                প্রতি {unit} - {product.categoryNameBn}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                গতকালের তুলনায় আজ দাম <span className="font-semibold text-gray-700">বেড়েছে</span> - ২ টাকা
              </p>
            </div>
          </div>

        
          <div className="w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100 min-w-[120px]">
            <p className="text-xs text-gray-500 font-medium">আজকের দাম</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-0.5">
              {toBanglaNumber(product.today)}
            </p>
            <p className="text-xs text-gray-500">
              টাকা / {unit}
            </p>
            <div className={`mt-1 flex items-center gap-1 text-xs font-semibold ${changeColor} justify-start sm:justify-end`}>
              <span>{changeIcon}</span>
              <span>{toBanglaNumber(product.change.pct)}%</span>
            </div>
          </div>
        </div>

      
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Minimum */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-[#0E833C]">
                {toBanglaNumber(minimumPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

           
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">সর্বাধিক দাম</p>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-red-600">
                {toBanglaNumber(maximumPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

          
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-gray-900">
                {toBanglaNumber(averagePrice.toFixed(0))} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                প্রতি কেজি-র এর হিসাব
              </p>
            </div>
          </div>
        </div>

       
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 bg-gray-50">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বাধিক</th>
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {product.markets.map((market, index) => {
                  const avgMarketPrice = ((market.min + market.max) / 2).toFixed(2);
                  
                  const rowBg = index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]";
                  return (
                    <tr 
                      key={index} 
                      className={`${rowBg} border-b border-gray-200 last:border-none transition hover:bg-gray-100/60`}
                    >
                      <td className="py-3.5 px-4 font-medium text-gray-900">{market.market}</td>
                      <td className="py-3.5 px-4 text-gray-600">{market.division}</td>
                      <td className="py-3.5 px-4 text-gray-900">{toBanglaNumber(market.min)} টাকা</td>
                      <td className="py-3.5 px-4 text-gray-900">{toBanglaNumber(market.max)} টাকা</td>
                      <td className="py-3.5 px-4 text-gray-900">{toBanglaNumber(avgMarketPrice)} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProductDetailsPage;