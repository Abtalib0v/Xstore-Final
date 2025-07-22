import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React from "react";

const Banner = () => {
  return (
    <div  style={{ width: "100%", maxHeight: "580px" }}>
      <div
        className="px-[80px] py-[113px]"
        style={{
          backgroundImage:
            'url("https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/Image-4-min.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "580px",
          borderRadius: "20px",
        }}
      >
        <div className="w-200px md:w-[600px] sm:w-[400px] 2xl:w-[536px]">
          <h1 className="text-[12px] text-[#444444] tracking-normal">THE NEXT GENERATION</h1>
          <h2 className="text-[40px] 2xl:text-[58px] text-[#222222] font-medium leading-[38.8px] tracking-normal mt-[20px]">
            Innovation That{" "}
          </h2>{" "}
          <h3 className="text-[40px] 2xl:text-[58px] font-medium text-[#222222] leading-[38.8px] mt-[20px]">
            Drives Emotion
          </h3>
          <p className="text-[18px] text-[#444444] mt-[33px]">
            Get instant alerts for anyone who approaches, even if they don’t
            press the headphone.
          </p>
          <Button className="mt-[40px] bg-[#2a74ed] hover:bg-[#000000] w-[200px] rounded-full h-[58px] text-white items-center">
            <div className="flex px-[31px] gap-1.5 items-center">
              <ShoppingCart size={100} />
              <h1 className="text-[18px] ">Buy Now - $320</h1>
            </div>{" "}
          </Button >
        </div>
      </div>
    </div>
  );
};

export default Banner;
