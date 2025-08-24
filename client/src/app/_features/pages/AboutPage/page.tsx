import React from 'react'
import { HeadSec } from '../../sections/AboutSection/HeadSec'
import BreadCrumbAbout from '../../sections/AboutSection/BreadCrumbAbout'
import Banner from '../../sections/AboutSection/Banner'
import IconSec from '../../sections/AboutSection/IconSec'
import KnowAbout from '../../sections/AboutSection/KnowAbout'
import AboutEnd from '../../sections/AboutSection/AboutEnd'

const AboutPage = () => {
  return (
    <div className='container-fluid  2xl:px-[150px] mb-[85px] px-0 w-full flex flex-col justify-center  '>
    <BreadCrumbAbout/>
    <HeadSec/>
    <Banner/>
    <IconSec/>
    <KnowAbout/>
    <AboutEnd/>
    </div>
  )
}

export default AboutPage