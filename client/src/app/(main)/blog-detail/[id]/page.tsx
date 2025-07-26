"use client";
import { getAPi } from "@/app/http/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { LuCalendarDays } from "react-icons/lu";
import { BsEye } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";

type Params = {
  params: {
    id: string;
  };
};
const BlogDetailSection = () => {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["blog", params.id],
    queryFn: () => getAPi(`/blogs/${params.id}`),
  });
  // const { id } = useParams();
  //   const { data} = useQuery({
  // queryKey: ["product", id],
  // const data= getAPi(`/products?/${params.id}`)

  const item = data?.data?.[0];
  // const item = data?.data?.[0];
  // console.log(data)

  return (
    <div className="container-fluid px-[150px] w-full ">
      <div className="flex 2xl:grid-cols-12 2xl:grid flex-col gap-[32px] ">
        <div className="grid col-span-9">
          <div className="flex flex-col 2xl:col-span-12 col-span-12 mb-[22px]">
          <div className=" border-[1px] border-[#ddd] rounded-[16px] overflow-hidden">
            <img className="rounded-[8px] w-full" src={data?.imageUrl} alt="" />
          </div>
        </div>

        <div className="flex flex-col 2xl:col-span-12 col-span-12 ">
          <div className="flex flex-col gap-[12px]">
            {/* <div>
            {item?.sale && (
              <span className=" bg-[#2b2b2b] tracking-[.2em] leading-[1em]  text-[12px] p-[8px] rounded-[8px]">
                SALE
              </span>
            )}
        </div> */}

            <h2 className="text-[24px] w-full 2xl:w-[42%] ">{data?.name}</h2>
            <h1 className="text-[16px] text-[#888888] flex gap-1.5 items-center"><LuCalendarDays />{data?.createdAtFormatted} / Posted by Rose Tyler / <BsEye />{data?.views?? 0} / <FaRegCommentAlt />{data?.commentCount?? 0}</h1>
            <p className=" text-[18px] text-[#777777]" >{data?.description}</p>
          </div>
          <div className="my-[32px]">
            <div className="flex flex-col gap-[16px]"></div>
          </div>
        </div>  
        </div>
        <div className="grid col-span-3">

<div>
{}
</div>
        </div>
        
      </div>
    </div>
  );
};

export default BlogDetailSection;
