"use client";
import { getAPi } from "@/app/http/api";
import { useCart } from "@/app/Providers/CardProviders";
import AddToCartButton from "@/components/ui/addToCartButton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

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
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<any>(null);

  const handleAddCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
//  const { addToCart } = useCart();
    addToCart();
    setSelectProduct({ id, name, price, imageUrl });
    setOpenDrawer(true);
  };
   

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
 <AddToCartButton item={data} />
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