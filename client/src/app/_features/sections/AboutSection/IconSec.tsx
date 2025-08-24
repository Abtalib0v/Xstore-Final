import Image from "next/image";
import React from "react";

const CategoryImages = [
  "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-01.jpeg",
  "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-02.jpeg",
  "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-03.jpeg",
  "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-04.jpeg",
  "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-05.jpeg",
  "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-06.jpeg",
];

const IconSec = () => {
  return (
    <div className="py-16 px-4 md:px-0">
      {/* Üst başlık ve markalar */}
      <div className="grid grid-cols-12 md:flex-row items-start md:items-center justify-between mb-12 gap-8 md:gap-16">
        {/* Başlık ve açıklama */}
        <div className="col-span-12 md:col-span-4 mb-8 md:mb-0 max-w-full md:max-w-[513px]">
          <p className="text-[12px] tracking-[2px] mb-[15px] font-light">
            XSTORE EST. 1950
          </p>
          <h2 className="text-[32px] md:text-[40px] text-[#222222] font-medium mb-[30px] leading-[1.3em]">
            Over 8 years of Experiance in{" "}
            <span className="text-blue-600">Online Selling.</span>
          </h2>
          <p className="text-[#444444] text-[16px] md:text-[18px] leading-[1.7em]">
            At vero eos et accusamus et iusto odio dignissimos ducimus
            blanditiis praesentium voluptatum delenitis corrupti quosloret quas
            moleti exceptur occaecat.
          </p>
        </div>

        {/* Marka logoları */}
        <div className="col-span-12 md:col-span-8 flex flex-wrap justify-center gap-4 md:gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-12 gap-4 md:gap-6 w-full">
            {CategoryImages.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Brand ${idx + 1}`}
                width={500}
                height={500}
                className="w-full flex justify-center col-span-1 sm:col-span-1 md:col-span-4"
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSec;
