"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { QueryKeys } from "@/app/constant/QueryKeys";
import { getAPi } from "@/app/http/api";
import { useQuery } from "@tanstack/react-query";
import Card from "@/app/(main)/cart";
import { useCart } from "@/app/Providers/CardProviders";

export const CarouselSize = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: QueryKeys.products.All,
    queryFn: async () => await getAPi("/products"),
  });
  const {addToCart} = useCart()
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full py-4 flex justify-center"
    >
      <div className="group w-full">
        <CarouselContent className="mx-0 flex  w-full">
          {data &&
            data?.data?.map((item: any, idx: number) => (
              <CarouselItem
                key={idx}
                className="basis-[100%] py-[100px]  items-center text-center md:basis-[48%] mr-[30px] pl-0 w-full 2xl:basis-[23.6%]"
              >
                <div>
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
                
                />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="hidden group-hover:left-[-50] border border-gray-300 text-gray-300 min-w-[40px] duration-500 min-h-[40px] hover:border-[#000000]  md:flex lg:flex left-[10]"  />
        <CarouselNext className="hidden group-hover:right-[-50] border border-gray-300 text-gray-300 min-w-[40px] duration-500 min-h-[40px] hover:border-[#000000]  md:flex lg:flex right-[10]" />
      </div>
    </Carousel>
  );
};
