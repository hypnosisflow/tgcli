import { useContext, useEffect, useState } from 'react'
import { ChatUserCard } from '../ui/chat-user-card'
import { DataContext } from '../Context'
import { MockData } from '../ui/mock-data'
import { Spinner } from '../ui/spinner'

export const UsersData = ({ data, title, chatId, loading }) => {

    const { handleChatData, handleChannelData } = useContext(DataContext)
    const [saved, setSaved] = useState(false)
    const [filter, setFilter] = useState('init')
    const [active, setActive] = useState(null)
    const { type, period } = title

    console.log(chatId)

    useEffect(() => {
        setActive(data)
    }, [data])

    const doSave = (arg) => {
        setSaved(true)
        switch (type) {
            case 'channel':
                return handleChannelData(arg);
            case 'chat':
                return handleChatData(arg);
            default:
                return;
        }
    }

    const doFilter = (arg, arr) => {
        const res = () => {
            switch (arg) {
                case 'top-25':
                    return arr.slice(0, 24)
                case 'top-10':
                    return arr.slice(0, 10)
                case 'init':
                    return arr
                default:
                    return;
            }
        }
        const newArr = res();

        setActive(newArr)
        setFilter(arg)
    }

    if (loading) return <Spinner />

    return (
        <div className='flex flex-col mt-4 justify-start items-center w-full '>
            <div className='flex mb-4 justify-between  w-full '>
                <div>
                    <span className='text-xl ml-12'>{type} posters</span>
                    <span className='ml-2'>({data?.length})</span>
                    <span className='ml-2 opacity-50 text-sm'>{chatId}</span>
                    <span className='ml-2 opacity-50 text-sm opacity-'>{period}</span>
                </div>
                <button
                    disabled={saved}
                    onClick={() => doSave({ chatId, active, period, date: new Date().toLocaleString() })}
                    className='text-white text-sm h-[32px] '>
                    {saved ? <p> saved </p> : <p>save to dashboard</p>}
                </button>
            </div>

            <div className='mb-2 text-sm w-[320px] flex'>
                <input onClick={() => doFilter('init', data)} type="button" className={` cursor-pointer  w-full ${filter === 'init' ? 'opacity-1 font-semibold' : 'opacity-50'} bg-slate-100`} value={'initial'} />
                <input onClick={() => doFilter('top-10', data)} type="button" className={` cursor-pointer  w-full ${filter === 'top-10' ? 'opacity-1 font-semibold' : 'opacity-50'} bg-slate-100`} value={'top-10'} />
                <input onClick={() => doFilter('top-25', data)} type="button" className={` cursor-pointer  w-full ${filter === 'top-25' ? 'opacity-1 font-semibold' : 'opacity-50'} bg-slate-100`} value={'top-25'} />
            </div>


            {active && <ul className='  text-sm   justify-center  w-full gap-2 max-h-[640px]  overflow-y-scroll'>
                {active.map((i, index) => {
                    return (<ChatUserCard i={i} key={index} />)
                })}
            </ul>}
        </div>
    )
}
