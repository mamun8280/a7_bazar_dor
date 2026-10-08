import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="bg-green-50 py-6">
      <div className="container mx-auto rounded-2xl bg-white px-4 py-10 shadow-sm md:px-10 md:py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          
          
          <div className="text-left">
           
            <p className="mb-2 text-xs sm:text-sm font-medium text-green-700">
              {date}
            </p>

            <p className="mb-2 text-sm font-semibold text-gray-500">
              আজকের বাজার দর
            </p>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              আজকের বাজারের দাম
              <br />
              এক নজরে
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

         
          <div className="flex justify-center md:justify-end">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর"
              width={600}
              height={400}
              priority
              className="h-auto w-full max-w-lg object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;