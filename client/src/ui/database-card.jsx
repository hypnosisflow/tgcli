import React from 'react';

export const DatabaseCard = ({ i }) => {
  const {
    id, user_id, firstname, lastname, username, phone, report_date, chat_id, period_filter, content, events, photo
  } = i;

  console.log(photo)
  return (
    <li className="w-[400px] py-4 px-2 text-xs border border-black/5 rounded-md shadow ">
      <p className='font-bold text-xs text-gray-500 '>User Information</p>
      <div className='flex justify-between mt-2 text-left'>
        <div className='flex flex-col w-full font-bold'>
          <p>Database ID: <span className='font-normal'>{id}</span></p>
          <p>Telegram ID: <span className='font-normal'>{user_id}</span></p>
          <p>Username: <span className='font-normal'>{username}</span></p>
          <p>Events: <span className='font-normal'>{events ?? '- - -'}</span></p>
        </div>

        <div className='flex flex-col w-full font-bold'>
          <p>Firstname: <span className='font-normal'>{firstname}</span></p>
          <p>Lastname:  <span className='font-normal'>{lastname}</span></p>
          <p>Phone: <span className='font-normal'>{phone ?? '- - -'}</span></p>
        </div>
      </div>

      {/* report */}
      <p className='font-bold text-xs text-gray-500 '>Last report</p>
      <div className='mt-2 flex justify-between font-bold  text-left'>
        <div className='flex flex-col w-full'>
          <p>Date: <span className='font-normal'>{report_date}</span></p>
          <p>Period: <span className='font-normal'>{period_filter}</span></p>
        </div>

        <div className='flex flex-col w-full'>
          <p>Chat ID: <span className='font-normal'>{chat_id}</span></p>
          <p>Messages: <span className='font-normal'>{content.length}</span></p>
        </div>
      </div>
    </li>
  );
};
