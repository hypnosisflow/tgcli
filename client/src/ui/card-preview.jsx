import React from 'react'
import { useLocation, Link } from 'react-router-dom';
export const CardPreview = ({ item }) => {
    const location = useLocation();

    // console.log(item)

    return (
        <li className="flex flex-col mx-auto text-sm w-[290px] bg-white justify-center px-1 py-2 shadow-sm rounded-md">
            <div className="flex flex-col w-full font-bold">
                <p>
                    Database ID:
                    <span className="font-normal">{item.id}</span>
                </p>
                <p>
                    Telegram ID:
                    <span className="font-normal">{item.user_id}</span>
                </p>
                <p>
                    Username:
                    <span className="font-normal">{item.username}</span>
                </p>
                <p>
                    Events:
                    <span className="font-normal">{item.events ?? '- - -'}</span>
                </p>
            </div>

            <div className=' flex flex-col items-center'>
                <Link to={`/database/${item.user_id}`} state={{ background: location }}>
                    Open Modal
                </Link>
            </div>

        </ li>
    );
}

