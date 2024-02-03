import React, { useContext, useState } from 'react';

import { DataContext } from '../Context';
import { Button } from './buttons/Button';
import { IconButton } from './buttons/IconButton';

import axios from 'axios';


export const ChatUserCard = ({ i, dash }) => {
    const [usersFullInfo, setUsersFullInfo] = useState([]);
    const [itemExpanded, setItemExpanded] = useState(false);

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

    // const getUserData = async () => {
    //     try {
    //         const req = await axios.get('http://localhost:5050/dashboard', {
    //             params: { id: i.userId, type: 'user' },
    //         });

    //         if (req.status === 200) {
    //             setUsersFullInfo(req.data);
    //         } else {
    //             throw new Error('database request error');
    //         }
    //     } catch (error) {
    //         console.log('fetchDB error', error);
    //     }

    // };

    return (

        <li
            key={i.userId}
            className={`flex flex-col border text-left mx-auto  w-[540px] mb-2 py-1 px-2  z-0  rounded-md overflow-hidden transition-transofrm  duration-150 ease-linear ${itemExpanded ? 'max-h-full ' : 'max-h-[60px]'}`}
        >
            <div className="flex flex-col text-sm relative">
                <div className="flex">
                    <p className="w-[160px]">
                        <strong>userId:</strong>
                        <span> {i.userId}</span>
                    </p>
                    <p className="ml-2">
                        <strong>posts: </strong>
                        {i.msgs?.length}
                    </p>
                </div>

                <div className="flex gap-2  pt-1">
                    <p className="font-bold w-[160px]">nick:
                        <span className='font-normal ml-2'>{i.username ?? 'no username'}</span>
                    </p>
                    <p className="font-bold w-[160px]">firstname:
                        <span className='font-normal ml-2'>{i.firstname ?? 'no firstname'}</span>
                    </p>
                </div>

                <div className={`flex gap-2  pt-1 ${itemExpanded ? 'opacity-1' : 'opacity-0'}`}>
                    <p className="font-bold w-[160px]">phone:
                        <span className='font-normal ml-2'>{i.phone ?? 'no phone'}</span>
                    </p>
                    <p className="font-bold w-[160px]">lastname:
                        <span className='font-normal ml-2'>{i.lastname ?? 'no last name'}</span>
                    </p>
                </div>

                <div className=" absolute right-0 items-center flex gap-2">
                    <IconButton cb={() => setItemExpanded((prev) => !prev)} value='arrow' />
                    <IconButton cb={() => deleteUser(i.userId, chatData.data)} value='close' />
                </div>
            </div>
            {msgs}
        </li>
    );
};
