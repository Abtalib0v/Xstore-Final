import React from 'react'
import Banner from '../../sections/HomeSection/BannerSection'
import CarouselSize from '@/app/_features/sections/HomeSection/Carousel'
import CarouselSizeCategory from '@/app/_features/sections/HomeSection/CarouselCategory'
import CarouselProfile from '@/app/_features/sections/HomeSection/CarouselProfile'
import CarouselBlog from '@/app/_features/sections/HomeSection/CarouselBlog'
import SponsoredSec from '../../sections/HomeSection/SponsoreSec'
import NewProduct from '../../sections/HomeSection/NewProduct'
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
    <NewProduct/>
    <CarouselProfile/>
    <CarouselBlog/>
    <SponsoredSec/>
    </div>
  )
}

