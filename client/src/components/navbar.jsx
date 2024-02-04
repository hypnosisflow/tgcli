import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ setDashIsOpened, setDbIsOpened }) => (
  <nav className="text-left px-2 py-2 items-center text-black  flex justify-between  w-full">
    <h1 className="text-sm font-bold uppercase ">Telegram Scrapper </h1>
    <ul className=" flex gap-x-4 text-black">

      <NavLink className={({ isActive, }) =>
        isActive ? "font-bold text-black" : "text-black font-normal"}
        to="/">
        Request
      </NavLink>
      <NavLink className={({ isActive, }) =>
        isActive ? "font-bold text-black" : "text-black font-normal"} to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink className={({ isActive, }) =>
        isActive ? "font-bold text-black" : "text-black font-normal"} to="/database">
        Database
      </NavLink>
    </ul>
  </nav>
);
