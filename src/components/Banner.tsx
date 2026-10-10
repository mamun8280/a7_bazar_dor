import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto rounded-2xl bg-white px-4 py-8 shadow-sm sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {/* Banner Text */}
          <div className="text-left md:col-span-1 lg:col-span-2">
            <p className="mb-2 text-xs font-medium text-green-700 sm:text-sm">
              {date}
            </p>

            <p className="mb-2 text-sm font-semibold text-gray-500">
              আজকের বাজার দর
            </p>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম
              <br />
              এক নজরে
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:mt-5 sm:text-base lg:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:text-base"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Banner Image */}
          <div className="flex justify-center md:col-span-1 lg:col-span-1 lg:justify-end">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার"
              width={600}
              height={400}
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 45vw, 33vw"
              className="h-auto w-full max-w-sm object-contain sm:max-w-md lg:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
