const ProductDetailsSkeleton = () => {
  return (
    <main className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-8 md:flex-row">

            
            <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-200 md:w-1/2" />

            
            <div className="flex-1">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-4 w-20 animate-pulse rounded bg-gray-200" />

             
              <div className="mt-8">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-10 w-32 animate-pulse rounded bg-gray-200" />
              </div>

            
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-gray-100 p-4"
                  >
                    <div className="h-3 w-14 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-5 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>

              
              <div className="mt-6 h-9 w-20 animate-pulse rounded-full bg-gray-200" />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

const Loading = () => {
  return <ProductDetailsSkeleton />;
};

export default Loading;