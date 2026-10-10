import Image from "next/image";
import Link from "next/link";
import UserInfo from "@/components/Userinfo"; 

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          
         
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                height={40}
                width={40}
                src="/logo-icon.png" 
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

        
          <div>
            <UserInfo />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;