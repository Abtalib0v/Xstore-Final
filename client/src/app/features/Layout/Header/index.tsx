"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";
import { PiBasket } from "react-icons/pi";
import styles from "./style.module.scss";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { get } from "http";
import { useCart } from "@/app/Providers/CardProviders";
import DrawerSection from "@/app/(main)/Drawer";
import clsx from "clsx";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState(false);

  const {
    getCartItems,
    getTotalPrice,
  }=useCart();
  const total = getTotalPrice().toFixed(2)

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={clsx(
        styles.Header,
        { [styles.scrolled]: isScrolled },
        "h-[75px] sticky backdrop-blur-xs backdrop-grayscale ... top-0 flex items-center justify-center z-10 bg-white/50"
      )}>
      <div className="container-fluid  flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            width={117}
            height={0}
            alt="XStore Logo"
            className="2xl:mr-[270px]  md:mr-[100px] sm:mr-0"
            src={
              "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Logo@2x.png"
            }
          />
        </Link>
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
          <Button onClick={()=>setOpenDrawer(true)} variant="outline" className="bg-[#2a74ed] rounded-full border-transparent h-[40px] text-white cursor-pointer">
            
              
                {getCartItems().length > 0 ? (
              <div className="flex items-center gap-1.5"><PiBasket />
            Cart  - ${total}</div>

            ) : (
              <div className="flex items-center gap-1.5"><PiBasket />
            Cart $0.00</div>
            )}
             
          </Button>
          {
              openDrawer && <DrawerSection open={openDrawer} setOpen={setOpenDrawer} >
                
              </DrawerSection>
            }
        </div>
      </div>
      <div className=" ">
      </div>
    </div>

  );
};

export default Header;
