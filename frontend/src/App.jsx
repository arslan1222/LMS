import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Student/Home'
import CoursesList from './Pages/Student/CoursesList'
import CourseDetails from './Pages/Student/CourseDetails'
import MyEnrollments from './Pages/Student/MyEnrollments'
import Player from './Pages/Student/Player'
import Loading from './Components/Student/Loading'
import Educator from './Pages/Educator/Educator'
import DashBoard from './Pages/Educator/DashBoard'
import AddCourse from './Pages/Educator/AddCourse'
import MyCourses from './Pages/Educator/MyCourses'
import StudentsEnrolled from './Pages/Educator/StudentsEnrolled'
import { assets } from './assets/assets'
import Navbar from './Components/Educator/Navbar'

const App = () => {

  const isEducatorRoute = useMatch('/educator') // When the path match the educator will be true

  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar /> }
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/Loading/:path' element={<Loading />} />

        <Route path='/educator' element={<Educator />} >
          <Route path='educator' element={<DashBoard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>

      </Routes>

    </div>
  )
}

export default App
