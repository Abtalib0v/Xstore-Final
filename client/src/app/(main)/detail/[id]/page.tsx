"use client";
import { getAPi } from "@/app/http/api";
import { useCart } from "@/app/Providers/CardProviders";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import DrawerSection from "../../Drawer";
import AddToCartButton from "@/components/ui/addToCartButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
// type Params = {
//     params: {
//         id: string
//     }
// }
const DetailSection = ({
  // item,
  id,
  idx,
  name,
  star,
  price,
  categories,
  imageUrl,
  addToCart,
}: {
  item: any;
  id: any;
  idx: number;
  name: string;
  star: string;
  price: string;
  categories: string;
  imageUrl: string;
  addToCart: () => void;
}) => {
   

    const params = useParams();
    const {data}=useQuery({
        queryKey:["product",params.id],
        queryFn:()=>getAPi(`/products/${params.id}`)
    })
  
    const item = data?.data?.[0];
  return (
    <div className='flex flex-col container mx-auto px-[15px] w-full 2xl:w-[1400px] pt-[24px]'>
    <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/shop">{data?.categories.name}</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{data?.name}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

    <div className='flex 2xl:grid-cols-12 2xl:grid flex-col gap-[32px] '>
      <div className='flex flex-col 2xl:col-span-6 col-span-12'>
        <div className=' border-[1px] border-[#ddd] rounded-[16px] overflow-hidden'>
<img className='rounded-[8px] w-full' src={data?.imageUrl} alt='' />

</div>
      </div>


<div className='flex flex-col 2xl:col-span-6 col-span-12 '>
    <div className='flex flex-col gap-[12px]'>
        
        
<h2 className='text-[28px] '>{data?.name}</h2>
{/* <h1 className='text-[16px] '>Made by Product Hub</h1> */}
<h1 className='text-[18px] text-[#a1a1a1]'>${data?.price}</h1>
<p>{data?.description}</p>
  <AddToCartButton
  id={data?._id}
  name={data?.name}
  price={data?.price}
  imageUrl={data?.imageUrl}
/>
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