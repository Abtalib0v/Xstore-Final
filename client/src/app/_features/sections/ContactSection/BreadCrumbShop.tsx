import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
const BreadCrumbContact = () => {
  return (
    <div className=" flex items-center justify-between pt-[15px] pb-[50px] ">
        <Breadcrumb>
  <BreadcrumbList className="!gap-0">
    <BreadcrumbItem>
      <BreadcrumbLink className='text-[13px]'  href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
        <BreadcrumbSeparator className="mx-1 " />
    <BreadcrumbItem>
      <BreadcrumbPage className='text-[13px]'>Contact Us</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      </div>
  )
}

export default BreadCrumbContact