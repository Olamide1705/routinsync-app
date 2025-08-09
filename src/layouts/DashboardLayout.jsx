import React from 'react'
import SideBar from '../components/SideBar'

const DashboardLayout = ({children}) => {
  return (
    <div className='flex h-screen'>
        <SideBar />
         <main className="flex-1 overflow-y-auto p-4 bg-[rgb(185,231,231)] pt-10">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout