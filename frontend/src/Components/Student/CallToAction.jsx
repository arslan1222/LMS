import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-primary2 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p>Gain access to expert-led courses, flexible learning schedules, and practical projects <br /> — all designed to help you grow in your tech career from anywhere in the world.</p>
      <div className='flex items-center fonto-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-primary '>Get started</button>
        <button className='flex items-center gap-2 text-primary2'>Learn more <img src={assets.arrow_icon} alt="" /></button>
      </div>

    </div>
  )
}

export default CallToAction
