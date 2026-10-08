import Link from "next/link";

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await res.json();

  return (
    <nav className="border-y border-gray-200 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-2 sm:py-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-black transition hover:bg-green-700 hover:text-white sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="text-sm sm:text-base">
                {category.icon}
              </span>

              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;