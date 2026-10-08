import CategoryProducts from "@/components/CategoryProducts";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
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
}

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

 
  const categoryRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${slug}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!categoryRes.ok) {
    throw new Error("Failed to fetch category");
  }

  const category: Category = await categoryRes.json();


  const productsRes = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!productsRes.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await productsRes.json();


  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <main className="mt-10 bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">
              {category.icon}
            </span>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-600">
                {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

      
        <CategoryProducts products={categoryProducts} />
      </div>
    </main>
  );
};

export default CategoryPage;

