import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full'>
      <div className='flex flex-col md:flex-row items-star px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start itmes-center w-full'>
          <img className='w-20 lg:w-32 cursor-pointer' src={assets.logo_dark} alt="" />
          <p className='mt-6 text--center md:text-left text-sm text-white/80'>Edemy is your trusted learning companion, offering industry-relevant courses designed to boost your career with practical, real-world knowledge — anytime, anywhere.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-demibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='font-sm text-white/80'>Stay ahead in tech with exclusive tips, latest updates, and career resources — delivered straight to your inbox every week.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input className='border border-gray-800 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' type="email" placeholder='Enter your email' />
            <button className='bg-primary2 w-24 h-9 text-white rounded'>Subscribe</button>
          </div>
        </div>
      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright  2025 &copy; Edemy. All rights reserved.</p>
    </footer>
  )
}

export default Footer
