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
import { usePathname } from "next/navigation";
import WishlistDrawer from "@/app/_common/WishlistDrawer";

const Header = () => {
  const pathname = usePathname();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openAccountDrawer, setOpenAccountDrawer] = useState<boolean>(false);
  const [openWishlistDrawer, setOpenWishlistDrawer] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  // Prevent hydration mismatch: render dynamic, client-only UI after mount
  const [mounted, setMounted] = useState(false);

  const { getCartItems, getTotalPrice, clearCart } = useCart();
  // Avoid computing totals during SSR to keep markup stable
  const total = mounted ? getTotalPrice().toFixed(2) : "0.00";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    try {
      clearCart();
    } catch {}
    setUser(null);
  };

  return (
    <>
      <div
        className={clsx(
          styles.Header,
          { [styles.scrolled]: isScrolled },
          "h-[75px] 2xl:p-0  p-[15px] sticky backdrop-blur-xs backdrop-grayscale top-0 flex items-center justify-center z-10 bg-white/50"
        )}
      >
        <div className="container-fluid 2xl:mx-[150px] mx-0 w-full flex justify-between items-center">
          <Link href="/" prefetch className="flex items-center">
            <Image
              width={117}
              height={36}
              alt="XStore Logo"
              className="2xl:mr-[270px] md:mr-[100px] sm:mr-0"
              src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Logo@2x.png"
              priority
            />
          </Link>

          <div className="hidden 2xl:flex justify-end items-center space-x-4 text-[16px] w-[708px] leading-[25.6px] font-medium min-h-[40px]">
            <Link
              href="/elements"
              prefetch
              className={clsx("py-[7px] px-[5px] mx-[8px]", {
                "text-[#2a74ed]": pathname === "/element",
                "text-black": pathname !== "/element",
              })}
            >
              Elements
            </Link>
            <Link
              href="/shop"
              prefetch
              className={clsx("py-[7px] px-[5px] mx-[8px]", {
                "text-[#2a74ed]": pathname === "/shop",
                "text-black": pathname !== "/shop",
              })}
            >
              Shop
            </Link>
            <Link
              href="/track-order"
              prefetch
              className={clsx("py-[7px] px-[5px] mx-[8px]", {
                "text-[#2a74ed]": pathname === "/track-order",
                "text-black": pathname !== "/track-order",
              })}
            >
              Track Order
            </Link>
            <Link
              href="/blog"
              prefetch
              className={clsx("py-[7px] px-[5px] mx-[8px]", {
                "text-[#2a74ed]": pathname === "/blog",
                "text-black": pathname !== "/blog",
              })}
            >
              Blog
            </Link>
            <Link
              href="/about-us"
              prefetch
              className={clsx("py-[7px] px-[5px] mx-[8px]", {
                "text-[#2a74ed]": pathname === "/about-us",
                "text-black": pathname !== "/about-us",
              })}
            >
              About us
            </Link>
            <Link
              href="/contacts"
              prefetch
              className={clsx("py-[7px] px-[5px] mx-[8px]", {
                "text-[#2a74ed]": pathname === "/contacts",
                "text-black": pathname !== "/contacts",
              })}
            >
              Contacts
            </Link>
          </div>

          <div className="2xl:flex hidden">
            <Link
              href="/search"
              prefetch
              className="ml-[10px] text-[10px] w-[222px] flex content-start py-[7px] px-[5px]"
            >
              <Search size={19} />
            </Link>
          </div>

          <div className=" flex text-[23px] items-center gap-[16px] min-h-[40px]">
            <TbRefresh size={19} className="hidden sm:flex" />
            <button
              onClick={() => setOpenWishlistDrawer(true)}
              className="hidden sm:flex items-center justify-center w-[32px] h-[32px] rounded-full hover:bg-gray-100"
              aria-label="Open wishlist"
            >
              <FaRegHeart size={19} />
            </button>

            {/* Defer user-dependent UI until after mount to avoid hydration mismatch */}
            {mounted ? (
              user ? (
                <Button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center h-[40px] cursor-pointer hover:bg-[#2363c9] gap-2 bg-[#2a74ed] rounded-full"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>Logout</span>
                </Button>
              ) : (
                <Button
                  onClick={() => setOpenAccountDrawer(true)}
                  className="flex items-center gap-1.5 bg-transparent text-black shadow-none hover:bg-transparent cursor-pointer rounded-full"
                >
                  <FaRegUser size={19} />
                  <h1 className="text-[15px] w-[48px]">Sign In</h1>
                </Button>
              )
            ) : (
              // Neutral placeholder with stable markup during SSR
              <div
                className="hidden sm:flex items-center h-[40px] gap-2 rounded-full"
                aria-hidden
              />
            )}

            {openAccountDrawer && !user && (
              <AccountDrawerSection
                open={openAccountDrawer}
                setOpen={setOpenAccountDrawer}
              />
            )}

            {openWishlistDrawer && (
              <WishlistDrawer open={openWishlistDrawer} setOpen={setOpenWishlistDrawer} />
            )}

            <Button
              onClick={() => setOpenDrawer(true)}
              variant="outline"
              className="bg-[#2a74ed] rounded-full hover:bg-[#2363c9] hover:text-white border-transparent h-[40px] text-white cursor-pointer bg-none"
            >
              {/* Keep classNames consistent; fill text after mount */}
              <div className="flex items-center gap-1.5 text-[15px]">
                <PiBasket />
                {mounted && getCartItems().length > 0 ? (
                  <span suppressHydrationWarning>Cart - ${total}</span>
                ) : (
                  <span suppressHydrationWarning>Cart $0.00</span>
                )}
              </div>
            </Button>

            {openDrawer && (
              <DrawerSection open={openDrawer} setOpen={setOpenDrawer} />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-[#2a74ed] h-[58px] text-white flex justify-around items-center py-2 sm:hidden z-50 shadow-lg">
        <Link href="/" className="flex flex-col items-center text-xs">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.41px"
              height="21.41px"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M23.716 9.52l-1.815-1.658v-5.17c0-0.467-0.456-0.793-0.864-0.793l-4.279-0.045c-0.437 0-0.793 0.356-0.793 0.793v0.601l-3.465-2.805c-0.291-0.237-0.712-0.237-0.999-0l-11.208 9.072c-0.338 0.275-0.392 0.775-0.119 1.118 0.151 0.187 0.378 0.294 0.62 0.294 0.184 0 0.361-0.063 0.497-0.177l0.842-0.68v12.872c0 0.437 0.357 0.793 0.795 0.793h6.363c0.461 0 0.836-0.375 0.836-0.836v-8.77h3.748v8.77c0 0.461 0.375 0.836 0.835 0.836h6.363c0.439 0 0.795-0.356 0.795-0.793v-12.872l0.841 0.68c0.166 0.133 0.373 0.195 0.585 0.173 0.195-0.022 0.374-0.115 0.497-0.253l0.036-0.038c0.268-0.337 0.218-0.834-0.112-1.112zM8.538 12.541v9.606h-4.817v-13.359l8.279-6.691 5.553 4.488v-3.139h2.726l0.007 18.701h-4.824v-9.606h-6.924z"></path>
            </svg>
          </span>
          Home
        </Link>
        <Link href="/shop" className="flex flex-col items-center text-[12.6px]">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.41px"
              height="21.41px"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M22.553 20.267v-9.372c0.908-0.676 1.447-1.743 1.447-2.876 0-0.136-0.035-0.27-0.103-0.388l-2.686-4.702c-0.268-0.468-0.769-0.759-1.308-0.759h-15.806c-0.539 0-1.040 0.291-1.307 0.759l-2.687 4.701c-0.067 0.118-0.103 0.252-0.103 0.388 0 1.133 0.539 2.201 1.447 2.876v9.372c-0.404 0.030-0.724 0.368-0.724 0.78 0 0.431 0.351 0.782 0.782 0.782h20.989c0.431 0 0.782-0.351 0.782-0.782 0-0.412-0.32-0.75-0.724-0.78zM18.566 13.143v7.122h-2.779v-7.122h2.779zM2.129 7.237l2.001-3.502h15.739l2.001 3.502h-19.742zM22.279 8.801c-0.312 0.742-1.045 1.241-1.865 1.241s-1.553-0.499-1.865-1.241h3.73zM19.348 11.58h-4.115c0.935-0.112 1.788-0.587 2.376-1.326 0.676 0.851 1.705 1.351 2.804 1.351 0.193 0 0.386-0.015 0.575-0.046v8.706h-0.86v-7.904c0-0.431-0.351-0.781-0.782-0.781zM9.195 10.042c-0.82 0-1.553-0.499-1.865-1.241h3.73c-0.312 0.742-1.045 1.241-1.865 1.241zM14.805 10.042c-0.821 0-1.554-0.499-1.865-1.241h3.73c-0.312 0.742-1.044 1.241-1.865 1.241zM3.011 11.559c0.19 0.031 0.382 0.046 0.575 0.046 1.099 0 2.128-0.5 2.805-1.351 0.676 0.851 1.705 1.351 2.805 1.351s2.128-0.5 2.805-1.351c0.676 0.851 1.705 1.351 2.804 1.351 0.001 0 0.001 0 0.002 0-0.335 0.088-0.583 0.394-0.583 0.756v7.904h-11.212v-8.706zM5.451 8.801c-0.312 0.742-1.045 1.241-1.865 1.241s-1.554-0.499-1.865-1.241h3.73z"></path>
              <path d="M11.843 12.415h-7.46c-0.419 0-0.759 0.341-0.759 0.759v5.25c0 0.419 0.341 0.759 0.759 0.759h7.46c0.419 0 0.759-0.341 0.759-0.759v-5.25c0-0.419-0.341-0.759-0.759-0.759zM5.142 17.665v-3.731h5.941v3.731h-5.941z"></path>
            </svg>
          </span>
          Shop
        </Link>
        <Link
          href="/wishlist"
          className="flex flex-col items-center text-[12.6px]"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.41px"
              height="21.41px"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M23.928 7.656c-0.264-3.528-3.264-6.36-6.792-6.456-1.872-0.072-3.768 0.672-5.136 1.992-1.392-1.344-3.24-2.064-5.136-1.992-3.528 0.096-6.528 2.928-6.792 6.456-0.024 0.288-0.024 0.624-0.024 0.912 0.048 1.272 0.6 2.544 1.512 3.576l9.168 10.152c0.312 0.36 0.792 0.552 1.272 0.552 0.456 0 0.936-0.192 1.296-0.552l9.144-10.152c0.912-1.008 1.44-2.256 1.512-3.576 0-0.312 0-0.624-0.024-0.912zM21.96 8.448c-0.048 0.864-0.408 1.68-1.008 2.328l-8.952 9.96-8.976-9.96c-0.6-0.672-0.96-1.488-1.008-2.304 0-0.24 0-0.456 0.024-0.672 0.192-2.52 2.328-4.56 4.848-4.632h0.168c1.632 0 3.168 0.792 4.104 2.112 0.192 0.264 0.48 0.408 0.816 0.408s0.624-0.144 0.816-0.408c0.984-1.368 2.592-2.16 4.272-2.112 2.52 0.096 4.68 2.112 4.896 4.632 0 0.216 0 0.432 0 0.648z"></path>
            </svg>
          </span>
          Wishlist
        </Link>
        {mounted ? (
          user ? (
            <Button
              onClick={handleLogout}
              className="flex bg-[#2a74ed] flex-col items-center text-xs shadow-none"
            >
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              onClick={() => setOpenAccountDrawer(true)}
              className="flex bg-[#2a74ed] flex-col items-center text-xs"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21.41px"
                  height="21.41px"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M17.4 12.072c1.344-1.32 2.088-3.12 2.088-4.992 0-3.888-3.144-7.032-7.032-7.032s-7.056 3.144-7.056 7.032c0 1.872 0.744 3.672 2.088 4.992-3.792 1.896-6.312 6.216-6.312 10.92 0 0.576 0.456 1.032 1.032 1.032h20.52c0.576 0 1.032-0.456 1.032-1.032-0.048-4.704-2.568-9.024-6.36-10.92zM14.976 11.4l-0.096 0.024c-0.048 0.024-0.096 0.048-0.144 0.072l-0.024 0.024c-0.744 0.384-1.488 0.576-2.304 0.576-2.76 0-4.992-2.232-4.992-4.992s2.256-5.016 5.016-5.016c2.76 0 4.992 2.232 4.992 4.992 0 1.776-0.936 3.432-2.448 4.32zM9.456 13.44c0.936 0.456 1.944 0.672 2.976 0.672s2.040-0.216 2.976-0.672c3.336 1.104 5.832 4.56 6.192 8.52h-18.336c0.384-3.96 2.88-7.416 6.192-8.52z"></path>
                </svg>
              </span>
              Account
            </Button>
          )
        ) : (
          <div
            className="flex bg-[#2a74ed] flex-col items-center text-xs"
            aria-hidden
          >
            <span><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21.41px"
                  height="21.41px"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M17.4 12.072c1.344-1.32 2.088-3.12 2.088-4.992 0-3.888-3.144-7.032-7.032-7.032s-7.056 3.144-7.056 7.032c0 1.872 0.744 3.672 2.088 4.992-3.792 1.896-6.312 6.216-6.312 10.92 0 0.576 0.456 1.032 1.032 1.032h20.52c0.576 0 1.032-0.456 1.032-1.032-0.048-4.704-2.568-9.024-6.36-10.92zM14.976 11.4l-0.096 0.024c-0.048 0.024-0.096 0.048-0.144 0.072l-0.024 0.024c-0.744 0.384-1.488 0.576-2.304 0.576-2.76 0-4.992-2.232-4.992-4.992s2.256-5.016 5.016-5.016c2.76 0 4.992 2.232 4.992 4.992 0 1.776-0.936 3.432-2.448 4.32zM9.456 13.44c0.936 0.456 1.944 0.672 2.976 0.672s2.040-0.216 2.976-0.672c3.336 1.104 5.832 4.56 6.192 8.52h-18.336c0.384-3.96 2.88-7.416 6.192-8.52z"></path>
                </svg></span>
            Account
          </div>
        )}
        {/* <Button onClick={() => setOpenAccountDrawer(true)} className="flex bg-none flex-col items-center text-xs">
          <span>👤</span>
          Account
        </Button> */}
        <Link href="/more" className="flex flex-col items-center text-xs">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.41px"
              height="21.41px"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M3.672 8.424c-1.968 0-3.576 1.608-3.576 3.576s1.608 3.576 3.6 3.576 3.6-1.608 3.6-3.576c0-1.944-1.656-3.576-3.624-3.576zM3.672 10.272c0.96 0 1.728 0.768 1.728 1.728s-0.768 1.728-1.728 1.728-1.728-0.768-1.728-1.728 0.792-1.728 1.728-1.728zM20.328 8.424c-1.968 0-3.576 1.608-3.576 3.576 0 1.944 1.632 3.576 3.576 3.576s3.6-1.632 3.6-3.576c0-1.968-1.608-3.576-3.6-3.576zM22.056 12c0 0.96-0.768 1.728-1.728 1.728s-1.728-0.768-1.728-1.728 0.768-1.728 1.728-1.728 1.728 0.768 1.728 1.728zM12 8.424c-1.968 0-3.576 1.608-3.576 3.576 0 1.944 1.632 3.576 3.576 3.576s3.576-1.632 3.576-3.576c0-1.968-1.608-3.576-3.576-3.576zM13.728 12c0 0.96-0.768 1.728-1.728 1.728s-1.728-0.768-1.728-1.728 0.768-1.728 1.728-1.728c0.96 0 1.728 0.768 1.728 1.728z"></path>
            </svg>
          </span>
          More
        </Link>
      </div>
    </>
  );
};

export default Header;
