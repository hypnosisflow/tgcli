import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [opened, setOpened] = useState(false)
  const [mobile, setMobile] = useState(false)

  const handleMenuClick = () => {
    setOpened(prev => !prev)
  }

  useEffect(() => {
    const handleWindowWidth = () => {
      if (window.innerWidth < 768) {
        setMobile(true)
      } else {
        setMobile(false)
      }
    }

    return () => handleWindowWidth()
  }, [mobile])

  console.log(mobile)

  const styles = {
    mobile: 'flex flex-col absolute right-0 top-11 shadow-sm w-1/2 md:w-1/4 bg-white',

  }

  return (
    <nav className="text-left py-2 px-2 md:px-0 items-center text-black relative  flex justify-between  w-full">
      <h1 className="text-lg font-bold  text-blue-900">Telegram Scraper </h1>
      <div className='flex gap-4 items-center'>
        <span className='text-xs text-gray-500'>Navigation</span>
        <input type='button' onClick={handleMenuClick} value='-_-' className='font-extrabold shadow-sm w-[32px] h-[32px] bg-white rounded-md  ' />
      </div>
      <ul className={`${opened ? 'flex' : 'hidden'} ${styles.mobile}   bg-white py-4 z-50 px-2 items-end gap-y-2  gap-x-4 text-black text-sm`}  >
        <NavLink
          className={({ isActive }) => (isActive ? 'font-bold text-black' : 'text-black font-normal')}
          to="/"
        >
          Request
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'font-bold text-black ' : 'text-black font-normal')}
          to="/database"
        >
          Database
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'font-bold text-black mt-8' : 'text-black font-normal mt-8')}
          to="/login"
        >
          Login
        </NavLink>
      </ul>



    </nav >
  );
}

export default Navbar;
