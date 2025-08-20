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
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CarouselBlog() {
  const { data, isLoading } = useQuery({
    queryKey: QueryKeys.blogs.All,
    queryFn: async () => await getAPi("/blogs"),
  });

  const { addToCart } = useCart();
  const { truncateText } = useCart();
 const { data: categoriesData, isLoading: catLoading } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: () => getAPi("/blogs/categories"),
  });
    const categories = categoriesData?.data || [];

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
              {data?.data?.slice(0, 6).map((item: any, idx: number) => {
                const shortDate = item?.createdAtFormatted
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                    }).format(new Date(item.createdAtFormatted))
                  : "";

                return (
                  <CarouselItem
                    key={item._id}
                    className="
                      basis-[100%] sm:basis-[48%] 2xl:basis-[32%] 
                      py-[60px] sm:py-[80px] lg:py-[100px] 
                      items-center text-center
                    "
                  >
                    <div className="relative duration-500">
                      {/* Tarih dairesi */}

                      {/* Kart */}
                      <Link href={`/blog-detail/${item._id}`} prefetch>
                        <div className="py-4 w-full flex">
                          <div className="mx-0 flex w-full">
                            <div>
                              <div className="px-[15px] flex flex-col bg-white">
                                <div className="flex flex-col rounded-[20px] object-cover overflow-hidden">
                                  {shortDate && (
                                    <div className="absolute top-[32px] z-10 left-[65px] -translate-x-1/2">
                                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-black text-sm shadow-lg">
                                        {shortDate}
                                      </div>
                                    </div>
                                  )}
                                  <div className="absolute top-[0px] z-10 ">
                                    {item.category}
                                  </div>
                                  <Image
                                    className="hover:scale-105 h-[313px] w-full duration-300 flex object-cover"
                                    width={500}
                                    height={500}
                                    src={item.imageUrl}
                                    alt={item.name}
                                  />
                                </div>
                                <div className="font-medium text-[#222222] text-start text-[18px] mt-3">
                                  {truncateText(item.name, 45)}
                                </div>
                                <div className="text-start mt-[15px] gap-[10px] text-[#2A74ED] text-[14px] flex items-center">
                                  Countinue Reading <ArrowRight size={15} />
                                </div>
                                <div className="flex mt-[15px] border-t border-[#e1e1e1]  pt-[10px] justify-between">
                                  <div className="flex items-center   gap-1.5 text-[12px]">
                                    <img
                                      className="w-[20px] h-[20px] rounded-full"
                                      src="https://secure.gravatar.com/avatar/a6280f7f23013459511038e00886b0060b0f9988ce085a79d72abe097603402a?s=40&d=mm&r=g"
                                      alt=""
                                    />
                                    <span className=" text-[#888888]">by</span>{" "}
                                    Rose Tyler
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5 text-[12px]">
                                      <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12px"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M22.56 1.68h-2.568v-1.032c0-0.264-0.24-0.576-0.576-0.576h-2.76c-0.264 0-0.576 0.24-0.576 0.576v1.032h-8.28v-1.032c0-0.264-0.24-0.576-0.576-0.576h-2.712c-0.264 0-0.576 0.24-0.576 0.576v1.032h-2.496c-0.264 0-0.552 0.24-0.552 0.576v21.096c0 0.264 0.24 0.576 0.576 0.576h21.096c0.264 0 0.576-0.24 0.576-0.576v-21.12c-0.024-0.312-0.264-0.552-0.576-0.552zM22.032 7.080v15.72h-20.016v-15.72h20.016zM5.136 3.24v-2.040h1.632v2.064h-1.632zM17.232 3.24v-2.040h1.632v2.064h-1.632zM4.608 4.392h2.76c0.264 0 0.576-0.24 0.576-0.576v-1.032h8.256v1.032c0 0.264 0.24 0.576 0.576 0.576h2.736c0.264 0 0.576-0.24 0.576-0.576v-1.032h1.992v3.216h-20.064v-3.216h2.040v1.032c-0.024 0.264 0.216 0.576 0.552 0.576zM19.584 9.096h-15.168v11.664h15.192v-11.664zM18.48 17.232v2.424h-2.424v-2.424h2.424zM18.48 13.704v2.448h-2.424v-2.448h2.424zM18.48 10.176v2.448h-2.424v-2.448h2.424zM14.976 17.232v2.424h-2.4v-2.424h2.4zM14.976 13.704v2.448h-2.4v-2.448h2.4zM14.976 10.176v2.448h-2.4v-2.448h2.4zM9.024 12.624v-2.448h2.424v2.448h-2.424zM9.024 16.152v-2.448h2.424v2.448h-2.424zM11.448 17.232v2.424h-2.424v-2.424h2.424zM7.92 17.232v2.424h-2.424v-2.424h2.424zM7.944 13.704v2.448h-2.424v-2.448h2.424zM7.944 10.176v2.448h-2.424v-2.448h2.424z"></path>
                                      </svg>
                                      <div>{item.createdAtFormatted}</div>
                                      <div className="flex items-center gap-1.5 text-[12px]">
                                        <svg
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12px"
                                          height="1em"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M21.288 0.528h-18.6c-1.44 0-2.64 1.176-2.64 2.64v12.744c0 1.44 1.176 2.64 2.64 2.64h2.52l2.256 4.56c0.096 0.216 0.336 0.384 0.6 0.384 0.24 0 0.456-0.12 0.6-0.36l2.256-4.536h10.368c1.44 0 2.64-1.176 2.64-2.64v-12.792c0-1.44-1.176-2.64-2.64-2.64zM22.632 3.168v12.744c0 0.72-0.576 1.296-1.296 1.296h-10.824c-0.264 0-0.504 0.144-0.6 0.36l-1.848 3.696-1.848-3.696c-0.096-0.216-0.336-0.384-0.6-0.384h-2.928c-0.696 0-1.272-0.576-1.272-1.272v-12.744c0-0.72 0.576-1.296 1.296-1.296h18.624c0.72 0 1.296 0.576 1.296 1.296z"></path>
                                        </svg>
                                        <div>0</div>
                                      </div>
                                      <div>
                                        <svg
                                          width="1em"
                                          height="1em"
                                          viewBox="0 0 12 12"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M9.11773 7.80952C8.5453 7.80952 8.03418 8.03417 7.62558 8.42267C7.54366 8.50459 7.46224 8.60661 7.40093 8.68853L4.10956 6.68526C4.19148 6.46061 4.23219 6.23546 4.23219 5.9902C4.23219 5.74494 4.19148 5.51979 4.10956 5.29514L7.40093 3.31197C7.78942 3.8638 8.42317 4.21158 9.11823 4.21158C10.2837 4.21158 11.224 3.27127 11.224 2.10579C11.224 0.940319 10.2837 0 9.11823 0C7.95276 0 7.01244 0.940319 7.01244 2.10579C7.01244 2.33044 7.05315 2.5556 7.11446 2.78025L3.80249 4.76341C3.414 4.21158 2.78025 3.88441 2.10579 3.88441C0.940319 3.88441 0 4.82473 0 5.9902C0 7.15567 0.940319 8.09599 2.10579 8.09599C2.78025 8.09599 3.414 7.76881 3.80249 7.21699L7.11446 9.22025C7.03254 9.4449 7.01244 9.67006 7.01244 9.89471C7.01244 10.4671 7.23709 10.9783 7.62558 11.3869C8.01407 11.7753 8.5458 12 9.11773 12C9.68966 12 10.2013 11.7753 10.6099 11.3869C10.9984 10.9984 11.223 10.4666 11.223 9.89471C11.223 9.32278 10.9984 8.81116 10.6099 8.40256C10.2214 8.03468 9.68966 7.80952 9.11773 7.80952V7.80952ZM10.6305 9.91481C10.6305 10.3239 10.4671 10.6918 10.2013 10.9778C9.91532 11.2637 9.54693 11.407 9.13834 11.407C8.72974 11.407 8.36135 11.2436 8.07539 10.9778C7.78942 10.6918 7.64619 10.3234 7.64619 9.91481C7.64619 9.50622 7.80953 9.13783 8.07539 8.85186C8.36135 8.5659 8.72974 8.42267 9.13834 8.42267C9.54693 8.42267 9.91532 8.586 10.2013 8.85186C10.4671 9.13783 10.6305 9.50622 10.6305 9.91481ZM7.62508 2.10579C7.62508 1.2881 8.29954 0.613645 9.11723 0.613645C9.93492 0.613645 10.63 1.2881 10.63 2.10579C10.63 2.92348 9.95552 3.59794 9.13783 3.59794C8.32014 3.59794 7.62508 2.92348 7.62508 2.10579V2.10579ZM2.1259 7.50245C1.3082 7.50245 0.633748 6.82799 0.633748 6.0103C0.633748 5.19261 1.3082 4.51816 2.1259 4.51816C2.94359 4.51816 3.61804 5.19261 3.61804 6.0103C3.61804 6.82799 2.94359 7.50245 2.1259 7.50245V7.50245Z"></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Carousel Kontrolleri */}
            <CarouselPrevious
              className="
                hidden md:flex lg:flex
                group-hover:left-[-50px]
                border border-gray-300 text-gray-300 
                min-w-[40px] min-h-[40px] duration-500
                hover:border-[#000000] 
                left-[10px]
              "
            />
            <CarouselNext
              className="
                hidden md:flex lg:flex
                group-hover:right-[-50px]
                border border-gray-300 text-gray-300 
                min-w-[40px] min-h-[40px] duration-500
                hover:border-[#000000] 
                right-[10px]
              "
            />
          </div>
        )}
      </div>
    </Carousel>
  );
}
