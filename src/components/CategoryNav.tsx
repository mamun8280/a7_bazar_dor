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
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="w-full overflow-x-auto overscroll-x-contain"
    >
      <div className="flex min-w-max items-center gap-2 py-2 sm:gap-3 sm:py-3">
        {categories.map((category) => {
          const categoryPath = `/category/${category.id}`;

          const isActive =
            pathname === categoryPath ||
            pathname.startsWith(`${categoryPath}/`);

          return (
            <Link
              key={category.id}
              href={categoryPath}
              aria-current={isActive ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:text-sm ${
                isActive
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-800"
              }`}
            >
              <span aria-hidden="true" className="text-base sm:text-lg">
                {category.icon}
              </span>

              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
