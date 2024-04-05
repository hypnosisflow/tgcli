import { useContext, useEffect, useState } from 'react';

import { DataContext } from '../Context';
import { ChatUserCard } from '../ui/chat-user-card';
import { MockData } from '../ui/mock-data';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/buttons/Button';
import { FilterButton } from '../ui/buttons/FilterButton';
import { Pagination } from '../ui/pagination';

import { getUserFullInfo } from '../utils/api';

import axios from 'axios'

export const UsersData = ({ loading }) => {
  const { handleChatData, handleChannelData, chatData, handleUpdataChat } = useContext(DataContext);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState('initial');
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(chatData.data);
  }, [chatData.data]);


  const doFilter = (arg, arr) => {
    setFilter(arg);
    const data = () => {
      switch (arg) {
        case 'top-25':
          return arr.slice(0, 24);
        case 'top-10':
          return arr.slice(0, 10);
        case 'initial':
          return arr;
      }
    }

    setActive(data());
  };
  const send = async (data) => {
    try {
      const res = await axios.post('http://localhost:5050/dashboard', data);
      if (res.status === 200) {
        alert('data sent to elephant sql');
      } else {
        alert('data not sent (error)');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  if (loading) {
    return (
      <section className="w-full h-auto flex flex-col items-center justify-center">
        <Spinner />
      </section>
    );
  }

  const handleUserFullInfo = async (arr) => {
    const data = await getUserFullInfo(arr);
    handleUpdataChat(data);
  }

  const Filter = () => {
    return (
      <div className='flex justify-between mb-3'>
        <div className="text-sm w-[320px] flex">
          <FilterButton cb={() => doFilter('initial', chatData.data)} filter={filter} text="Initial" value='initial' />
          <FilterButton cb={() => doFilter('top-10', chatData.data)} filter={filter} text="Top 10" value='top-10' />
          <FilterButton cb={() => doFilter('top-25', chatData.data)} filter={filter} text="Top 25" value='top-25' />
        </div>

        <div className='max-w-[320px] w-full flex flex-col  gap-2'>
          <Button cb={() => handleUserFullInfo(chatData.data)} value='Find extra info' theme={'black'} />
          <div className='flex gap-2'>


            <Button
              value='Clear'
              theme='smoke'
            />
            <Button
              cb={() => send(chatData)}
              value={saved ? 'Saved' : 'Save to dashboard'}
              theme='black'
            />
          </div>
        </div>


      </div>
    )
  }

  return (
    <div className="flex flex-col justify-start w-full mt-2">
      <div className="flex gap-4 mx-auto w-full   ">
        <span className=" text-sm  font-semibold">Posters: {chatData.data?.length}</span>
        <span className="text-sm opacity-50 ">{chatData.id}</span>
        <span className="text-sm opacity-50 ">{chatData.period}</span>
      </div>
      <Filter />

      {active && (
        <ul className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-4 max-h-[740px]  pr-2 overflow-y-scroll">
          {active.map((i, index) => <ChatUserCard i={i} key={index} />)}
        </ul>
      )}

      {/* <Pagination
        items={active}
        pageLimit={active?.length}
        setPageItems={setActive}
      /> */}






    </div>
  );
};
