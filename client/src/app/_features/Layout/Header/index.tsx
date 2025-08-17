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
import { useCart } from "@/app/_Providers/CardProviders";
import DrawerSection from "@/app/_common/Drawer";
import clsx from "clsx";
import AccountDrawerSection from "@/app/_common/AccountDrawer";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openAccountDrawer, setOpenAccountDrawer] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const { getCartItems, getTotalPrice } = useCart();
  const total = getTotalPrice().toFixed(2);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // localStorage veya cookie'den user bilgisini al
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div
      className={clsx(
        styles.Header,
        { [styles.scrolled]: isScrolled },
        "h-[75px] sticky backdrop-blur-xs backdrop-grayscale top-0 flex items-center justify-center z-10 bg-white/50"
      )}
    >
      <div className="container-fluid mx-[150px] w-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            width={117}
            height={0}
            alt="XStore Logo"
            className="2xl:mr-[270px] md:mr-[100px] sm:mr-0"
            src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Logo@2x.png"
          />
        </Link>

        <div className="hidden 2xl:flex justify-end items-center space-x-4 text-[16px] w-[708px] leading-[25.6px]  font-medium">
          <Link href="/elements" className="py-[7px] px-[5px] mx-[8px]">Elements</Link>
          <Link href="/shop" className="py-[7px] px-[5px] mx-[8px]">Shop</Link>
          <Link href="/track-order" className="py-[7px] px-[5px] mx-[8px]">Track Order</Link>
          <Link href="/blog" className="py-[7px] px-[5px] mx-[8px]">Blog</Link>
          <Link href="/about-us" className="py-[7px] px-[5px] mx-[8px]">About us</Link>
          <Link href="/contacts" className="py-[7px] px-[5px] mx-[8px]">Contacts</Link>
        </div>

        <div className="2xl:flex hidden">
          <Link href="/search" className="ml-[10px] text-[10px] w-[222px] flex content-start py-[7px] px-[5px]">
            <Search size={19} />
          </Link>
        </div>

        <div className="hidden sm:flex text-[23px] items-center gap-[16px]">
          <TbRefresh size={19} />
          <FaRegHeart size={19} />

          {user ? (
            <Button onClick={handleLogout} className="flex items-center h-[40px] cursor-pointer hover:bg-[#2363c9] gap-2 bg-[#2a74ed] rounded-full">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>Logout</span>
            </Button>
          ) : (
            <Button onClick={() => setOpenAccountDrawer(true)} className="flex items-center gap-1.5 bg-transparent text-black shadow-none hover:bg-transparent cursor-pointer rounded-full">
              <FaRegUser size={19} />
              <h1 className="text-[15px] w-[48px]">Sign In</h1>
            </Button>
          )}

          {openAccountDrawer && !user && (
            <AccountDrawerSection open={openAccountDrawer} setOpen={setOpenAccountDrawer} />
          )}

          <Button
            onClick={() => setOpenDrawer(true)}
            variant="outline"
            className="bg-[#2a74ed] rounded-full hover:bg-[#2363c9] hover:text-white border-transparent h-[40px] text-white cursor-pointer bg-none"
          >
            {getCartItems().length > 0 ? (
              <div className="flex items-center gap-1.5 text-[15px]">
                <PiBasket />
                Cart - ${total}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <PiBasket />
                Cart $0.00
              </div>
            )}
          </Button>

          {openDrawer && <DrawerSection open={openDrawer} setOpen={setOpenDrawer} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
