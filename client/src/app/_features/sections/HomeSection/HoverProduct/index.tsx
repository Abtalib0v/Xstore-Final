"use client";

import React from "react";
import { Plus, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/app/_http/api";
import { QueryKeys } from "@/app/_constant/QueryKeys";
import { useCart } from "@/app/_Providers/CardProviders";

interface HotspotProps {
  top: string;
  left: string;
  item: any;
  placement?: "top" | "bottom" | "left" | "right";
}

const Hotspot: React.FC<HotspotProps> = ({ top, left, item, placement = "right" }) => {
  const { addToCart } = useCart();
  const [pinned, setPinned] = React.useState(false);

  const title = item?.name ?? "";
  const price = item?.price ?? "";
  const image = item?.imageUrl ?? "";
  const rating = Math.max(0, Math.min(5, Math.round(Number(item?.star ?? 0))));

  return (
    <div className="absolute" style={{ top: top, left: left }}>
      {/* Yuvarlak buton (peer + toggle) */}
      <button
        type="button"
        className="peer w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-blue-500 hover:text-white transition cursor-pointer"
        aria-label={title}
        onClick={() => setPinned((v) => !v)}
      >
        <Plus size={18} />
      </button>

      {/* Tooltip: visible on + hover (peer-hover) or when pinned */}
      <div
        className={
          `absolute transition-all duration-300 z-10 opacity-0 pointer-events-none 
           peer-hover:opacity-100 peer-hover:pointer-events-auto peer-focus-visible:opacity-100 ` +
          (
            placement === "right"
              ? "left-10 top-1/2 -translate-y-1/2 peer-hover:translate-x-2 peer-focus-visible:translate-x-2"
              : placement === "left"
              ? "right-10 top-1/2 -translate-y-1/2 peer-hover:-translate-x-2 peer-focus-visible:-translate-x-2"
              : placement === "bottom"
              ? "top-10 left-1/2 -translate-x-1/2 peer-hover:translate-y-2 peer-focus-visible:translate-y-2"
              : "bottom-10 left-1/2 -translate-x-1/2 peer-hover:-translate-y-2 peer-focus-visible:-translate-y-2"
          ) +
          (pinned ? " opacity-100 pointer-events-auto" : "")
        }
      >
        <div className="relative bg-white shadow-lg rounded-lg p-3 w-48 border border-gray-100">
          {/* Arrow (border + fill) by placement */}
          {placement === "right" && (
            <>
              <div className="absolute left-[-9px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-r-[9px] border-r-gray-200" />
              <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white" />
            </>
          )}
          {placement === "left" && (
            <>
              <div className="absolute right-[-9px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-l-[9px] border-l-gray-200" />
              <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white" />
            </>
          )}
          {placement === "bottom" && (
            <>
              <div className="absolute top-[-9px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[9px] border-x-transparent border-b-[9px] border-b-gray-200" />
              <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white" />
            </>
          )}
          {placement === "top" && (
            <>
              <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[9px] border-x-transparent border-t-[9px] border-t-gray-200" />
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
            </>
          )}
          <img
            src={image}
            alt={title}
            className="w-full h-24 object-cover rounded-md mb-2"
          />
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{title}</h3>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">{price}</span>
            <button
              type="button"
              onClick={() => addToCart(item)}
              className="px-2 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HoverProduct: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: QueryKeys.products.All,
    queryFn: async () => await getAPi("/products"),
  });

  const products = data?.data ?? [];
  const top4 = products.slice(0, 4);

  // Predefined positions for 4 hotspots (requested)
  const positions = [
    { top: "8%", left: "35%" },
    { top: "53%", left: "13%" },
    { top: "43%", left: "73%" },
    { top: "89%", left: "83%" },
  ];

  // Tooltip placements per hotspot index
  const placements: ("top" | "bottom" | "left" | "right")[] = [
    "bottom", // 1: cart below
    "right",  // 2: cart right
    "left",   // 3: cart left
    "top",    // 4: cart above
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start px-4 md:px-8">
        {/* Sol taraf - Foto ve Hotspotlar */}
        <div className="2xl:col-span-7 md:col-span-7 col-span-12 flex justify-center">
          <div
            className="relative rounded-2xl overflow-hidden w-full max-w-[785px]"
            style={{ aspectRatio: "785 / 515" }}
          >
            <img
              src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Pin-Banner-1.jpeg"
              alt="Desk setup"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />

            {/* Hotspotlar: 1, 2, 3, 4 ürün (sırayla) */}
            {!isLoading && top4.map((p: any, i: number) => (
              <Hotspot
                key={p._id}
                top={positions[i]?.top}
                left={positions[i]?.left}
                item={p}
                placement={placements[i]}
              />
            ))}
          </div>
        </div>

        {/* Sağ taraf - Metin */}
        <div className="2xl:space-y-6 2xl:col-span-5 md:col-span-5 col-span-12 mt-8 md:mt-0">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            XStore Elementor Minimal Electronics Demo
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
            Lookout Smart products here, there, everywhere.
          </h1>
          <p className="text-gray-600">
            Save when you shop the Best Buy Outlet for clearance, open-box,
            refurbished and pre-owned items save more with coupons and 70% off.
            Super value deals 2022.
          </p>

          <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-black transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default HoverProduct;
