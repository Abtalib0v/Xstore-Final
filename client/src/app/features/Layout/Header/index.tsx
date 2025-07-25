"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";
import { PiBasket } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { get } from "http";
import { useCart } from "@/app/Providers/CardProviders";

const Header = () => {
  const {
    getCartItems
  }=useCart();

  const user = 
  typeof window !== "undefined"
  ?JSON.parse(localStorage.getItem("user") || "null"):null
  return (
    <div className="h-[75px] sticky backdrop-blur-xs backdrop-grayscale ... top-0 flex items-center justify-center z-10 bg-white/50 shadow-md">
      <div className="container-fluid  flex justify-between items-center">
        <div className="flex items-center">
          <Image
            width={117}
            height={0}
            alt="XStore Logo"
            className="2xl:mr-[270px] md:mr-[100px] sm:mr-0"
            src={
              "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Logo@2x.png"
            }
          />
        </div>
        <div className="hidden 2xl:flex justify-end  items-center space-x-4 text-[16px] content-end w-[708px] leading-[25.6px] gap-[16px] font-medium">
          <Link href="/elements" className=" m-0 py-[7px] px-[5px]">
            Elements
          </Link>
          <Link href="/shop" className="m-0 py-[7px] px-[5px]">
            Shop
          </Link>
          <Link href="/track-order" className="m-0 py-[7px] px-[5px]">
            Track Order
          </Link>
          <Link href="/blog" className="m-0 py-[7px] px-[5px]">
            Blog
          </Link>
          <Link href="/about-us" className="m-0 py-[7px] px-[5px]">
            About us
          </Link>
          <Link href="/contacts" className="m-0 py-[7px] px-[5px]">
            Contacts
          </Link>
        </div>
        <div className="2xl:flex hidden">
          <Link
            href="/search"
            className="ml-[10px] text-[10px] w-[222px] items-start  flex content-start py-[7px] px-[5px]"
          >
            <Search size={19} />
          </Link>
        </div>
        <div className="hidden sm:flex text-[23px] items-center  gap-[16px]">
          <TbRefresh size={19} />
          <FaRegHeart size={19} />
          <div className="flex items-center gap-1.5">
            <FaRegUser size={19} />
            <h1 className="text-[15px] w-[48px]">Sing In</h1>
          </div>
          <Button variant="outline" className="bg-[#2a74ed] rounded-full h-[40px] text-white">
            {getCartItems().length > 0 ? (
              <Link href="/cart">card ({getCartItems().length})</Link>

            ) : (
              <Link href="/cart">card</Link>
            )}
            <PiBasket />
            Cart $0.00
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
