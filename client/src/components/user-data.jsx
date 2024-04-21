import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { DataContext } from '../Context';
import { Button } from '../ui/buttons/Button';
import { getUserFullInfo } from '../utils/api';
import RequestCardPreview from '../ui/request-card-priew';
import LengthFilters from '../ui/filters/length-filters';
import Graph from './graph';

function UsersData() {
  const { chatData, handleUpdataChat } = useContext(DataContext);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState('initial');
  const [active, setActive] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [uploadingExtraUsersData, setUploadingExtraUsersData] = useState('none')
  const [grapOpened, setGrapOpened] = useState(false)

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
  }

  useEffect(() => {
    if (searchId) {
      const findItems = chatData.data.filter((item) => {
        const subStr = item.user_id.slice(0, searchId.length);
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

  const handleUserFullInfo = async (arr, id) => {
    setUploadingExtraUsersData('loading')
    const data = await getUserFullInfo(arr, id);
    if (data.length > 0) {
      setUploadingExtraUsersData('success')
      handleUpdataChat(data);
    }
  };

  const totalMessages = chatData.data?.reduce((acc, item) => acc + item.msgs.length, 0);

  const messagesCountByDay = () => {
    const map = new Map();

    const allMessagesSorted = chatData.data?.map((item) => item.msgs).flat().sort(i => new Date(i.date))

    for (let i = 0; i < allMessagesSorted.length; i++) {
      const day = new Date(allMessagesSorted[i]?.date * 10000).getDate()
      if (day < new Date(allMessagesSorted[i + 1]?.date * 10000).getDate()) {
        map.set(day, map.get(day) + 1 || 1);
      } else {
        map.set(day, map.get(day) + 1 || 1);
      }
    }
    return map;
  }

  console.log('COUNT ', messagesCountByDay());

  return (
    <div className="flex flex-col justify-start w-full mt-">
      <div className="flex gap-4 w-full items-center justify-center  md:mb-0   ">
        <span className=" text-sm  font-semibold">
          Posters: {chatData.data?.length}
        </span>
        <span className=" text-sm  font-semibold">
          Messages: {totalMessages}
        </span>
        <span className="text-sm opacity-50 ">{chatData.id}</span>
        <span className="text-sm opacity-50 ">{chatData.period}</span>
      </div>

      <div className='w-full flex flex-col md:flex-row items-center mt-4 justify-between'>
        <div className='max-w-[320px] w-full flex  flex-col '>
          <LengthFilters filter={filter} doFilter={doFilter} chatData={chatData} />

          <div className='w-full gap-2 flex text-sm items-center justify-between'>
            <p className='w-fit text-gray-500 font-semibold text-xs'>Find by ID:</p>
            <input type="text" value={searchId || ''} onChange={handleSearchId} className='w-auto flex-1 h-[32px] border rounded-md' />
          </div>
        </div>

        <div className="max-w-[160px] w-full flex flex-col gap-2 mt-4 md:mt-0 justify-between">
          <Button
            cb={() => setGrapOpened((prev) => !prev)}
            value={` ${grapOpened ? 'Close' : 'Charts'} `}
            theme="black"

          />
        </div>

        <div className="max-w-[320px] w-full flex flex-col gap-2 mt-4 md:mt-0 justify-between ">
          <div className='flex gap-6 justify-between items-center'>
            {uploadingExtraUsersData === 'none' && <span className='text-xs font-bold w-full leading-4 '>Find extra information</span>}
            {uploadingExtraUsersData === 'loading' && <span className='text-xs font-bold w-full '>Please wait...</span>}
            {uploadingExtraUsersData === 'success' && <span className='text-xs font-bold w-full '>Information uploaded!</span>}
            <Button
              cb={() => handleUserFullInfo(active, chatData.id)}
              value="Try"
              theme="black"

            />
          </div>

          <div className="flex gap-2">
            <Button value="Clear" theme="smoke" />
            <Button
              cb={() => alert('You dont have access! hypnosisflow@gmail.com')}
              value={saved ? 'Saved' : '-> Database'}
              theme="black"
            />
          </div>
        </div>
      </div>

      {active?.length > 0 && !grapOpened && (
        <ul className=" mt-2 w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-y-4 max-h-[740px]  pr-2 overflow-y-scroll">
          {active.map((i, index) => (
            <RequestCardPreview item={i} index={index} key={i.userId} />
          ))}
        </ul>
      )}

      {grapOpened && (<Graph />)}

    </div>
  );
}

export default UsersData;
