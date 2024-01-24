import React from 'react'

export const ChatTypeSelect = ({id, setId, query, setQuery}) => {
    
    return (
        <>
            <p className=''>select type of chat:</p>
            <div className=' rounded-md flex justify-between mt-2'>
                <input
                    type='button'
                    value='channel'
                    onClick={() => setQuery('channel')}
                    className={` mx-0 my-1 w-full ${query === 'channel' ? 'opacity-1 font-semibold' : 'font-normal opacity-50'} bg-slate-100`}>
                </input>
                <input
                    type='button'
                    value='group'
                    onClick={() => setQuery('chat')}
                    className={` mx-0 my-1 w-full ${query === 'chat' ? 'opacity-1 font-semibold' : 'font-normal opacity-50'} bg-slate-100`}>
                </input>
            </div>
            <p className='text-sm mt-4'>enter chat id:</p>

            <input placeholder='hardcoded' type="text" value={id} onChange={e => setId(e.target.value)} className='border mt-2 h-[32px] rounded-md w-full px-2' />
        </>
    )
}
