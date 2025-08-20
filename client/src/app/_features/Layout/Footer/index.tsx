import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#32373C] text-white  w-full">
      <div className="container-fluid mx-[70px] px-4 md:px-12 lg:px-20 flex flex-col justify-between ">
        {/* Üst kısım - icon + text */}
        <div className="mt-6 border-b border-[#464d54] pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[
            {
              img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2024/03/Icon-0-min.png",
              title: "Free Shipping Order $60",
              desc: "Delivery Moves So Quickly",
            },
            {
              img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2024/03/Icon-1.png",
              title: "24/7 Customer Support",
              desc: "We’re Always Here For You",
            },
            {
              img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2024/03/Icon-2.png",
              title: "Money Back Guarantee",
              desc: "30 Days Hassle-Free",
            },
            {
              img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2024/03/Icon-3-min.png",
              title: "Secure Payments",
              desc: "Safe & Trusted Checkout",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center text-left">
              <div className="mr-4 w-12 h-12 flex-shrink-0">
                <img src={item.img} alt="" width={48} height={48} className="w-12 h-12 object-contain" loading="lazy" />
              </div>
              <div>
                <h1 className="text-[16px] font-medium mb-1">{item.title}</h1>
                <p className="text-[14px] text-[#aaaaaa]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alt kısım - linkler */}
        <div className="mt-[65px] pb-[65px] border-b border-[#464d54] w-full grid grid-cols-12  gap-8 text-left">
          <div className="grid col-span-12 2xl:col-span-7 gap-8 w-full border-[#464D54] 2xl:border-r  ">
            <div className="grid grid-cols-12 w-full">
              <ul className="grid col-span-12 2xl:col-span-4 mb-[38.52px]">
                <li className="text-[16px] font-bold text-[#999999] mb-2">
                  COMPANY
                </li>
                <li className="text-[15px] mb-2">About Us</li>
                <li className="text-[15px] mb-2">Careers</li>
                <li className="text-[15px] mb-2">Affiliates</li>
                <li className="text-[15px]">Blog</li>
              </ul>
              <ul className="grid col-span-12 2xl:col-span-4 mb-[38.52px]">
                <li className="text-[16px] font-bold text-[#999999] mb-2">
                  SHOP
                </li>
                <li className="text-[15px] mb-2">Appliances</li>
                <li className="text-[15px] mb-2">Gadgets</li>
                <li className="text-[15px] mb-2">Wearables</li>
                <li className="text-[15px]">Shop All</li>
              </ul>
              <ul className="grid col-span-12 2xl:col-span-4 mb-[38.52px]">
                <li className="text-[16px] font-bold text-[#999999] mb-2">
                  SUPPORT
                </li>
                <li className="text-[15px] mb-2">Contact Us</li>
                <li className="text-[15px] mb-2">Returns</li>
                <li className="text-[15px] mb-2">Frequently Asked Questions</li>
                <li className="text-[15px]">Privacy</li>
              </ul>
              {/* <div className="grid col-span-6 mb-[38.52px]">
                <div className="grid grid-cols-12">
                 
                </div>
              </div> */}
            </div>
          </div>
          <div className="grid col-span-12 2xl:col-span-5 2xl:pl-[25%]">
            <ul className="mb-[38.52px]">
              <li className="text-[16px] font-bold text-[#999999] mb-[20px]">
                SUBSCRIBE
              </li>
              <li className="text-[15px] mb-[20px]">
                Enter your email address to get{" "}
                <Link href="#" className="font-bold underline">
                  $20 off your first order
                </Link>{" "}
              </li>
              <li className="text-[15px] mb-[20px]">
                <div className="bg-white flex items-start justify-between gap-2 text-[#222]">
                  <input
                    className="w-full h-[40px] pl-[1.07em] bg-none focus:bg-none focus:outline-none"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your E-mail Address"
                  />{" "}
                  <Button className="bg-[#2a74ed] font-sans  hover:bg-[#2360c2] text-white py-[10.5px] hover:text-white px-[15px] rounded-[0px] m-[1px] font-normal text-[12px]">
                    SEND
                  </Button>
                </div>
              </li>
              <li className="text-[15px] mb-2 flex text-[#999999] gap-[10px]">
                <FaFacebookF
                  className="inline-block mr-2 hover:text-[#2A74ED]"
                  size={16}
                />
                <FaXTwitter
                  className="inline-block mr-2 hover:text-[#2A74ED]"
                  size={16}
                />
                <FaInstagram
                  className="inline-block hover:text-[#2A74ED]"
                  size={16}
                />
                <FaYoutube
                  className="inline-block ml-2 hover:text-[#2A74ED]"
                  size={16}
                />
                <FaTelegramPlane
                  className="inline-block ml-2 hover:text-[#2A74ED]"
                  size={16}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="my-[35px] items-center justify-between 2xl:flex">
          <div className="mx-[20px]  2xl:flex justify-between items-center">
            <div className="2xl:w-[160px]">
              <img
                src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2024/03/footer-logo.png"
                alt="Footer Logo"
                width={160}
                height={40}
                className="w-[160px] h-10 object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <ul className="text-[15px] text-[#FFFFFF] 2xl:flex gap-[10px] mb-[15px]">
                <li className="flex gap-1">
                  Phone: <span className="text-[#CCCCCC]">888.312.2456.</span>
                </li>
                <li className="flex gap-1">
                  Text: <span className="text-[#CCCCCC]">200.490.1520</span>
                </li>
                <li className="flex gap-1">
                  Email:{" "}
                  <span className="text-[#CCCCCC]">
                    <Link href="mailto:ZyN0w@example.com">
                      customerservice@8theme.com
                    </Link>
                  </span>
                </li>
                <li className="flex gap-1">
                  Hours:{" "}
                  <span className="text-[#CCCCCC]">
                    Monday - Friday 8:30am - 4:45pm EST
                  </span>
                </li>
              </ul>
              <ul className="text-[15px] text-[#FFFFFF] 2xl:flex gap-[10px]">
                <li>
                  <span className="text-[#CCCCCC]">Copyright © 2024</span>{" "}
                  XStore Theme.
                </li>
                <li>
                  <span className="text-[#CCCCCC]">Created by 8theme –</span>{" "}
                  Premium WordPress WooCommerce Themes.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex  gap-2">
            <img
              src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2024/03/Payment.png"
              alt="Payment Methods"
              width={400}
              height={40}
              className="w-auto h-10 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
