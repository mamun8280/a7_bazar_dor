const ProductDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#f4f7f1] py-8 sm:py-10">
      <div className="container mx-auto max-w-5xl px-4">
       
        <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />

        
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
           
            <div className="flex h-24 w-24 shrink-0 animate-pulse items-center justify-center rounded-2xl bg-gray-200 sm:h-28 sm:w-28" />

            
            <div className="flex-1">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 h-8 w-3/4 max-w-sm animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded bg-gray-200" />

             
              <div className="mt-5 flex flex-wrap gap-2">
                <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
              </div>

             
              <div className="mt-6">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mt-3 h-9 w-40 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </section>

     
        <section className="mt-6">
          <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="mt-4 h-8 w-32 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>

     
        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="h-6 w-64 max-w-full animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-52 max-w-full animate-pulse rounded bg-gray-200" />

          {/* Table Skeleton */}
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
            <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4 sm:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-4 animate-pulse rounded bg-gray-200 ${
                    index >= 3 ? "hidden sm:block" : ""
                  }`}
                />
              ))}
            </div>

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 border-t border-gray-100 p-4 sm:grid-cols-5"
              >
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`h-4 animate-pulse rounded bg-gray-200 ${
                      cellIndex >= 3 ? "hidden sm:block" : ""
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

       
        <div className="mt-6 h-10 w-36 animate-pulse rounded-xl bg-gray-200" />
      </div>
    </main>
  );
};

const Loading = () => {
  return <ProductDetailsSkeleton />;
};

export default Loading;
