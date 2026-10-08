"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

interface CategoryNavProps {
  categories: Category[];
}

const CategoryNav = ({ categories }: CategoryNavProps) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 sm:py-3">
      {categories.map((category) => {
        const isActive =
          pathname === `/category/${category.id}`;

        return (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
              isActive
                ? "bg-green-700 text-white"
                : "text-black hover:bg-green-700 hover:text-white"
            }`}
          >
            <span className="text-sm sm:text-base">
              {category.icon}
            </span>

            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryNav;