import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProfileEditForm from './components/ProfileEditForm';
import Routines from './pages/Routines'

function App() {
 
  return (
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/signup' element={<SignupForm/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
         <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEditForm />} />
    <Route path="/routines" element={<Routines />} />
    </Routes>
  )
}

export default App
