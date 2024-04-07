import React, { useContext, useState } from 'react';

import axios from 'axios';
import { DataContext } from '../Context';
import { Button } from './buttons/Button';
import { IconButton } from './buttons/IconButton';

export function ChatUserCard({ i, dash }) {
  const [usersFullInfo, setUsersFullInfo] = useState([]);
  const [itemExpanded, setItemExpanded] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

  const { handleDeleteUser, chatData } = useContext(DataContext);

  const deleteUser = (id, data) => {
    const active = data.filter((i) => i.userId !== id);
    handleDeleteUser(active);
  };

  const renderMsgs = (card) => (
    <ul className={`max-h-[500px] w-full mt-4 relative overflow-y-scroll   ${itemExpanded ? 'opacity-1' : 'opacity-0'} transition duration-150 ease-linear`}>
      {card.msgs?.map((i, index) => {
        const date = new Date(i.date * 1000).toLocaleDateString();
        return (
          <li className=" mb-3 border-b px-1 " key={index}>
            <div className="flex mb-1">
              <span className="font-bold text-xs">msg id: </span>
              <span className="text-xs ml-1">{i.msgId}</span>
              <span className="text-black font-bold  text-xs ml-2">
                {date}
              </span>
            </div>
            <span className="text-xs leading-tight">
              *
              {i.msg}
              *
            </span>
          </li>
        );
      })}
    </ul>
  );

  const msgs = renderMsgs(i);

  return (

    <li
      key={i.userId}
      className={`flex flex-col  text-left bg-white  w-[280px] p-2 shadow-sm  z-0  rounded-md overflow-hidden transition-transofrm  duration-150 ease-linear ${itemExpanded ? 'max-h-full ' : 'max-h-[130px]'}`}
    >
      <div className="flex flex-col text-sm leading-[18px]  relative">
        <div className="flex flex-col">
          <p className="w-[160px]">
            <strong>UserId:</strong>
            <span>
              {' '}
              {i.userId}
            </span>
          </p>
          <p className="">
            <strong>Messages: </strong>
            {i.msgs?.length}
          </p>

          <p className="font-bold w-[160px]">
            Nickname:
            <span className="font-normal ml-2">{i.username ?? 'none'}</span>
          </p>
          <p className="font-bold w-[160px]">
            Firstname:
            <span className="font-normal ml-2">{i.firstname ?? 'none'}</span>
          </p>

          <p className="font-bold w-[160px]">
            Phone:
            <span className="font-normal ml-2">{i.phone ?? 'none'}</span>
          </p>
          <p className="font-bold w-[160px]">
            Lastname:
            <span className="font-normal ml-2">{i.lastname ?? 'none'}</span>
          </p>

        </div>

        <div className=" absolute right-0 items-center flex flex-col justify-between h-full">
          <IconButton cb={() => deleteUser(i.userId, chatData.data)} value="close" />
          <IconButton cb={() => setItemExpanded((prev) => !prev)} value="arrow" />
        </div>
      </div>
      {msgs}
    </li>
  );
}
