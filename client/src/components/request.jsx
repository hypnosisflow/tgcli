import React, { useState } from 'react';

import { ChatFilter } from '../ui/chat-filter';
import { ChatTypeSelect } from '../ui/chat-type-select';

import { AIAnalyze } from './ai-analyze';
import { UsersData } from './user-data';

const { log } = console;

export const Request = ({
  data, generate, loading, title, chatId,
}) => {
  const [searchId, setSearchId] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  const [isOpened, setIsOpened] = useState(true);

  const handleOpen = () => {
    setIsOpened((prev) => !prev);
  };

  log(isOpened);

  return (
    <section className="flex gap-[20px] w-full justify-start ">
      <div
        className={`flex flex-col relative w-full ${isOpened ? 'max-w-[320px]' : 'max-w-[48px]'} items-center mt-4 transition ease-in-out duration-500 delay-200`}
      >
        <button
          className="h-8 w-8 absolute right-0 bg-slate-50/50 z-40"
          onClick={handleOpen}
        />
        <div
          className={`w-full mt-2 text-sm transition duration-100 ease-in ${isOpened ? 'opacity-1' : 'hidden'}`}
        >
          <ChatTypeSelect
            id={searchId}
            setId={setSearchId}
            query={query}
            setQuery={setQuery}
          />
          <ChatFilter filter={filter} setFilter={setFilter} />
          <button
            disabled={!query}
            className=" text-white mt-4 h-[32px] w-full"
            onClick={() => generate(query, filter, searchId)}
          >
            request
          </button>
          <AIAnalyze arr={data} />
        </div>
      </div>
      <UsersData loading={loading} data={data} title={title} chatId={chatId} />
    </section>
  );
};
