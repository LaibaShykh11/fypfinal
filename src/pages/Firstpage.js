import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Brands from './Brands'
import Feature1 from './Feature1'
import Feature2 from './Feature2'
import Feature3 from './Feature3'
import Feature4 from './Feature4'
import Feature5 from './Feature5'
import Footer from './Footer'
import MainInterface from './MainInterface'
import Faqs from './Faqs'
import ContactUs from './ContactUs'

function Firstpage() {
  return (
    <>
      <div>
        <Header />
        <Hero />
        <MainInterface />
        <Brands />
        {/* <div className='h-[4000px]'></div> */}
        <Feature1 />
        <Feature2 />
        <Feature3 />
        <Feature4 />
        <Feature5 />
        <Faqs />
        {/* <ContactUs /> */}
        <Footer />
      </div>
    </>
  )
}

export default Firstpage
