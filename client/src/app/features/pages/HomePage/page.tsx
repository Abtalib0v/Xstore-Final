import React from 'react'
import Banner from './BannerSection'
import { CarouselSize } from '@/app/common/Carousel'
// import { stripe } from '@/lib/stripe'

export default async function  HomePage () {
  // const products = await stripe.products.list({
  //   expand: ['data.default_price'],
  //   limit: 5,
  // });
  // console.log(products);
  return (
    <div className='container-fluid mx-[150px] w-full'>
    <Banner/>
    <CarouselSize/>
    </div>
  )
}

