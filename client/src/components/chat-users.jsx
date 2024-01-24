import React, { useState } from 'react'
import { ChatUserCard } from '../ui/chat-user-card'
import { AIAnalyze } from './ai-analyze'

export const ChatUsers = ({ chatUsers }) => {
    const posters = chatUsers.map(i => i.userId).length
    const sorted = chatUsers.sort((a, b) => b.msgs.length - a.msgs.length)

    return (
        <div className='flex flex-col'>
            <p className='text-xl'>chat users posts</p>
            <p className='text-xs'>(25 posts limit)</p>
            <p>* * *</p>
            <div className='flex '>
                <div className='text-sm w-1/2'>
                    <p><strong>posters:</strong> {posters}</p>
                    {sorted.map((i, index) => {
                        return (<ChatUserCard i={i} key={index} />)
                    })}
                </div>

                <AIAnalyze arr={sorted} />
            </div>
        </div>
    )
}
