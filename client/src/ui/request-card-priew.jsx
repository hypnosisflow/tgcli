import React from 'react'
import { useLocation, Link } from 'react-router-dom';

function RequestCardPreview({ item }) {
    const location = useLocation();


    return (
        <li className="flex flex-col mx-auto bg-white text-sm w-[290px] justify-center px-2 py-2 shadow-sm rounded-md">
            <div className="flex flex-col w-full font-bold " >
                <p>
                    Telegram ID:
                    <span className="font-normal ml-2">{item.user_id}</span>
                </p>
                <div className='flex justify-between text-left'>
                    <p className='w-full'> 
                        Messages:
                        <span className="font-normal ml-2">{item?.msgs?.length}</span>
                    </p>
                    <p className='w-full'>
                        Events:
                        <span className="font-normal ml-2">{item.events ?? '0'}</span>
                    </p>
                </div>
            </div>

            <div className=' flex flex-col items-center mt-2'>
                <Link to={`/user/${item.user_id}`} state={{ background: location }} className='text-xs text-black'>
                    See Full Information
                </Link>
            </div>

        </ li>
    );
}

export default RequestCardPreview;