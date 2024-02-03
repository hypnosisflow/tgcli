import React from 'react';

export const ChatTypeSelect = ({
  id, setId, query, setQuery,
}) => (
  <>
    <p className="font-semibold">Select type of chat:</p>
    <div className=" rounded-md flex h-[32px] justify-between mt-2">
      <input
        type="button"
        value="channel"
        className={` mx-0 my-1 w-full h-full ${query === 'channel' ? 'opacity-1 font-semibold' : 'font-normal opacity-50'} bg-slate-100`}
        onClick={() => setQuery('channel')}
      />
      <input
        type="button"
        value="group"
        className={` mx-0 my-1 w-full h-full ${query === 'chat' ? 'opacity-1 font-semibold' : 'font-normal opacity-50'} bg-slate-100`}
        onClick={() => setQuery('chat')}
      />
    </div>
    <p className="text-sm mt-4 font-semibold">Enter chat id:</p>

    <input
      placeholder="hardcoded"
      type="text"
      value={id}
      className="border mt-2 h-[32px]  rounded-md w-full px-2"
      onChange={(e) => setId(e.target.value)}
    />
  </>
);
