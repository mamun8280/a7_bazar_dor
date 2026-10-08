"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

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

interface CategoryProductsProps {
  products: Product[];
}

const CategoryProducts = ({
  products,
}: CategoryProductsProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-high") {
      return a.today - b.today;
    }

    if (sort === "high-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div>
      
      <div className="mb-6 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
      
        <p className="text-sm text-gray-600">
          মোট {products.length}টি পণ্য
        </p>

        
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-green-600 min-[400px]:w-auto"
        >
          <option value="default">ডিফল্ট</option>

          <option value="low-high">
            দাম: কম → বেশি
          </option>

          <option value="high-low">
            দাম: বেশি → কম
          </option>
        </select>
      </div>

    
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white px-5 py-12 text-center shadow-sm">
          <p className="text-base font-semibold text-gray-800 sm:text-lg">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;

