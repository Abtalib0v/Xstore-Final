import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React from "react";

const Banner = () => {
  return (
    <div  style={{ width: "100%", maxHeight: "580px" }}>
      <div
        className=""
        style={{
          backgroundImage:
            'url("https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/04_Sub_banner.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "315px",
          borderRadius: "20px",
        }}
      >
        <div className="max-w-[636px] pt-[85px] pb-[65px] 2xl:mr-[80px] 2xl:ml-[240px] mr-[10px] ml-[20px]">
          <h1 className="text-[12px] text-[#444444] tracking-normal uppercase">Save upto 30% discount on</h1>
          <h2 className="text-[40px] text-[#222222] font-medium leading-[38.8px] tracking-normal mt-[20px]">
            Smart Home Devices
          </h2>{" "}
          <Button className="mt-[40px] bg-[#2a74ed] p-0 hover:bg-[#000000] w-[200px] rounded-full h-[46px] text-white items-center">
            <div className="flex px-[38px] py-[15px] gap-1.5 items-center">
              <h1 className="text-[16px] ">Buy Product Now</h1>
            </div>{" "}
          </Button >
        </div>
      </div>
    </div>
  );
};

export default Banner;