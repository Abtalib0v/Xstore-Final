"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { Star } from "lucide-react";
import { LuChevronRight } from "react-icons/lu";
import Link from "next/link";

export default function CarouselProfile() {
  // Örnek data — sen burayı istediğin gibi güncelleyebilirsin
  const profiles = [
    {
      id: 1,
      name: "Judith Mckinney",
      description:
        "This is by far the best theme on Themeforest. It adapts to a lot of the plugins, and their customer support is great. I really love this theme! Thanks 8theme.",
      img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Avatar-4.jpeg",
      star: 5,
      country: "Seychelles",
    },
    {
      id: 2,
      name: "Harold Nguyen",
      description:
        "As always a 5 star! i bought this theme the third or fourth time so far... really loving it. the new update from 6.0 is awesome",
      img: "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Avatar-1-2.jpeg",
      star: 5,
      country: "Syrian Arab Republic",
    },
  ];

  return (
    <div
      className="2xl:grid 2xl:grid-cols-12 flex flex-col gap-4 2xl:px-[176px] px-[50px] 2xl:relative 2xl:mb-[95px] mb-[195px]"
      style={{
        backgroundImage:
          'url("https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/07_Review-min.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "580px",
        borderRadius: "16px",
      }}
    >
      <div className="2xl:col-span-6 flex">
        <div className="2xl:w-[544px] w-full 2xl:absolute 2xl:top-1/2  transform 2xl:-translate-y-1/2">
            <h1 className="uppercase text-[12px] text-[#444444] tracking-[2px] mb-[20px]" >Client’s Testimonials</h1>
        <h2 className="text-[40px] text-[#222222] font-medium leading-[52px] tracking-normal mb-[15px]">5K+ Satisfied Customers Let’s Look Reviews</h2>
        <div className="w-[80px] h-[4px] bg-[#2a74ed] border-b rounded-full border-[#2a74ed] mb-[20px]"></div>
        <p className="text-[18px] text-[#444444] leading-[30.6px] mb-[40.2px]">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed nonumy
          eirmod tempor invidunt ut labore rem ipsum dolor sit amet, consetetur
          sadipscing elitr.
        </p>
        <div>
            <Link href="/" className="flex items-center gap-2 text-[#2a74ed] mt-[20px] cursor-pointer">
            <h1 className="flex items-center text-[16px] font-medium">View All Reviews <LuChevronRight /></h1>

        </Link>
        </div>
        
        </div>
        
      </div>
      <div className="2xl:col-span-6 flex">
        <Tilt className="2xl:w-[530px] w-full 2xl:absolute 2xl:mb-0 mb-[100px] 2xl:top-1/2 left-[55%] transform 2xl:-translate-y-1/2 rounded-2xl">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="2xl:w-[530px] w-full mx-auto   flex rounded-2xl"
          >
            <CarouselContent>
              {profiles.map((profile) => (
                <CarouselItem
                  key={profile.id}
                  className=" w-[530px] max-w-none flex justify-center rounded-2xl"
                >
                  <div className="!w-[530px] relative flex rounded-2xl bg-white p-[40px] pt-[30px] text-center">
                    <div className="absolute top-[30px] right-[55px] opacity-[.1]">
                      <svg
                        className="quotes"
                        width="75px"
                        height="62px"
                        viewBox="0 0 75 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M58.5 61.8C53.9 61.8 50 60.1 46.8 56.7C43.6 53.1 42 48.3 42 42.3C42 33.7 43.3 26.7 45.9 21.3C48.5 15.7 51.4 11.3 54.6 8.09999C58.2 4.49999 62.5 1.79999 67.5 -1.14441e-05L70.5 4.8C67.1 6.39999 64.1 8.29999 61.5 10.5C59.3 12.5 57.2 14.9 55.2 17.7C53.4 20.3 52.5 23.5 52.5 27.3C52.5 28.7 52.7 29.8 53.1 30.6C53.3 31.2 53.6 31.6 54 31.8C54.4 31.6 55 31.4 55.8 31.2C56.4 31 57 30.8 57.6 30.6C58.4 30.4 59.2 30.3 60 30.3C64.6 30.3 68.2 31.7 70.8 34.5C73.6 37.1 75 40.7 75 45.3C75 49.9 73.4 53.8 70.2 57C67 60.2 63.1 61.8 58.5 61.8ZM16.5 61.8C11.9 61.8 8 60.1 4.8 56.7C1.6 53.1 8.49366e-07 48.3 8.49366e-07 42.3C8.49366e-07 33.7 1.3 26.7 3.9 21.3C6.5 15.7 9.4 11.3 12.6 8.09999C16.2 4.49999 20.5 1.79999 25.5 -1.14441e-05L28.5 4.8C25.1 6.39999 22.1 8.29999 19.5 10.5C17.3 12.5 15.2 14.9 13.2 17.7C11.4 20.3 10.5 23.5 10.5 27.3C10.5 28.7 10.7 29.8 11.1 30.6C11.3 31.2 11.6 31.6 12 31.8C12.4 31.6 13 31.4 13.8 31.2C14.4 31 15 30.8 15.6 30.6C16.4 30.4 17.2 30.3 18 30.3C22.6 30.3 26.2 31.7 28.8 34.5C31.6 37.1 33 40.7 33 45.3C33 49.9 31.4 53.8 28.2 57C25 60.2 21.1 61.8 16.5 61.8Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex min-w-[83px] h-[83px]">
                      <Image
                        src={profile.img}
                        alt={profile.name}
                        width={100}
                        height={100}
                        className="w-[83px] h-[83px] rounded-full mb-4 object-cover"
                      />
                    </div>
                    <div className=" flex flex-col ml-[15px] items-start">
                      <p className="text-gray-600 text-sm text-left italic">
                        {profile.description}
                      </p>
                      <div className="flex my-[15px]">
                        {Array.from({ length: profile.star }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500  fill-yellow-500"
                          />
                        ))}
                      </div>
                      <h3 className="text-[16px] font-medium uppercase font-[jost, sans-serif]">
                        {profile.name}
                      </h3>
                      <h3 className="text-[16px] text-[#888888] !font-dm">
                        {profile.country}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Kontroller */}
            <CarouselPrevious className=" top-[120%] left-[220px] w-[50px] h-[50px] border border-gray-300 text-gray-500 hover:text-black hover:border-black" />
            <CarouselNext className="top-[120%] left-[280px] w-[50px] h-[50px] border border-gray-300 text-gray-500 hover:text-black hover:border-black" />
          </Carousel>
        </Tilt>
      </div>
    </div>
  );
}
