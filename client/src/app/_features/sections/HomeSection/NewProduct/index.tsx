import { Button } from '@/components/ui/button'
import React from 'react'

const NewProduct = () => {
  return (
    <div className='grid grid-cols-12 gap-[30px] px-[13px] mb-[30px]'>
      <div className='2xl:col-span-6 col-span-12 overflow-hidden rounded-2xl relative group'>
        <div>
            <div className='transition-all duration-500 group-hover:scale-105'>
              <img
            className='w-full'
            src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/1123.jpeg"
            alt=""
          />  
            </div>
          
          <div className='text-white absolute top-1/2 left-[80px] -translate-y-1/2 transition-all duration-500 group-hover:top-[45%]'>
            <span className='text-[12px] font-medium uppercase tracking-[2.4px]'>
              new wearable gadget
            </span>
            <h1 className='text-[40px] font-medium mb-[20px] leading-[1.3em] mt-[20px] max-w-[600px]'>
              Smart Watch-Z2 Pro with Voice Controls
            </h1>
            <div className='absolute opacity-0 top-[130%] transition-all duration-500 group-hover:opacity-100 group-hover:top-[100%]'>
              <Button className='bg-[#2a74ed] hover:bg-[#000000] px-[40px] h-[58px] w-[200px] rounded-full text-white items-center'>
                <div className='flex px-[38px] py-[15px] gap-1.5 items-center'>
                  <h1 className='text-[16px] '>Purchase Now</h1>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

       <div className='2xl:col-span-6 col-span-12 overflow-hidden rounded-2xl relative group'>
        <div>
            <div className='transition-all duration-500 group-hover:scale-105'>
              <img
            className='w-full'
            src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/234.jpeg"
            alt=""
          />  
            </div>
          
          <div className='text-white absolute top-1/2 left-[80px] -translate-y-1/2 transition-all duration-500 group-hover:top-[45%]'>
            <span className='text-[12px] font-medium uppercase tracking-[2.4px]'>
              Free shipping available
            </span>
            <h1 className='text-[40px] font-medium mb-[20px] leading-[1.3em] mt-[20px] max-w-[600px]'>
              Smart Home Gedget with 50% Discount
            </h1>
            <div className='absolute opacity-0 top-[130%] transition-all duration-500 group-hover:opacity-100 group-hover:top-[100%]'>
              <Button className='bg-[#2a74ed] hover:bg-[#000000] px-[40px] h-[58px] w-[200px] rounded-full text-white items-center'>
                <div className='flex px-[38px] py-[15px] gap-1.5 items-center'>
                  <h1 className='text-[16px] '>See Collection</h1>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct
