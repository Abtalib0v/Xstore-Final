import BlogPagination from '@/app/_common/BlogPagination'
import React from 'react'
import { HeadSec } from '../../sections/BlogSection/HeadSec'
import BreadCrumbShop from '../../sections/BlogSection/BreadCrumbShop'

const BlogPage = () => {
  return (
    <div className='container-fluid  2xl:px-[150px] px-0 w-full flex flex-col justify-center  '>
      <BreadCrumbShop/>
      <HeadSec/>
      <BlogPagination/>

    </div>
  )
}

export default BlogPage