/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div className=' bg-white text-black'>
         <LeftSidebar/>
        <div className='  bg-white text-black'>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout