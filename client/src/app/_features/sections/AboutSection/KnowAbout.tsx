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

const KnowAbout = () => {
  return (
    <div className="py-16 px-4 md:px-0">
      {/* Üst başlık ve markalar */}
      <div className="grid grid-cols-12 md:items-center gap-8 md:gap-16">
        {/* Resim */}
        <div className="col-span-12 md:col-span-5 flex justify-center">
          <Image
            src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Image23.jpeg"
            alt="Product"
            width={700}
            height={700}
            className="rounded-lg max-w-full md:max-w-[641px]"
          />
        </div>

        {/* Yazılar */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center mx-0 md:mx-[13%]">
          <div className="mb-8 font-medium">
            <p className="text-gray-500 mb-2 text-[12px]">KNOW ABOUT XSTORE</p>
            <h3 className="text-[32px] md:text-[40px] mb-4 leading-[1.3em]">
              Approximately <span className="text-blue-600">30K+ Products</span> available on Xstore.
            </h3>
            <p className="text-[#666666] mt-[15px] text-[16px] md:text-[18px] font-normal leading-[1.6em]">
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment blinded by desire, that they cannot foresee
              the pain and trouble that are bound to ensuea equal blame belongs
              to weakness.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-[40px] md:mt-[95px]">
            <div>
              <h4 className="mb-2 text-[26px]">Our Mission</h4>
              <p className="text-gray-600 font-normal text-[16px] md:text-[18px]">
                At vero eos et accusamus et iusto odio dignissimos ducimus
                quinditiis praesentium voluptatum.
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-[26px]">Our Vission</h4>
              <p className="text-gray-600 text-[16px] md:text-[18px] font-normal">
                But I must explain to you how this mistaken idea of denouncing
                pleasure and praising pain was born.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowAbout;
