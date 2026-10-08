const ProductSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-200" />

        <div className="flex-1">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-5">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

        <div className="mt-2 flex justify-between gap-3">
          <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <main className="mt-10 bg-gray-50 py-10">
      <div className="container mx-auto px-4">

        {/* Category Header Skeleton */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />

          <div>
            <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-4 w-52 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Count + Sort Skeleton */}
        <div className="mb-6 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 min-[400px]:w-40" />
        </div>

        {/* Products Skeleton */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>

      </div>
    </main>
  );
};

export default Loading;