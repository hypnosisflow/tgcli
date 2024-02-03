import axios from 'axios';
import React, { useContext } from 'react';

import { DataContext } from '../Context';
import { ChatUserCard } from '../ui/chat-user-card';
import { Button } from '../ui/buttons/Button';

export const Dashboard = () => {
  const { channelData, chatData, handleUpdataChat } = useContext(DataContext);

  const send = async (data) => {
    try {
      const res = await axios.post('http://localhost:5050/dashboard', data);
      if (res.status === 200) {
        alert('data sent to elephant sql');
      } else {
        alert('data not sent (error)');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  console.log(chatData)

  const reqUserFullInfo = async (arr) => {
    const data = arr.data.map(i => i.userId)

    try {
      const req = await axios.get('http://localhost:5050/dashboard', {
        params: { type: 'user', data: data },
      });

      if (req.status === 200) {
        const data = req.data
        const newarr = chatData.data.map((i) => {
          const item = data.data.filter(j => j.userId === i.userId)
          return { ...i, ...item[0] }
        })

        handleUpdataChat(newarr)

      } else {
        throw new Error('database request error');
      }
    } catch (error) {
      console.log('fetchDB error', error);
    }
  }

  return (
    <section className=" h-full py-2 w-full bg-white rounded-2xl border-white border relative">
      <h2 className="text-black uppercase text-sm font-semibold">dashboard</h2>
      <p className="text-xs opacity-50">
        Preview from last added infromation before putting into database.
      </p>

      <div className="flex mt-4 mx-0  ">
        {/* {channelData.data && (
          <div className="w-1/2 mx-auto">
            <span className="font-bold mb-2">channel report</span>
            <span className="ml-2 opacity-50 text-sm">{channelData.id}</span>
            <span className="ml-2 opacity-50 text-sm">
              {channelData.period}
            </span>
            <span className="ml-2 opacity-50 text-sm">{channelData.date}</span>
            <span className="ml-2 text-sm font-bold">
              (
              {channelData.data.length}
              )
            </span>
            <ul className="flex mt-2  text-sm flex-wrap justify-center w-full gap-2 max-h-[640px]  overflow-y-scroll">
              {channelData.data.map((i, index) => <ChatUserCard i={i} key={index} dash />)}
            </ul>
            <div className="flex text-sm gap-5 justify-center mt-4 mb-2">
              <button
                className="text-black border h-[32px] border-black bg-white mt-4"
                onClick={() => alert('comming')}
              >
                remove from dashborad
              </button>
              <button
                className="text-white h-[32px] mt-4"
                onClick={() => send(channelData)}
              >
                send channel data
              </button>
            </div>
          </div>
        )} */}

        {chatData.data && (
          <div className="max-w-[640px] mx-auto h-[640px] ">
            <span className="font-bold mb-2">Chat report:</span>
            <span className="ml-2 opacity-50 text-sm">{chatData.id}</span>
            <span className="ml-2 opacity-50 text-sm">{chatData.period}</span>
            <span className="ml-2 opacity-50 text-sm">{chatData.date}</span>
            <span className="ml-2 text-sm font-bold">
              (
              {chatData.data.length}
              )
            </span>

            <ul className="flex mt-2  text-sm flex-wrap justify-center w-full gap-2 max-h-[640px]  overflow-y-scroll">
              {chatData.data.map((i, index) => <ChatUserCard i={i} key={index} dash />)}
            </ul>

            <div className="flex text-sm gap-2 justify-center imtems-center mt-4 mx-auto  mb-2">
              <Button cb={() => reqUserFullInfo(chatData)} value='request full info' theme={'smoke'} />
              <Button cb={() => alert('coming')} value='clear dashboard' theme={'smoke'} />
              <Button cb={() => send(chatData)} value='send to database' theme={'black'} />
            </div>
          </div>
        )}

      </div>


    </section>
  );
};
