import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import CourseCard from './CourseCard';

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800 font-bold text-primary2'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Explore high-quality courses led by industry experts, designed to equip you with real-world skills <br /> and practical knowledge that accelerates your tech career.</p>


    <div className='grid grid-cols-auto px-4 md:px-0 md:py-16 my-10 gap-4'>
      {
        allCourses.slice(0,4).map((course, index) => <CourseCard key={index} course={course} />)
      }
    </div>

      <Link to='/course-list' onClick={()=>scrollTo(0,0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded hover:bg-primaryHover'>Show all courses</Link>
    </div>
  )
}

export default CoursesSection
