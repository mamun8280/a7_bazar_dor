import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs sm:text-sm text-gray-500 font-medium">
          
          
          <div className="font-semibold text-black">
            <span >বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </div>

         
          <div className="text-black">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
