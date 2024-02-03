import React from 'react';

export const ChatList = ({ chat }) => (
  <div className="w-full flex items-start text-sm">
    <div className="flex flex-col items-center w-full mt-4">
      <p className="text-xl">chat posters </p>
      <p className="text-xs">(25 posts limit)</p>
      <p>* * *</p>
      {chat?.chatData?.map((i) => (
        <div
          className="flex gap-[10px] border h-[48px] w-[320px] p-1 mb-2 rounded-md"
          key={i[0]}
        >
          <p>
            <strong>userId:</strong>
            {' '}
            {i[0]}
          </p>
          <p>
            <strong>posts:</strong>
            {' '}
            {i[1]}
          </p>
        </div>
      ))}
    </div>
    <div className="flex flex-col max-w-1/2 w-full">
      <p className="mt-4 text-xl">content</p>
      <p>* * *</p>
      {chat?.info?.map((i) => (
        <div
          className="flex text-left w-full mb-2 border  p-1 rounded-md"
          key={i[0]}
        >
          <p className=" min-w-[160px]">
            <strong>userId:</strong>
            {' '}
            {i.userId}
          </p>
          <p className="w-full">
            <strong>msg:</strong>
            {' '}
            {i.msg}
          </p>
        </div>
      ))}
    </div>
  </div>
);
