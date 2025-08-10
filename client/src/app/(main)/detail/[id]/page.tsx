"use client";
import { getAPi } from "@/app/http/api";
import { useCart } from "@/app/Providers/CardProviders";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import AddToCartButton from "@/components/ui/addToCartButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const DetailSection = () => {
  const params = useParams();

  // Tek ürün detayı çek
  const { data: productData, isLoading: productLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getAPi(`/products/${params.id}`),
  });

  // Kategoriler
  const { data: categoriesData, isLoading: catLoading } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => getAPi("/products/categories"),
  });

  // Tüm ürünler (best-selling için)
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAPi("/products"),
  });

  // Backend'den productData direkt ürün objesi geliyor
  const product = productData;

  // Kategoriler ve ürünler data içinde
  const categories = categoriesData?.data || [];
  const products = productsData?.data || [];

  const { truncateText } = useCart();

  if (productLoading || catLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col container mx-auto px-[15px] w-full 2xl:w-[1400px] pt-[24px]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">
              {product?.categories && product.categories.length > 0
                ? product.categories[0].name
                : "Category"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex 2xl:grid-cols-12 2xl:grid flex-col gap-[32px]">
        <div className="grid col-span-9">
          <div className=" border-[1px] border-[#ddd] rounded-[16px] overflow-hidden">
            <img className="rounded-[8px] w-full" src={product?.imageUrl} alt="" />
          </div>
          <div className="flex flex-col 2xl:col-span-6 col-span-12 ">
          <div className="flex flex-col gap-[12px]">
            <h2 className="text-[28px] ">{product?.name}</h2>
            {/* <h1 className='text-[16px] '>Made by Product Hub</h1> */}
            <h1 className="text-[18px] text-[#a1a1a1]">${product?.price}</h1>
            <p>{product?.description}</p>
            <AddToCartButton
              id={product?._id}
              name={product?.name}
              price={product?.price}
              imageUrl={product?.imageUrl}
            />
          </div>
          <div className="my-[32px]">
            <div className="flex flex-col gap-[16px]"></div>
          </div>
        </div>
        </div>

        <div className="grid col-span-3 h-auto">
          <div className="grid grid-cols-1 gap-[30px]">
            {/* Categories */}
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col border border-[#E5E5E5] rounded-[20px] p-[35px]">
                <div className="text-[#222222] font-medium mb-[20px] border-b pb-[20px] text-[17.92px]">
                  Categories
                </div>
                <ul className="text-[17.92px] flex flex-col gap-[10px] text-[#888888] list-none">
                  {categories.map((cat: any) => (
                    <li key={cat._id}>
                      <Link
                        href={`/product/category/${cat._id}`}
                        className="text-[#555] hover:text-black flex gap-1.5 duration-200"
                      >
                        {cat.name}{" "}
                        <div className="text-[#000]">({cat.count || 0})</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best-Selling */}
              <div className="flex flex-col border border-[#E5E5E5] rounded-[20px] p-[35px]">
                <div className="text-[#222222] font-medium mb-[20px] border-b pb-[20px] text-[17.92px]">
                  Best-Selling
                </div>
                <div className="text-[17.92px] flex flex-col gap-[10px] text-[#888888] list-none">
                  {products.slice(0, 5).map((item: any) => (
                    <div
                      key={item._id}
                      className="flex items-center p-2 cursor-pointer"
                    >
                      <Link href={`/detail/${item._id}`}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-[70px] h-[70px] object-cover mr-[20px]"
                        />
                      </Link>

                      <div className="flex flex-col overflow-hidden">
                        <Link href={`/detail/${item._id}`}>
                          <h3 className="text-[15.96px] font-medium text-[#222222] hover:text-[#888] duration-200">
                            {truncateText(item.name, 23)}
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
    </div>
  );
};

export default DetailSection;
