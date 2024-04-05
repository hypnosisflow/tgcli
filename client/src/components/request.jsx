import React, { useState } from 'react';

import { ChatFilter } from '../ui/chat-filter';
import { ChatTypeSelect } from '../ui/chat-type-select';

import { AIAnalyze } from './ai-analyze';
import { UsersData } from './user-data';
import { Button } from '../ui/buttons/Button';

export const Request = ({
  data, generate, loading, title, chatId,
}) => {
  const [searchId, setSearchId] = useState('');
  const [query, setQuery] = useState('chat');
  const [filter, setFilter] = useState('');
  const handleFilter = (input) => {
    switch (input) {
      case 'week': return setFilter('week');
      case 'month': return setFilter('month');
      case 'quater': return setFilter('quater');
    }
    console.log('filter setted')
  }

  return (
    <section className="flex gap-[20px] w-full justify-start ">

      <div className='flex flex-col'>
        <div
          className={`flex flex-col relative w-full max-w-[320px] mt-2 transition ease-in-out duration-500 delay-200`}
        >
          <ChatTypeSelect id={searchId} setId={setSearchId} />
          <ChatFilter filter={filter} handleFilter={handleFilter} />
          <div className='flex gap-2 mt-8'>
            <Button
              value='Clear'
              // cb={() => generate(query, filter, searchId)}
              disabled={!query}
              theme='smoke' />
            <Button
              value='Generate'
              cb={() => generate(query, filter, searchId)}
              disabled={!query}
              theme='black' />
          </div>
        </div>
        <AIAnalyze arr={data} />
      </div>
        
      <UsersData loading={loading} data={data} title={title} chatId={chatId} />
    </section>
  );
};
