import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ setDashIsOpened, setDbIsOpened }) => (
  <nav className="text-left   border-b py-2 items-center  flex justify-between  w-full">
    <h1 className="text-sm font-bold uppercase ">Telegram Scrapper </h1>
    <ul className=" flex gap-x-4 uppercase">
      {/* <input type="button" value={'dashboard'} className='cursor-pointer' onClick={() => setDashIsOpened(prev => !prev)} />
                <input type="button" value={'database'} className=' cursor-pointer ml-2' onClick={() => setDbIsOpened(prev => !prev)} /> */}

      <Link className="text-black  text-sm" to="/">
        {' '}
        request
        {' '}
      </Link>
      <Link className="text-black  text-sm" to="/dashboard">
        {' '}
        dashboard
        {' '}
      </Link>
      <Link className="text-black  text-sm" to="/database">
        {' '}
        database
        {' '}
      </Link>
    </ul>
    {/* <p className='text-sm text-slate-200'>@hypnosisflow</p> */}
  </nav>
);
