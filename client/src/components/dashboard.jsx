import axios from 'axios';
import React, { useContext } from 'react';

import { DataContext } from '../Context';
import { ChatUserCard } from '../ui/chat-user-card';
import { Button } from '../ui/buttons/Button';

export function Dashboard() {
  const { channelData, chatData, handleUpdataChat } = useContext(DataContext);

  return (
    <section className=" h-full py-2 w-full bg-white rounded-2xl border-white border relative">
      <h2 className="text-black uppercase text-sm font-semibold">dashboard</h2>
      <p className="text-xs opacity-50">
        Preview from last added infromation before putting into database.
      </p>

      <div className="flex mt-4 mx-0  ">
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
              <Button cb={() => reqUserFullInfo(chatData)} value="request full info" theme="smoke" />
              <Button cb={() => alert('coming')} value="clear dashboard" theme="smoke" />
              <Button cb={() => send(chatData)} value="send to database" theme="black" />
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
