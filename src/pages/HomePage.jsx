import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <>
    <div className='md:hidden flex items-center justify-center h-screen overflow-hidden'>
  <div className='relative bg-[rgb(0,128,128)] border-4 border-black rounded-[30px] flex flex-col items-center justify-center md:max-w-xl h-full w-full max-w-[700px] mx-auto overflow-hidden'>
  <span className='absolute top-0 right-0 w-[320px] h-[400px] bg-black rounded-full translate-x-1/2 -translate-y-1/2 z-10'></span>
  <span className='absolute bottom-0 left-0 w-[180px] h-[150px] bg-[rgb(160,229,229)] rounded-full -translate-x-1/2 translate-y-1/2 z-10'></span>
  <span className='absolute bottom-0 right-0 w-[250px] h-[250px] bg-[rgb(255,208,102)] rounded-full translate-x-1/2 translate-y-1/2 z-10'></span>

    <h1 className='font-bold font-Roboto text-[50px] pr-5 pl-1 md:px-5 mr-auto'>Routinsync</h1>
   <Link to="/login" 
      className='tracking-wider cursor-pointer font-Roboto text-[30px] pr-2 md:px-5 ml-auto md:ml-0 text-[rgb(160,229,229)] font-semibold hover:underline underline-offset-4 transition transform hover:-translate-y-1 duration-200 active:underline active:-translate-y-1'
        >
      GET STARTED
    </Link>
    </div>
  </div>

{/*Desktop View */}
<div className='relative min-h-screen w-full overflow-hidden'>
  <div className='hidden md:flex items-center justify-center bg-[rgb(0,128,128)] min-h-screen w-full p-5'>
  <span className='absolute top-0 right-0 w-[400px] h-[500px] bg-black rounded-full translate-x-1/2 -translate-y-1/2 z-10'></span>
  <span className='absolute bottom-0 left-0 w-[250px] h-[250px] bg-[rgb(160,229,229)] rounded-full -translate-x-1/2 translate-y-1/2 z-10'></span>
  <span className='absolute bottom-0 right-0 w-[300px] h-[320px] bg-[rgb(255,208,102)] rounded-full translate-x-1/2 translate-y-1/2 z-10'></span>

    <h1 className='font-bold font-Road text-[80px] pb-[80px]'>Routinsync</h1>
   <Link to="/login" 
      className='tracking-wider cursor-pointer font-Roboto text-4xl text-[rgb(160,229,229)] font-semibold hover:underline underline-offset-4 transition transform hover:-translate-y-1 duration-200 active:underline active:-translate-y-1'
        >
      GET STARTED
    </Link>
    </div>
    </div>
    </>

  
  )
}

export default HomePage