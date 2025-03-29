import React from 'react'
import Hero from '../../Components/Student/Hero'
import Companies from '../../Components/Student/Companies'
import CoursesSection from '../../Components/Student/CoursesSection'
import TestimonialsSections from '../../Components/Student/TestimonialsSections'
import CallToAction from '../../Components/Student/CallToAction'
import Footer from '../../Components/Student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialsSections />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
