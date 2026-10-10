import Image from "next/image";
import Link from "next/link";
import UserInfo from "@/components/Userinfo"; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নেবেন

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          
          {/* লোগো ও তারিখ */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                height={40}
                width={40}
                src="/logo-icon.png" // আপনার লোগো পাথ
                alt="বাজার দর লোগো"
              />
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                  বাজার দর
                </h1>
                <p className="text-[9px] sm:text-xs text-gray-500 font-medium mt-1">
                  {date}
                </p>
              </div>
            </Link>
          </div>

          {/* ইউজার ইনফো / সাইন-ইন / সাইন-আপ সেকশন */}
          <div>
            <UserInfo />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;