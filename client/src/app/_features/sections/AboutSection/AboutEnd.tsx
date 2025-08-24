import React from "react";
import Image from "next/image";
import { LuChevronRight } from "react-icons/lu";

const AboutEnd = () => {
  const items = [
    {
      img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Icon.jpeg",
      desc: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled.",
      link: "#",
    },
    {
      img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Icon1.jpeg",
      desc: "But I must explain to you how this mistaken idea of denouncing pleasure and praising pain was born.",
      link: "#",
    },
    {
      img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Icon2.jpeg",
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus quinditiis praesentium voluptatum.",
      link: "#",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-8 py-16">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="col-span-12 md:col-span-4 flex flex-col items-center text-center p-6 border rounded-[20px] shadow-sm"
        >
          <Image
            src={item.img}
            alt={`Icon ${idx + 1}`}
            width={80}
            height={80}
            className="mb-6"
          />

          <p className="text-gray-600 mb-6">{item.desc}</p>

          <a
            href={item.link}
            className="text-blue-600 hover:text-black font-medium flex items-center transition-colors"
          >
            Learn More <LuChevronRight />
          </a>
        </div>
      ))}
    </div>
  );
};

export default AboutEnd;
