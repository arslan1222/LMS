import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-800'>Trustd By Learners from</p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
        <img className='w-20 md:w-28' src={assets.microsoft_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.walmart_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.microsoft_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.adobe_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.paypal_logo} alt="" />

      </div>
    </div>
  )
}

export default Companies
