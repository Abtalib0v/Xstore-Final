"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { QueryKeys } from "@/app/_constant/QueryKeys";
import { getAPi } from "@/app/_http/api";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/app/_Providers/CardProviders";
import Card from "@/app/(main)/cart";

export default function CarouselSize() {
  const { data, isLoading } = useQuery({
    queryKey: QueryKeys.products.All,
    queryFn: async () => await getAPi("/products"),
  });

  const { addToCart } = useCart();

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full py-4 flex justify-center"
    >
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        ) : (
          <div className="group w-full">
            <CarouselContent className="mx-0 flex w-full gap-[20px]">
              {data?.data?.map((item: any, idx: number) => (
                <CarouselItem
                  key={item._id}
                  className="
                    basis-[100%] sm:basis-[48%] lg:basis-[32%] 2xl:basis-[23.6%] 
                    py-[60px] sm:py-[80px] lg:py-[100px] 
                    items-center text-center
                  "
                >
                  <div className="hover:scale-105 rounded-[20px] hover:shadow-[0px_0px_11px_1px_rgba(0,0,0,0.1)] duration-300">
                    <Card
                     addToCart={() => addToCart(item)}
                     id={item._id}
                item={item._id} 
                idx={idx} 
                name={item?.name ?? ""}
                star={item?.star ?? ""}
                price={item?.price ?? ""}
                categories={item?.categories?.name ?? ""}
                imageUrl={item?.imageUrl}
                viewMode="grid"
                
                />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Kontrolleri */}
            <CarouselPrevious className="
              hidden md:flex lg:flex
              group-hover:left-[-50px]
              border border-gray-300 text-gray-300 
              min-w-[40px] min-h-[40px] duration-500
              hover:border-[#000000] 
              left-[10px]
            " />
            <CarouselNext className="
              hidden md:flex lg:flex
              group-hover:right-[-50px]
              border border-gray-300 text-gray-300 
              min-w-[40px] min-h-[40px] duration-500
              hover:border-[#000000] 
              right-[10px]
            " />
          </div>
        )}
      </div>
    </Carousel>
  );
}
