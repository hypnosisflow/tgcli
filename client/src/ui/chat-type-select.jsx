import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function ChatTypeSelect({


  id, setId, query, setQuery,
}) {

  const location = useLocation()
  return (
    <div className="w-full text-sm">
      <p className="font-semibold">Type chat ID:</p>
      {/* <div className=" rounded-md flex h-[32px] justify-between mt-2">
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
    </div> */}
      <span className="text-gray-500 text-xs">
        You need to provide
        <span className="font-semibold text-gray-800"> GROUP</span>
        {' '}
        chat ID.
        <br />
        Chat should be
        <span className="font-semibold text-gray-800"> public</span>
        .
      </span>



      <input
        placeholder="Hardcoded"
        type="text"
        value={id}
        className="border mt-2 h-[32px] rounded-md w-full px-2"
        onChange={(e) => setId(e.target.value)}
      />

      <Link to={`/help`} state={{ background: location }}>
        <p className="text-xs text-gray-500 mt-2">
          How to?
        </p>
      </Link>
    </div>
  );
}
