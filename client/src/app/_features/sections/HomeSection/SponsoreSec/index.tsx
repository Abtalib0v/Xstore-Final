"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselSizeCategory = () => {
  // Resim listesi
  const CategoryImages = [
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-01.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-02.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-03.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-04.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-05.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/brand-06.jpeg",
    "https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Logo.jpeg",
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
          <CarouselContent className="flex w-full gap-6">
            {CategoryImages.map((imgSrc, idx) => (
              <CarouselItem
                key={idx}
                className="basis-[100%] sm:basis-[48%] lg:basis-[30%] 2xl:basis-[17%] flex justify-center"
              >
                <div className=" w-full max-w-[380px] ">
                  <img
                    src={imgSrc}
                    alt={`Category ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigasiya düymələri */}
          
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselSizeCategory;
