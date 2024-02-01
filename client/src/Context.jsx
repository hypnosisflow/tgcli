import { createContext, useState } from 'react';

export const DataContext = createContext({});

export const DataContextWrapper = ({ children }) => {
  const [channelData, setChannelData] = useState({
    id: '',
    data: null,
    period: '',
    date: null,
  });
  const [chatData, setChatData] = useState({
    id: '',
    data: null,
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

  const handleChatData = (data) => {
    setChatData({
      id: data?.chatId,
      data: data?.active,
      period: data?.period,
      date: data.date,
    });
  };

  const handleDatabase = (data) => {
    setDatabase(data);
  };

  const handleDeleteUser = (data) => {
    setChatData((prev) => ({ ...prev, data }));
  };

  return (
    <DataContext.Provider
      value={{
        channelData,
        handleChannelData,
        chatData,
        handleChatData,
        database,
        handleDatabase,
        handleDeleteUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
