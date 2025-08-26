import React from 'react'
import ContactInfoSection from '../../sections/ContactSection/ContactInfoSec'
import ContactMapSection from '../../sections/ContactSection/ContactMapSec'
import ContactFormSection from '../../sections/ContactSection/ContactFormSec'
import BreadCrumbContact from '../../sections/ContactSection/BreadCrumbShop'
import { HeadSec } from '../../sections/ContactSection/HeadSec'

const ContactPage = () => {
  return (
    <div className='container-fluid  2xl:px-[150px] mb-[85px] px-0 w-full flex flex-col justify-center'>
        <BreadCrumbContact/>
        <HeadSec/>
        <ContactInfoSection/>
        <ContactMapSection/>
        <ContactFormSection/>
    </div>
  )
}

export default ContactPage