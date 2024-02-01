import { useContext, useEffect, useState } from 'react';

import { DataContext } from '../Context';
import { ChatUserCard } from '../ui/chat-user-card';
import { MockData } from '../ui/mock-data';
import { Spinner } from '../ui/spinner';

export const UsersData = ({
  data, title, chatId, loading,
}) => {
  const { handleChatData, handleChannelData } = useContext(DataContext);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState('init');
  const [active, setActive] = useState(null);
  const { type, period } = title;

  console.log(chatId);

  useEffect(() => {
    setActive(data);
  }, [data]);

  const doSave = (arg) => {
    setSaved(true);
    switch (type) {
      case 'channel':
        return handleChannelData(arg);
      case 'chat':
        return handleChatData(arg);
      default:
    }
  };

  const doFilter = (arg, arr) => {
    const res = () => {
      switch (arg) {
        case 'top-25':
          return arr.slice(0, 24);
        case 'top-10':
          return arr.slice(0, 10);
        case 'init':
          return arr;
        default:
      }
    };
    const newArr = res();

    setActive(newArr);
    setFilter(arg);
  };

  if (loading) {
    return (
      <section className="grid   grid-rows-3">
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
      </section>
    );
  }

  return (
    <div className="flex flex-col mt-4 justify-start items-center w-full ">
      <div className="flex mb-4 justify-between  w-full ">
        <div className="flex gap-1 items-center">
          <span className="">
            {type}
            {' '}
            posters
          </span>
          <span className="">
            (
            {data?.length}
            )
          </span>
          <span className=" opacity-50 ">{chatId}</span>
          <span className=" opacity-50 ">{period}</span>
        </div>
        <button
          disabled={saved}
          className="text-white text-sm h-[32px] "
          onClick={() => doSave({
            chatId,
            active,
            period,
            date: new Date().toLocaleString(),
          })}
        >
          {saved ? <p> saved </p> : <p>save to dashboard</p>}
        </button>
      </div>

      <div className="mb-2 text-sm h-[32px] w-[320px] flex">
        <input
          type="button"
          className={` cursor-pointer  w-full ${filter === 'init' ? 'opacity-1 font-semibold' : 'opacity-50'} h-[32px] bg-slate-100`}
          value="initial"
          onClick={() => doFilter('init', data)}
        />
        <input
          type="button"
          className={` cursor-pointer  w-full ${filter === 'top-10' ? 'opacity-1 font-semibold' : 'opacity-50'} h-[32px] bg-slate-100`}
          value="top-10"
          onClick={() => doFilter('top-10', data)}
        />
        <input
          type="button"
          className={` cursor-pointer  w-full ${filter === 'top-25' ? 'opacity-1 font-semibold' : 'opacity-50'} bg-slate-100`}
          value="top-25"
          onClick={() => doFilter('top-25', data)}
        />
      </div>

      {active && (
        <ul className="  text-sm   justify-center  w-full gap-2 max-h-[640px]  overflow-y-scroll">
          {active.map((i, index) => <ChatUserCard i={i} key={index} />)}
        </ul>
      )}
    </div>
  );
};
