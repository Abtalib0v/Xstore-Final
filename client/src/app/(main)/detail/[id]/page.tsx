"use client";
import { getAPi } from "@/app/http/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

type Params = {
    params: {
        id: string
    }
}
const DetailSection = () => {
    const params = useParams();
    const {data}=useQuery({
        queryKey:["product",params.id],
        queryFn:()=>getAPi(`/products/${params.id}`)
    })
    // const { id } = useParams();
//   const { data} = useQuery({
    // queryKey: ["product", id],
    // const data= getAPi(`/products?/${params.id}`)

    const item = data?.data?.[0];
    // const item = data?.data?.[0];
    // console.log(data)

  return (
    <div className='flex flex-col container mx-auto px-[15px] w-full 2xl:w-[1400px] pt-[24px]'>
    

    <div className='flex 2xl:grid-cols-12 2xl:grid flex-col gap-[32px] '>
      <div className='flex flex-col 2xl:col-span-6 col-span-12'>
        <div className=' border-[1px] border-[#ddd] rounded-[16px] overflow-hidden'>
<img className='rounded-[8px] w-full' src={data?.imageUrl} alt='' />

</div><div className='flex gap-[10px]'>
        <img className='w-[24px]' src={data?.imageUrl} alt='' />
    </div>
      </div>


<div className='flex flex-col 2xl:col-span-6 col-span-12 '>
    <div className='flex flex-col gap-[12px]'>
        {/* <div>
            {item?.sale && (
              <span className=" bg-[#2b2b2b] tracking-[.2em] leading-[1em]  text-[12px] p-[8px] rounded-[8px]">
                SALE
              </span>
            )}
        </div> */}
        
        
<h2 className='text-[28px] '>{data?.name}</h2>
<h1 className='text-[16px] '>Made by Product Hub</h1>
<h1 className='text-[18px] text-[#a1a1a1]'>${data?.price} value</h1>
<p>{data?.description}</p>
    </div>
  <div className='my-[32px]'>
    <div className='flex flex-col gap-[16px]'>
    
    
    </div>
    
  </div>

</div>
    </div>
                  

    
    
</div>
  )
}

export default DetailSection