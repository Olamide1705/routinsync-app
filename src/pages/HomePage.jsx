import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
<>
<div className="md:hidden flex items-center justify-center min-h-screen overflow-hidden bg-[rgb(0,128,128)] relative">
  {/* Background circles */}
  <span className="absolute top-0 right-0 w-[320px] h-[400px] bg-black rounded-full translate-x-1/2 -translate-y-1/2 z-0"></span>
  <span className="absolute bottom-0 left-0 w-[180px] h-[150px] bg-[rgb(160,229,229)] rounded-full -translate-x-1/2 translate-y-1/2 z-0"></span>
  <span className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[rgb(255,208,102)] rounded-full translate-x-1/2 translate-y-1/2 z-0"></span>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center px-2">
    <h1 className="font-bold font-Roboto text-[50px] text-white ml-auto pr-10">
      Routinsync
    </h1>
    <Link
      to="/login"
      className="tracking-wider cursor-pointer ml-auto font-Roboto text-[30px] text-[rgb(160,229,229)] font-semibold hover:underline underline-offset-4 transition-transform duration-200 hover:-translate-y-1"
    >
      GET STARTED
    </Link>
  </div>
</div>
<div className="flex items-center justify-center min-h-screen overflow-hidden bg-[rgb(0,128,128)] relative">
  {/* Background circles */}
  <span className="absolute top-0 right-0 w-[320px] h-[400px] bg-black rounded-full translate-x-1/2 -translate-y-1/2 z-0"></span>
  <span className="absolute bottom-0 left-0 w-[180px] h-[150px] bg-[rgb(160,229,229)] rounded-full -translate-x-1/2 translate-y-1/2 z-0"></span>
  <span className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[rgb(255,208,102)] rounded-full translate-x-1/2 translate-y-1/2 z-0"></span>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6">
    <h1 className="font-bold font-Roboto text-4xl md:text-6xl lg:text-7xl text-white">
      Routinsync
    </h1>
    <Link
      to="/login"
      className="tracking-wider cursor-pointer font-Roboto text-2xl md:text-3xl lg:text-4xl text-[rgb(160,229,229)] font-semibold hover:underline underline-offset-4 transition-transform duration-200 hover:-translate-y-1"
    >
      GET STARTED
    </Link>
  </div>
</div>
</>

  )
}

export default HomePage