import React, { createContext, useState, useMemo } from 'react';

export const DataContext = createContext({});

export function DataContextWrapper({ children }) {
  const [channelData, setChannelData] = useState({
    id: '',
    data: null,
    period: '',
    date: null,
  });
  const [chatData, setChatData] = useState({
    id: '',
    data: [],
    period: '',
    date: null,
  });
  const [database, setDatabase] = useState(null);

  const handleChannelData = (data) => {
    setChannelData({
      id: data.chatId,
      data: data.active,
      period: data.period,
      date: data.date,
    });
  };

  const handleChatData = (response) => {
    setChatData({
      id: response.id,
      data: response.data,
      period: response.period,
      date: response.date,
    });
  };

  const handleUpdataChat = (data) => {
    setChatData((prev) => ({ ...prev, data }));
  };

  const handleDatabase = (data) => {
    setDatabase(data);
  };

  const handleDeleteUser = (data) => {
    setChatData((prev) => ({ ...prev, data }));
  };

  const contextValue = useMemo(() => ({
    channelData,
    handleChannelData,
    chatData,
    handleChatData,
    database,
    handleDatabase,
    handleDeleteUser,
    handleUpdataChat,
    // eslint-disable-next-line max-len
  }), [channelData, handleChannelData, chatData, handleChatData, database, handleDatabase, handleDeleteUser, handleUpdataChat]);

  return (
    <DataContext.Provider
      value={contextValue}
    >
      {children}
    </DataContext.Provider>
  );
}
