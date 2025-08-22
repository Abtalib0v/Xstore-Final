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
        containScroll: "trimSnaps",
      }}
      className="w-full py-4"
    >
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        ) : (
          // Use a named group to prevent interfering with inner card-level `group` hovers
          <div className="group/carousel w-full">
            {/* Override default Embla gutters to prevent trailing loop gap */}
            <CarouselContent className="mx-0 w-full !ml-0">
              {data?.data?.map((item: any, idx: number) => (
                <CarouselItem
                  key={item._id}
                  className="
                    basis-[100%] sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 
                    !pl-0
                    py-[60px] sm:py-[80px] lg:py-[100px] 
                    items-center
                    text-center
                    gap-1
                  "
                >
                  <div className=" rounded-[20px] pr-10">
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

            {/* Carousel Controls */}
            <CarouselPrevious className="
              hidden md:flex lg:flex
              group-hover/carousel:left-[-50px]
              border border-gray-300 text-gray-300 
              min-w-[40px] min-h-[40px] duration-500
              hover:border-[#000000] 
              left-[10px]
            " />
            <CarouselNext className="
              hidden md:flex lg:flex
              group-hover/carousel:right-[-50px]
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
