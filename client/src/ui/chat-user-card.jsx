import React, { useContext, useState } from 'react'
import arrow from '../assets/arrow_down.svg'
import close from '../assets/close.svg'
import { DataContext } from '../Context'

export const ChatUserCard = ({ i, del, dash }) => {
    const [itemExpanded, setItemExpanded] = useState(false)
    const { handleDeleteUser, chatData } = useContext(DataContext)

    const deleteUser = (id, data) => {
        const active = data.filter((i) => i.userId !== id)
        handleDeleteUser(active)
    }

    const renderMsgs = (card) => {
        return (
            <ul className='max-h-[500px] w-full mt-4 relative overflow-y-scroll '>
                {card.msgs?.map((i, index) => {
                    let date = new Date(i.date * 1000).toLocaleDateString()
                    return (
                        <li className=' mb-3 border-b px-1' key={index}>
                            <div className='flex mb-1'>
                                <span className='font-bold text-xs'>msg id: </span> <span className='text-xs ml-1'>{i.msgId}</span>

                                <span className='text-black font-bold  text-xs ml-2'>{date}</span>
                            </div>
                            <span className='text-sm'>*{i.msg}*</span>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const msgs = renderMsgs(i)

    return (
        <li key={i.userId} className={`flex flex-col border text-left mx-auto w-[540px] mb-2 py-1 px-2   rounded-md overflow-hidden transition-transofrm  duration-150 ease-linear ${itemExpanded ? 'max-h-full ' : 'max-h-[40px]'}`}>
            <div className='flex flex-col relative'>
                <div className='flex'>
                    <p className=''><strong>userId:</strong> {i.userId}</p>
                    <p className='ml-2'><strong>posts: </strong>{i.msgs?.length}</p>
                    <p className='ml-2'><strong>events:</strong> <span className='text-slate-300'>- - -</span></p>
                </div>
                <button onClick={() => setItemExpanded(prev => !prev)} className='mr-12 p-0 absolute right-0 bg-white flex justify-center items-center rounded-full hover:border-white'>
                    <img src={arrow} alt="arrow-down" className=' w-[24px] h-[24px]' />
                </button>
                <button onClick={() => deleteUser(i.userId, chatData.data)} className={`p-0 ${dash ? 'absolute ' : 'hidden'} right-0 bg-white flex justify-center items-center rounded-full hover:border-white `}>
                    <img src={close} alt="close-icon" className='w-[24px] h-[24px]' />
                </button>
            </div>
            {msgs}
        </li>
    )
}
