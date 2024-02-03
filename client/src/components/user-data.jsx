import { useContext, useEffect, useState } from 'react';

import { DataContext } from '../Context';
import { ChatUserCard } from '../ui/chat-user-card';
import { MockData } from '../ui/mock-data';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/buttons/Button';
import { FilterButton } from '../ui/buttons/FilterButton';

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
        case 'initial':
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
      <section className="w-full h-auto flex flex-col items-center justify-center">
        <Spinner />
      </section>
    );
  }

  const Filter = () => {

    return (

      <div className="mb-2  text-sm h-[32px] w-[320px] flex">
        <FilterButton cb={() => doFilter('initial', data)} filter={filter} value="initial" />
        <FilterButton cb={() => doFilter('top-10', data)} filter={filter} value="top-10" />
        <FilterButton cb={() => doFilter('top-25', data)} filter={filter} value="top-25" />
      </div>

    )
  }

  return (
    <div className="flex flex-col  mt-4 justify-start ml-10 items-center w-full ">
      <div className="flex gap-1 mx-auto  items-center ">
        <span className="uppercase text-sm   font-semibold">{type} posters: {data?.length}</span>
        <span className=" opacity-50 ">{chatId}</span>
        <span className=" opacity-50 ">{period}</span>
      </div>
      <Filter />

      {active && (
        <ul className=" text-sm   justify-center  w-full gap-2 max-h-[640px]  overflow-y-scroll">
          {active.map((i, index) => <ChatUserCard i={i} key={index} />)}
        </ul>
      )}
      <Button
        cb={() => doSave({ chatId, active, period, date: new Date().toLocaleString() })}
        value={saved ? 'saved' : 'save to dashboard'}
        theme='black'
      />

    </div>
  );
};
