
import React, { useEffect, useState } from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialBox = () => {
  const [index, setIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate-grow');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass(''); // Reset animation class
      setIndex((prev) => (prev + 1) % dummyTestimonial.length);
    }, 30000);

    const resetAnimationTimeout = setTimeout(() => {
      setAnimationClass('animate-grow'); 
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(resetAnimationTimeout);
    };
  }, []);

  const { name, role, image, feedback, rating } = dummyTestimonial[index];

  return (

    <>
    <h2 className='text-3xl font-medium text-primary2 '>Testmonials</h2>
    <div className="bg-primary text-white rounded-xl max-w-3xl px-10 py-12 m-4 relative">

      <div className={`bg-white h-1 w-full origin-left ${animationClass}`}></div>

      <div className="hidden md:block text-white/30 text-2xl absolute top-16 left-10">
        <i className="fas fa-quote-left"></i>
      </div>
      <div className="hidden md:block text-white/30 text-2xl absolute top-16 right-10">
        <i className="fas fa-quote-right"></i>
      </div>

      <p className="text-base md:text-lg mt-8 leading-relaxed text-justify">{feedback}</p>

      <div className="flex justify-center items-center mt-8">
        <img
          className="w-[75px] h-[75px] rounded-full object-cover"
          src={image}
          alt={name}
        />
        <div className="ml-4 text-left">
          <h4 className="text-lg font-semibold m-0">{name}</h4>
          <p className="mt-1 text-sm font-normal">{role}</p>
          <div className="flex gap-1 mt-5">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            className="h-5"
            src={i < Math.floor(rating) ? assets.star : assets.star_blank}
            alt="star"
          />
        ))}
      </div>
        </div>
      
      </div>
    </div>
    </>
    
  );
};

export default TestimonialBox;

