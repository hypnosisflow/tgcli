import React, { useContext } from 'react'
import { DataContext } from '../Context'
import { ChatUserCard } from '../ui/chat-user-card'
import axios from 'axios'

export const Dashboard = () => {
    const { channelData, chatData } = useContext(DataContext)

    const send = async (data) => {
        const res = await axios.post("http://localhost:5050", data);
        if (res.status === 200) {
            alert('data sent to elephant sql')
        } else {
            alert('data not sent (error)')
        }
    }

    return (
        <div className=' min-h-[800px] h-fit py-4 w-full bg-white rounded-2xl border-white border relative'>
            <p className='text-black text-xl font-semibold'>dashboard</p>
            <p className='text-sm opacity-50'>preview from last added infromation before putting into database</p>
            <div className='flex mt-4 mx-0  h-fit'>
                {channelData.data &&
                    <div className='w-1/2 mx-auto'>
                        <span className='font-bold mb-2'>channel report</span>
                        <span className='ml-2 opacity-50 text-sm'>{channelData.id}</span>
                        <span className='ml-2 opacity-50 text-sm'>{channelData.period}</span>
                        <span className='ml-2 opacity-50 text-sm'>{channelData.date}</span>
                        <span className='ml-2 text-sm font-bold'>({channelData.data.length})</span>
                        <ul className='flex mt-2  text-sm flex-wrap justify-center w-full gap-2 max-h-[640px]  overflow-y-scroll'>
                            {channelData.data.map((i, index) => {
                                return (<ChatUserCard i={i} key={index} dash={true} />)
                            })}
                        </ul>
                        <div className='flex text-sm gap-5 justify-center mt-4 mb-2'>
                            <button onClick={() => alert('comming')} className='text-black border h-[32px] border-black bg-white mt-4'>remove from dashborad</button>
                            <button onClick={() => send(channelData)} className='text-white h-[32px] mt-4'>send channel data</button>
                        </div>
                    </div>
                }

                {chatData.data &&
                    <div className='w-1/2 mx-auto'>
                        <span className='font-bold mb-2'>group report</span>
                        <span className='ml-2 opacity-50 text-sm'>{chatData.id}</span>
                        <span className='ml-2 opacity-50 text-sm'>{chatData.period}</span>
                        <span className='ml-2 opacity-50 text-sm'>{chatData.date}</span>
                        <span className='ml-2 text-sm font-bold'>({chatData.data.length})</span>
                        <ul className='flex mt-2  text-sm flex-wrap justify-center w-full gap-2 max-h-[640px]  overflow-y-scroll'>
                            {chatData.data.map((i, index) => {
                                return (<ChatUserCard i={i} key={index} dash={true} />)
                            })}
                        </ul>
                        <div className='flex text-sm gap-5 justify-center mt-4 mb-2'>
                            <button onClick={() => alert('coming')} className='text-black border h-[32px] border-black bg-white mt-4'>remove from dashborad</button>
                            <button onClick={() => send(chatData)} className='text-white mt-4 h-[32px]'>send group data</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
