import React, { useState, useContext } from 'react';

import { AIAnalyze } from './ai-analyze';
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
      const response = await getChatData(period, id);
      handleChatData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error('chekc error', error);
    }
  };

  return (
    <section className="flex gap-[20px] w-full justify-start ">
      <div className="flex flex-col">
        <RequestChatForm handleGenerate={handleGenerate} />
        <AIAnalyze arr={chatData.data} />
      </div>

      <UsersData loading={loading} />
    </section>
  );
}

export default Request;
