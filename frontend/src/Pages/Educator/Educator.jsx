import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Educator/Navbar'
import Sidebar from '../../Components/Educator/Sidebar'
import Footer from '../../Components/Educator/Footer'

const Educator = () => {
  return (
    <div className="text-default min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 60px)" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Educator
