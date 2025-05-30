import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../Components/Student/Footer';

const MyEnrollments = () => {

  const {enrolledCourses, calculateCourseDuration, navigate} = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([

    {lectureCompleted: 2, totalLectures: 4},
    {lectureCompleted: 2, totalLectures: 2},
    {lectureCompleted: 5, totalLectures: 6},
    {lectureCompleted: 3, totalLectures: 4},
    {lectureCompleted: 2, totalLectures: 8},
    {lectureCompleted: 4, totalLectures: 5},
    {lectureCompleted: 1, totalLectures: 5},
    {lectureCompleted: 5, totalLectures: 7},
    {lectureCompleted: 3, totalLectures: 9},
    {lectureCompleted: 2, totalLectures: 4},
    {lectureCompleted: 2, totalLectures: 3}

  ]);

  return (
    <>
    <div className='md:px-36 px-5 pt-10 mb-20'>
      <h1 className='text-2xl font-semibold text-primary2'>My Enrollements</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr >
            <th className='px-4 py-3 font-semibold truncate text-primary2'>Course</th>
            <th className='px-4 py-3 font-semibold truncate text-primary2'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate text-primary2'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate text-primary2'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {enrolledCourses.map((course, index)=>(
            <tr className='border-b border-gray-500/20' key={index}>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img className='w-14 sm:24 md:w-28' src={course.courseThumbnail} alt="" />
                <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} className='bg-gray-300 rounded-full' />
                </div>
              </td>
              <td className='px-4 py-3 mas-sm:hidden'>
                <p>{calculateCourseDuration(course)}</p>
              </td>
              <td className='px-4 py-3 mas-sm:hidden'>
                {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`} <span>Lectures</span>
              </td>
              <td className='px-4 py-3 mas-sm:text-right'>
                <button onClick={()=>navigate('/player/' + course._id)} className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white'>{progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'On going'}</button>
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  )
}

export default MyEnrollments
