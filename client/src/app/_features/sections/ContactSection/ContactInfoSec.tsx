"use client";
import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactInfoSection = () => {
  const infos = [
    {
      icon: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/elementor/thumbs/Icon01-qpjwde4y3qmy7csiybo2fqmhpzmkho2br31g7fzduo.png",
      title: "Nizami küçəsi 203B, AF Business House, 2-ci mərtəbə, Baku 1000",
      value: "Phone: +61 3 8376 6284",
    },
    {
      icon: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/elementor/thumbs/Icon02-qpjwde4y84ihokhj0isjiguxctxdizfhh1b5nngets.png",
      title: "Slowly she drifted to the southeast, rising higher & higher as the flame",
      value: "information@8themes.net",
    },
    {
      icon: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/elementor/thumbs/Icon03-qpjwdc99ugfx1ck9bhzadhc0626n3l80ss06p3j768.png",
      title: "Ascending to the roof of the building I watched her for hours, until.",
      value: "Fax: +1 909969 0383",
    },
  ];

  return (
    <section className="o pb-12 grid md:grid-cols-3 gap-[28px] text-center">
      {infos.map((item, idx) => (
        <div
          key={idx}
          className="border rounded-3xl p-6 pt-[35px] pb-[30px] px-[80px]"
        >
          <div className="flex justify-center mb-4"><img src={item.icon} alt="" /></div>
          <h3 className="text-[#666666] text-[18px] mb-[22px]">{item.title}</h3>
          <p className="text-blue-600 font-medium">{item.value}</p>
        </div>
      ))}
    </section>
  );
};

export default ContactInfoSection;
