"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAPi } from "@/app/_http/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CarouselSizeCategory({
  params,
}: {
  params?: { id: string };
}) {
  const { data: productData } = useQuery({
    queryKey: ["product", params?.id],
    queryFn: () => getAPi(`/products/${params?.id}`),
    enabled: Boolean(params?.id),
  });

  const { data: categoriesData, isLoading: catLoading } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => getAPi("/products/categories"),
  });

  const product = productData;
  const categories = categoriesData?.data || [];

  // Resim listesi
  const CategoryImages = [
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/2-min-366x366.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/4-min-366x366.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/3-min-366x366.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/1-min-366x366.jpeg",
  ];

  return (
    <div>
      <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full py-8 flex justify-center"
    >
      <div className="w-full">
        {catLoading ? (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        ) : (
          <div className="w-full">
            <CarouselContent className="flex w-full gap-6">
              {categories.map((cat: any, idx: number) => {
                const imgSrc = CategoryImages[idx % CategoryImages.length];

                return (
                  <CarouselItem
                    key={cat._id}
                    className="basis-[100%] sm:basis-[48%] lg:basis-[30%] 2xl:basis-[23%] flex justify-center"
                  >
                    <div className="rounded-[20px] overflow-hidden relative group w-full max-w-[380px] h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[377px] xl:w-[377px]">
                      <img
                        src={imgSrc}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 duration-300 rounded-[20px]"
                      />

                      <Link
                        href={`/product/category/${cat._id}`}
                        prefetch
                        className="absolute top-[20px] sm:top-[30px] lg:top-[40px] left-1/2 -translate-x-1/2 
                          text-[16px] sm:text-[20px] lg:text-[24px] xl:text-[26px] font-medium text-black duration-300 text-center"
                      >
                        {cat.name}
                        <div className="text-[#222222] text-[10px] sm:text-[12px] font-light">
                          {cat.count || 0} PRODUCTS
                        </div>
                      </Link>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Kontroller */}
            <CarouselPrevious className="hidden md:flex lg:flex group-hover:left-[-50px] border border-gray-300 text-gray-300 min-w-[40px] min-h-[40px] duration-500 hover:border-black left-[10px]" />
            <CarouselNext className="hidden md:flex lg:flex group-hover:right-[-50px] border border-gray-300 text-gray-300 min-w-[40px] min-h-[40px] duration-500 hover:border-black right-[10px]" />
          </div>
        )}
      </div>
    </Carousel>
    </div>
    
  );
}
