import axios from 'axios';
import React, { useContext, useState } from 'react';
import arrow from '../assets/arrow_down.svg';
import close from '../assets/close.svg';
import { DataContext } from '../Context';

export const ChatUserCard = ({ i, dash }) => {
    const [usersFullInfo, setUsersFullInfo] = useState([]);
    const [itemExpanded, setItemExpanded] = useState(false);

    const { handleDeleteUser, chatData } = useContext(DataContext);

    const deleteUser = (id, data) => {
        const active = data.filter((i) => i.userId !== id);
        handleDeleteUser(active);
    };

    const renderMsgs = (card) => (
        <ul className={`max-h-[500px] w-full mt-4 relative overflow-y-scroll  ${itemExpanded ? 'opacity-1' : 'opacity-0'} transition duration-150 ease-linear`}>
            {card.msgs?.map((i, index) => {
                const date = new Date(i.date * 1000).toLocaleDateString();
                return (
                    <li className=" mb-3 border-b px-1" key={index}>
                        <div className="flex mb-1">
                            <span className="font-bold text-xs">msg id: </span>
                            {' '}
                            <span className="text-xs ml-1">{i.msgId}</span>
                            <span className="text-black font-bold  text-xs ml-2">
                                {date}
                            </span>
                        </div>
                        <span className="text-sm">
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

    const getUserData = async () => {
        try {
            const req = await axios.get('http://localhost:5050/dashboard', {
                params: { id: i.userId, type: 'user' },
            });

            if (req.status === 200) {
                setUsersFullInfo(req.data);
                console.log(req);
            } else {
                throw new Error('database request error');
            }
        } catch (error) {
            console.log('fetchDB error', error);
        }
    };

    return (
        <li
            key={i.userId}
            className={`flex flex-col border text-left mx-auto w-[540px] mb-2 py-1 px-2  z-0  rounded-md overflow-hidden transition-transofrm  duration-150 ease-linear ${itemExpanded ? 'max-h-full ' : 'max-h-[60px]'}`}
        >
            <div className="flex flex-col text-sm relative">
                <div className="flex">
                    <p className="">
                        <strong>userId:</strong>
                        {' '}
                        {i.userId}
                    </p>
                    <p className="ml-2">
                        <strong>posts: </strong>
                        {i.msgs?.length}
                    </p>
                </div>

                {usersFullInfo.data ? (
                    <ul className="">
                        {usersFullInfo?.data?.map((i, index) => (
                            <li key={index} className="flex mt-1 gap-2 w-1/2  pt-1">
                                <span className="font-bold">nick: </span>
                                {' '}
                                <span>{i.username}</span>
                                <span className="font-bold">first: </span>
                                <span>{i.firstname}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <button
                        className="bg-slate-50 border   right-20 mt-2"
                        onClick={getUserData}
                    >
                        get full data
                    </button>
                )}

                <div className=" absolute right-0 items-center flex gap-2">
                    <button
                        className=" p-0  right-10  bg-white flex justify-center items-center rounded-full hover:border-white"
                        onClick={() => setItemExpanded((prev) => !prev)}
                    >
                        <img src={arrow} alt="arrow-down" className=" w-[24px] h-[24px]" />
                    </button>
                    <button
                        className={`p-0 ${dash ? 'opacity-1 ' : 'opacity-0'} right-0 bg-white flex justify-center items-center rounded-full hover:border-white `}
                        onClick={() => deleteUser(i.userId, chatData.data)}
                    >
                        <img src={close} alt="close-icon" className="w-[20px] h-[20px]" />
                    </button>
                </div>
            </div>
            {msgs}
        </li>
    );
};
