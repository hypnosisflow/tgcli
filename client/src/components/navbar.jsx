import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export function Navbar({ setDashIsOpened, setDbIsOpened }) {
  return (
    <nav className="text-left py-2 items-center text-black  flex justify-between  w-full">
      <ul className=" flex gap-x-4 text-black text-sm w-[320px]">
        <NavLink
          className={({ isActive }) => (isActive ? 'font-bold text-black' : 'text-black font-normal')}
          to="/"
        >
          Request
        </NavLink>
        {/* <NavLink
          className={({ isActive }) => (isActive ? 'font-bold text-black' : 'text-black font-normal')}
          to="/dashboard"
        >
          Dashboard
        </NavLink> */}
        <NavLink
          className={({ isActive }) => (isActive ? 'font-bold text-black' : 'text-black font-normal')}
          to="/database"
        >
          Database
        </NavLink>
      </ul>
      <h1 className="text-sm font-bold uppercase ">Telegram Scrapper </h1>

    </nav>
  );
}
