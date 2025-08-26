import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
const BreadCrumbTrackOrder = () => {
  return (
    <div className="mx-[60px] flex items-center justify-between ">
        <Breadcrumb>
  <BreadcrumbList className="!gap-0">
    <BreadcrumbItem>
      <BreadcrumbLink className='text-[13px]'  href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
        <BreadcrumbSeparator className="mx-1 " />
    <BreadcrumbItem>
      <BreadcrumbPage className='text-[13px]'>Track Order</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      </div>
  )
}

export default BreadCrumbTrackOrder