import React from 'react';

export const ChannelList = ({ channel }) => (
  <div className="w-full flex flex-col items-center">
    <p className="text-xl">channel repliers</p>

    <p>* * *</p>

    <div className="flex flex-col w-1/2">
      {channel.map((i) => (
        <div
          key={i.postId}
          className="mb-4 text-sm border rounded-md p-1 flex flex-col items-start"
        >
          <p>
            <strong>postId:</strong>
            {' '}
            {i.postId}
          </p>
          {i.repliesInfo.map((item, index) => (
            <div
              key={index}
              className=" flex w-full text-left gap-1 mb-2 justify-start "
            >
              <p className="min-w-[175px] ">
                <strong>userId:</strong>
                {' '}
                {item.userId}
              </p>
              <p>
                <strong>msg:</strong>
                {' '}
                {item.msg}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
