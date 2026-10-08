import CategoryNav from "./CategoryNav";

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
        <CategoryNav categories={categories} />
      </div>
    </nav>
  );
};

export default Navbar;