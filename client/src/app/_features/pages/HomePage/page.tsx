import React from 'react'
import Banner from '../../../_common/BannerSection'
import CarouselSize from '@/app/_common/Carousel'
import CarouselSizeCategory from '@/app/_common/CarouselCategory'
import CarouselProfile from '@/app/_common/CarouselProfile'
// import { stripe } from '@/lib/stripe'

export default async function  HomePage() {
  // const products = await stripe.products.list({
  //   expand: ['data.default_price'],
  //   limit: 5,
  // });
  // console.log(products);
  return (
    <div className='container-fluid mx-[150px] w-full'>
    <Banner/>
    <CarouselSizeCategory />
    <CarouselSize  />
    <CarouselProfile/>
    </div>
  )
}

