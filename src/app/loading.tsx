const ProductSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
     
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-200" />

        <div className="min-w-0 flex-1">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

   
      <div className="mt-5 pt-1">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />

          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

const Loading = () => {
  return (
    <main>
   
      <section className="bg-green-50 py-6">
        <div className="container mx-auto rounded-2xl bg-white px-4 py-10 shadow-sm md:px-10 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
           
            <div>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 h-4 w-36 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 space-y-3">
                <div className="h-10 w-full max-w-md animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-4/5 max-w-sm animate-pulse rounded bg-gray-200" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-4 w-full max-w-xl animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-5/6 max-w-lg animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-gray-200" />
              </div>

              <div className="mt-6 h-12 w-36 animate-pulse rounded-lg bg-gray-200" />
            </div>

           
            <div className="flex justify-center md:justify-end">
              <div className="h-64 w-full max-w-lg animate-pulse rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4">
         
          <div className="mb-12">
            <div className="mb-6">
              <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
            </div>

            <ProductGridSkeleton />
          </div>

         
          <div className="mb-12">
            <div className="mb-6">
              <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
            </div>

            <ProductGridSkeleton />
          </div>

         
          <div>
            <div className="mb-6">
              <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-4 w-3/4 max-w-xl animate-pulse rounded bg-gray-200" />
            </div>

            <ProductGridSkeleton />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;

