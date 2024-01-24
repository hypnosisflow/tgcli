import React, { useState } from 'react'
import { AIAnalyze } from './ai-analyze'
import { ChatFilter } from '../ui/chat-filter'
import { ChatTypeSelect } from '../ui/chat-type-select'
import { UsersData } from './user-data'

export const Request = ({ data, generate, loading, title, chatId }) => {
    const [searchId, setSearchId] = useState('')
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')

    return (
        <section className='flex gap-[20px] w-full justify-start '>
            <div className='flex flex-col  items-center mt-4'>
                <div className='w-[320px] mt-2 text-sm'>
                    <ChatTypeSelect id={searchId} setId={setSearchId} query={query} setQuery={setQuery} />
                    <ChatFilter filter={filter} setFilter={setFilter} />
                    <button disabled={!query ? true : false} className=' text-white mt-4 h-[32px] w-full' onClick={() => generate(query, filter, searchId)}>request</button>
                </div>
                <AIAnalyze arr={data} />
            </div>
            <UsersData loading={loading} data={data} title={title} chatId={chatId} />
        </section>
    )
}
