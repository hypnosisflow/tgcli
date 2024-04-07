import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { DataContext } from '../Context';
import { Button } from '../ui/buttons/Button';
import Loader from '../ui/loader';
import { getUserFullInfo } from '../utils/api';
import RequestCardPreview from '../ui/request-card-priew';
import LengthFilters from '../ui/filters/length-filters';

function UsersData({ loading }) {
  const { chatData, handleUpdataChat } = useContext(DataContext);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState('initial');
  const [active, setActive] = useState(null);
  const [searchId, setSearchId] = useState('');

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
  }

  useEffect(() => {
    if (searchId) {
      const findItems = chatData.data.filter((item) => {
        const subStr = item.user_d.slice(0, searchId.length);
        if (subStr === String(searchId)) return item;
      });

      setActive(findItems);
    } else {
      setActive(chatData.data)
    }

  }, [searchId, chatData.data])


  // debugger

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

        default:
          console.log('Filter error');
      }
    };

    setActive(data());
  };
  const handleSaveIntoDB = async (data) => {
    try {
      const res = await axios.post(
        'https://tgserver.vercel.app/dashboard',
        data,
      );
      if (res.status === 200) {
        alert('data sent to elephant sql');
      } else {
        alert('data not sent (error)');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleUserFullInfo = async (arr) => {
    const data = await getUserFullInfo(arr);
    handleUpdataChat(data);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col justify-start w-full mt-2">
      <div className="flex gap-4 mx-auto w-full   ">
        <span className=" text-sm  font-semibold">
          Posters: {chatData.data?.length}
        </span>
        <span className="text-sm opacity-50 ">{chatData.id}</span>
        <span className="text-sm opacity-50 ">{chatData.period}</span>
      </div>

      <div className='w-full flex justify-between'>
        <div>
          <LengthFilters filter={filter} doFilter={doFilter} chatData={chatData} />

          <div className='w-full gap-2 flex text-sm items-center justify-between'>
            <p className='w-fit font-semibold'>Search ID:</p>
            <input type="text" value={searchId || ''} onChange={handleSearchId} className='w-auto flex-1 h-[32px] border rounded-md' />
          </div>
        </div>

        <div className="max-w-[320px] w-full flex flex-col justify-between ">
          <Button
            cb={() => handleUserFullInfo(active)}
            value="Find extra info"
            theme="black"
          />
          <div className="flex gap-2">
            <Button value="Clear" theme="smoke" />
            <Button
              cb={() => handleSaveIntoDB(chatData)}
              value={saved ? 'Saved' : '-> Database'}
              theme="black"
            />
          </div>
        </div>
      </div>

      {active?.length > 0 && (
        <ul className=" mt-2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-4 max-h-[740px]  pr-2 overflow-y-scroll">
          {active.map((i, index) => (
            <RequestCardPreview item={i} index={index} key={i.userId} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersData;
