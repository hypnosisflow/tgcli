import React, { useState } from 'react'
import OpenAI from "openai"
import { Spinner } from '../ui/spinner'

export const AIAnalyze = ({ arr }) => {

    const [targetUserId, setTargetUserId] = useState('')
    const [gptReponse, setGptReponse] = useState(null)
    const [loading, setLoading] = useState(false)

    const targetUser = arr?.filter(i => i.userId === targetUserId)[0]

    const str = 'Cкажи мне про каждое выражение, которое заканчивается ||, оно позитивное, нейтральное или негативное. Ответ дай массивом с числами где: {негативное: -1, позиитвное: 1; нейтральное: 0}. '
    const subStr = targetUser?.msgs.map(i => i.msg + '||')

    const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

    async function request() {
        setGptReponse(null)
        setLoading(true)
        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: `${str}. Вот выражения: ${subStr}` }],
                model: "gpt-3.5-turbo",
            });

            const response = JSON.parse(completion.choices[0].message.content)
            const stats = {};
            response.forEach(item => {
                stats[item] = (stats[item] || 0) + 1;
            });

            setGptReponse({ userId: targetUser.userId, scores: stats })
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    const transformedScore = {
        negavite: gptReponse?.scores['-1'],
        positive: gptReponse?.scores['1'],
        neutral: gptReponse?.scores['0']
    }

    return (
        <div className='w-1/2 flex flex-col items-center text-sm mt-16'  >
            <p>enter user id: </p>
            <div className='w-[320px]'>
                <input type="text" value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)} className='border mb-4 h-[32px] rounded-md w-full px-2' />
                <button onClick={request} className='text-white w-full h-[32px]'>analyze content with chat-gpt</button>

                {loading ?
                    <Spinner />
                    :
                    <div className='border w-full  rounded-md mt-4  p-1'>
                        <p>stats</p>
                        <p><strong>userId:</strong> {gptReponse?.userId}</p>
                        <p><strong>scores:</strong> </p>
                        <span className='text-red-500'><strong>neg:</strong></span><span className='ml-1'>{transformedScore.negavite}</span>
                        <span className='text-yellow-500 ml-2'><strong>neu:</strong></span><span className='ml-1'>{transformedScore.neutral}</span>
                        <span className='text-green-500 ml-2'><strong>pos:</strong></span><span className='ml-1'>{transformedScore.positive}</span>
                    </div>
                }
            </div>
        </div>
    )
}
