import React, { useState, useContext } from 'react';

import AIAnalyze from './ai-analyze';
import UsersData from './user-data';  
import { DataContext } from '../Context';
import { getChatData } from '../utils/api';
import RequestChatForm from '../ui/forms/request-chat-form';

function Request() {
  const [loading, setLoading] = useState(false);
  const { handleChatData, chatData } = useContext(DataContext);

  const handleGenerate = async (e, period, id) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await getChatData(period.toLowerCase(), id);
      handleChatData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error('chekc error', error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-[20px] w-full justify-start items-center md:items-start px-2 lg:px-0">
      <div className="flex flex-col">
        <RequestChatForm handleGenerate={handleGenerate} />
        <AIAnalyze arr={chatData.data} />
      </div>


      {!loading && chatData.data?.length > 0 && <UsersData />}

    </section>
  );
}

export default Request;
