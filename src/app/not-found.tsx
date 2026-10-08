import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="text-center">
        <p className="text-6xl font-bold text-green-600">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          পণ্যটি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;