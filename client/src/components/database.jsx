import axios from 'axios';
import React, { useContext } from 'react';
import { CSVLink } from 'react-csv';

import { CardPreview } from '../ui/card-preview';

import { DataContext } from '../Context';
import { Button } from '../ui/buttons/Button';

function Database() {
  const { database, handleDatabase } = useContext(DataContext);
  const fetchDB = async () => {
    try {
      const req = await axios.get('https://tgserver.vercel.app/database');

      if (req.status === 200) {
        handleDatabase(req.data.data.rows);
      } else {
        throw new Error('database request error');
      }
    } catch (error) {
      console.log('fetchDB error', error);
    }
  };

  const csv = [
    { label: 'USER ID', key: 'user_id' },
    { label: 'CHAT TYPE', key: 'chat_type' },
    { label: 'CHAT ID', key: 'chat_id' },
    { label: 'POSTS', key: 'posts' },
  ];

  const generate = (arr) => arr?.map((i) => {
    const {
      user_id, chat_type, chat_id, content,
    } = i;
    return {
      user_id,
      chat_type,
      chat_id,
      posts: content.length,
    };
  });

  const data = generate(database);



  return (
    <div className="h-[800px] w-full  rounded-2xl py-2 relative">
      <div className=' flex'>
        <div className='flex w-[320px] flex-col'>
          <p className="text-black text-sm font-semibold ">
            Database
          </p>
          <p className='text-xs font-normal mb-4 text-slate-500'>
            Infromation fetched from elephant sql.
          </p>
        </div>
        <Button cb={fetchDB} value="Get Database" theme="black" className="max-w-[160px]" />

      </div>

      <div className='flex gap-2 flex-col md:flex-row'>
        <div className='flex items-center py-8 h-fit justify-center min-w-[160px] mt-2 flex-col rounded-md bg-white shadow-sm'>
          <h3 className='text-sm font-semibold text-left'>Filters</h3>
        </div>

        <ul className=" mt-2 mb-4 text-sm  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2  mx-auto max-h-[640px] overflow-y-scroll overflow-x-hidden  ">
          {database?.map((i, index) =>
            <CardPreview item={i} key={index} />
            // <DatabaseCard i={i} key={index} />

          )}
        </ul>
      </div>



      {data && (
        <div className='flex items-center gap-2 justify-center'>
          <p className="text-xs font-bold ">
            Users loaded:
            {' '}
            {database?.length}
          </p>
          <CSVLink
            data={data}
            headers={csv}
            className="  h-[28px] text-sm  px-4 flex items-center  bg-black text-white rounded-md"
          >
            Download as CSV
          </CSVLink>
        </div>
      )}
    </div>
  );
}

export default Database;