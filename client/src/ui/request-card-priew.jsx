import React from 'react'
import { useLocation, Link } from 'react-router-dom';

function RequestCardPreview({ item }) {
    const location = useLocation();


    return (
        <li className="flex flex-col text-sm w-[290px] justify-center px-1 py-2 border rounded-md">
            <div className="flex flex-col w-full font-bold">
                <p>
                    Telegram ID:
                    <span className="font-normal ml-2">{item.user_d}</span>
                </p>
                <p>
                    Messages:
                    <span className="font-normal ml-2">{item?.msgs?.length}</span>
                </p>
                <p>
                    Events:
                    <span className="font-normal ml-2">{item.events ?? '- - -'}</span>
                </p>
            </div>

            <div className=' flex flex-col items-center'>
                <Link to={`/user/${item.user_d}`} state={{ background: location }}>
                    See Full Information
                </Link>
            </div>

        </ li>
    );
}

export default RequestCardPreview;