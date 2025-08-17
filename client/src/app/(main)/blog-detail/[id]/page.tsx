"use client";
import { getAPi } from "@/app/_http/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { BsEye } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import AddToCartButton from "@/components/ui/addToCartButton";
import { QueryKeys } from "@/app/_constant/QueryKeys";
import Card from "../../cart";
import { useCart } from "@/app/_Providers/CardProviders";
import Image from "next/image";
type Params = {
  params: {
    id: string;
  };
};

const BlogDetailSection = () => {
  const params = useParams();
    const [isGrid, setIsGrid] = useState(true);
  
  const { data, isLoading } = useQuery({
    queryKey: ["blog", params.id],
    queryFn: () => getAPi(`/blogs/${params.id}`),
  });  
//   if (isLoading) {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       Loading...
//     </div>
//   );
// }
  const { truncateText } = useCart();


  // const { id } = useParams();
  //   const { data} = useQuery({
  // queryKey: ["product", id],
  // const data= getAPi(`/products?/${params.id}`)

  const item = data?.data?.[0];
  // const item = data?.data?.[0];
  // console.log(data)
 const { data: categoriesData, isLoading: catLoading } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: () => getAPi("/blogs/categories"),
  });
const { data: blogData } = useQuery({
    queryKey: ["blog", params.id],
    queryFn: () => getAPi(`/blogs/${params.id}`),
  });
  const blog = blogData?.data;
  const categories = categoriesData?.data || [];
   const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAPi("/products"),
  });
    const products = productsData?.data || [];


  return (
    <div className="container-fluid px-[150px] w-full ">
       {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    ) : (
      <>
      
      <div className="pt-[15px] pb-[50px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">
                {data?.categories.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex 2xl:grid-cols-12 2xl:grid flex-col gap-[32px] ">
        <div className="grid col-span-9">
          <div className="flex flex-col 2xl:col-span-12 col-span-12 mb-[22px]">
            <div className=" border-[1px] border-[#ddd] rounded-[16px] overflow-hidden">
              <Image
                className="rounded-[8px] w-full"
                width={1000}
                height={500}
        src={data?.imageUrl }
                alt={data?.name || "Blog Image"}
              />
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
              <h1 className="text-[16px] text-[#888888] flex gap-1.5 items-center">
                <LuCalendarDays />
                {data?.createdAtFormatted} / Posted by Rose Tyler / <BsEye />
                {data?.views ?? 0} / <FaRegCommentAlt />
                {data?.commentCount ?? 0}
              </h1>
              <p className=" text-[18px] text-[#777777]">{data?.description}</p>
            </div>
            <div className="my-[32px]">
              <div className="flex flex-col gap-[16px]"></div>
            </div>
          </div>
        </div>
        <div className="grid col-span-3 h-auto">
          <div className="grid grid-cols-1 gap-[30px]">
            <div className=" flex flex-col gap-[20px]">
              <div className="flex flex-col border border-[#E5E5E5]  rounded-[20px] p-[35px]">
            <div className="text-[#222222] font-medium mb-[20px] border-b pb-[20px] text-[17.92px]">Categories</div>
            <div className=" text-[17.92px] flex flex-col gap-[10px] text-[#888888] list-none">
              {categories.map((cat: any) => (
                  <li key={cat._id}>
                    <Link
                      href={`/blog/category/${cat._id}`}
                      className="text-[#555] hover:text-black flex gap-1.5 duration-200"
                    >
                      {cat.name} <div className="text-[#000]">({cat.count})</div>
                    </Link>
                  </li>
                ))}
            </div>
          </div>
          <div className="flex flex-col border border-[#E5E5E5]  rounded-[20px] p-[35px]">
            <div className="text-[#222222] font-medium mb-[20px] border-b pb-[20px] text-[17.92px]">Best-Selling</div>
            <div className=" text-[17.92px] flex flex-col gap-[10px] text-[#888888] list-none">
              {products.slice(0, 5).map((item:any) => (
    <div key={item._id} className="flex items-center p-2">
      <Link href={`/detail/${item._id}`}>
      <Image
        width={500}
        height={500}
        src={item.imageUrl }
        alt={item.name}
        className="w-[70px] h-[70px] object-cover mr-[20px] "
      />
      </Link>
      
      <div className="flex flex-col  overflow-hidden">
        <Link href={`/detail/${item._id}`}>     
           <h3 className="text-[15.96px] font-medium text-[#222222] hover:text-[#888] duration-200">{
           truncateText(item.name, 23)}
           </h3>

        </Link>
        <p className="text-sm font-medium">${item.price}</p>
      </div>
    </div>
  ))}
            </div>
          </div>
            </div>
            
          </div>
          
        </div>
      </div>
      </>
    )}
      
    </div>
    
  );
};

export default BlogDetailSection;
