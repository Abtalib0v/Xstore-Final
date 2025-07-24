"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/constant/QueryKeys";
import { getAPi } from "@/app/http/api";
import BlogCard from "@/app/(main)/blog/blog-card";

const ITEMS_PER_PAGE = 7;

export default function BlogPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.products.All,
    queryFn: async () => await getAPi("/blogs"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  const allProducts = data?.data ?? [];
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="container-fluid px-[150px] w-full  ">
        <div className="grid grid-cols-12">

        
        {paginatedProducts.map((item: any, idx: number) => (
          <div
            key={idx}
            className="grid col-span-4   mr-[10px] pl-0 w-full"
          >
            <BlogCard
              id={item._id}
              item={item._id}
              idx={idx}
              name={item?.name ?? ""}
              description={item?.description ?? ""}
              createdAtFormatted={item?.createdAtFormatted ?? ""}
              categories={item?.categories?.name ?? ""}
              imageUrl={item?.imageUrl}
            />
          </div>
        ))}
        </div>
      </div>

      <Pagination className="mt-6 justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
