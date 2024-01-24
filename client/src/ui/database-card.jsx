import React from 'react'

export const DatabaseCard = ({ i }) => {
    let { id, user_id, chat_type, chat_id, content, events } = i

    return (
        <li className='w-[370px] py-2 px-2 text-xs rounded-md mx-2 bg-slate-100'>
            <div className='flex  w-full gap- flex-col text-left'>
                <div className=' flex text-left justify-between'>
                    <span className='w-full'><span className='font-bold'>db id:</span> {id}</span>
                    <span className='w-full'><span className='font-bold'>tg id:</span> {user_id}</span>
                </div>

                <div className='flex text-left justify-between'>
                    <span className='w-full'><span className='font-bold'>first name:</span> jon</span>
                    <span className='w-full'><span className='font-bold'>last name:</span> doe</span>
                </div>
                <span><span className='font-bold'>events:</span> {events ? events : 'none'} </span>

                <p className='text-center font-medium'>last report</p>
                <div className='flex flex-col text-left justify-between'>
                    <span className='w-full'><span className='font-bold'>chat id:</span> {chat_id}</span>
                    <span className='w-full'><span className='font-bold'>period:</span> {chat_type}</span>
                    <span ><span className='font-bold'>messages: </span>{content?.length}</span>
                </div>
            </div>
        </li>
    )
}
