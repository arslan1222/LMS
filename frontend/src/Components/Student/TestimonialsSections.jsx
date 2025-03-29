import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSections = () => {
  return (
    <div className='pb-14 px-8  md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testmonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi est pariatur officia eos possimus dignissimos enim sapiente labore nobis perferendis.</p>

      <div className='grid grid-cols-auto gap-8 mt-14'>
        {
          dummyTestimonial.map((testimonial, index)=>(
            <div className='text-sm text-left border border-gary-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] overflow-hidden shadow-black/5' key={index}>
              <div className='flex items-center gap-4 px-5 py-2 bg-gray-500/10'>
                <img className='h-12 w-12 rounded-full' src={testimonial.image} alt="" />
                <div >
                  <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                  <p className='text-gray-800/80'>{testimonial.role}</p>
                </div>
                
              </div>
              <div className='p-5 pb-7'>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, i)=> (
                      <img className='h-5' key={index} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="" />
                    ))}
                  </div>
                  <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
                </div>
                <a href="#" className='text-blue-500 underline px-5'>Read more</a>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TestimonialsSections
