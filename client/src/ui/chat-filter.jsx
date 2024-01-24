import React from 'react'

export const ChatFilter = ({filter, setFilter}) => {
    return (
        <div className='flex flex-col w-full mt-4 justify-between rounded-md  '>
            <p className='text-sm'>
                select time period:
            </p>
            <div className='flex text-sm items-center justify-between mt-2'>
                <input
                    type="button"
                    value='1 week'
                    className={`px-2 text-center w-full  cursor-pointer ${filter === 'week' ? 'opacity-1 font-semibold' : 'opacity-50'} bg-slate-100`}
                    onClick={() => setFilter('week')}
                />
                <input
                    type="button"
                    value='1 month'
                    className={`px-2 text-center w-full  cursor-pointer ${filter === 'month' ? 'opacity-1 font-semibold' : 'opacity-50'} bg-slate-100`}
                    onClick={() => setFilter('month')}
                />
                <input
                    type="button"
                    value='3 months'
                    className={`px-2  text-center w-full cursor-pointer ${filter === 'quater' ? 'opacity-1 font-semibold' : 'opacity-50'} bg-slate-100`}
                    onClick={() => setFilter('quater')}
                />

            </div>
        </div>
    )
}
