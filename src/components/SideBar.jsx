import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaTasks, FaUser, FaSignOutAlt, FaTimes } from 'react-icons/fa'

const SideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button (hamburger) */}
<button
  onClick={() => setSideBarOpen(true)}
  className="fixed top-4 left-2 z-50 md:hidden w-10 h-9 flex items-center justify-center bg-white text-black rounded-xl shadow-lg border border-gray-200"
>
  ☰
</button>


      {/* Mobile Overlay */}
      {sideBarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          h-screen w-64 bg-[rgb(0,128,128)] text-white z-50
          fixed md:static top-0 left-0
          transform transition-transform duration-300 ease-in-out
          ${sideBarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button (✕) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setSideBarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="font-bold text-2xl p-6 border-b border-white">
          Routinsync
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <Link
            to="/dashboard"
            onClick={() => setSideBarOpen(false)}
            className="flex items-center gap-3 font-semibold hover:bg-[rgb(255,208,102)] p-2 rounded"
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            to="/routines"
            onClick={() => setSideBarOpen(false)}
            className="flex items-center gap-3 font-semibold hover:bg-[rgb(255,208,102)] p-2 rounded"
          >
            <FaTasks /> My Routines
          </Link>
          <Link
            to="/profile"
            onClick={() => setSideBarOpen(false)}
            className="flex items-center gap-3 font-semibold hover:bg-[rgb(255,208,102)] p-2 rounded"
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/logout"
            onClick={() => setSideBarOpen(false)}
            className="flex items-center gap-3 font-semibold hover:bg-[rgb(255,208,102)] p-2 rounded"
          >
     
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>
    </>
  )
}

export default SideBar
