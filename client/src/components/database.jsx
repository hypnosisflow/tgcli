import axios from 'axios';
import React, { useContext } from 'react';
import { CSVLink } from 'react-csv';

import { DataContext } from '../Context';
import { DatabaseCard } from '../ui/database-card';
import { Button } from '../ui/buttons/Button';

export const Database = () => {
  const { database, handleDatabase } = useContext(DataContext);


  console.log(database)
  const fetchDB = async () => {
    try {
      const req = await axios.get('http://localhost:5050/database');

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

  const renderCards = (arr) => (
    <ul className="flex mt-2 mb-4 w-full text-sm  flex-wrap justify-center gap-y-4 gap-x-4 max-h-[640px] overflow-y-scroll  ">
      {arr?.map((i, index) => <DatabaseCard i={i} key={index} />)}
    </ul>
  );

  const view = renderCards(database);

  return (
    <div className="h-[800px] w-full bg-white rounded-2xl py-2 relative">
      <p className="text-black text-sm font-semibold uppercase">Database</p>
      <p className="text-xs opacity-50">
        Infromation fetched from elephant sql.
      </p>
      {view}
      {!data && (
        <Button cb={fetchDB} value="request" theme="black" />
      )}
      {data && (
        <>
          <p className="text-xs font-bold mt-8 mb-2">
            Users loaded: {database?.length}
          </p>
          <CSVLink
            data={data}
            headers={csv}
            className="  h-[32px] text-sm  text-black px-4 py-2 bg-slate-100 mt-2 rounded-md"
          >
            Download as CSV
          </CSVLink>
        </>
      )}
    </div>
  );
};
