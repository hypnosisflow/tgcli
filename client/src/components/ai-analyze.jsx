import OpenAI from 'openai';
import React, { useState } from 'react';
import { Button } from '../ui/buttons/Button';
import { Spinner } from '../ui/spinner';

export const AIAnalyze = ({ arr }) => {
  const [targetUserId, setTargetUserId] = useState('');
  const [gptReponse, setGptReponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const targetUser = arr?.filter((i) => i.userId === targetUserId)[0];

  const str = 'Cкажи мне про каждое выражение, которое заканчивается ||, оно позитивное, нейтральное или негативное. Ответ дай массивом с числами где: {негативное: -1, позиитвное: 1; нейтральное: 0}. ';
  const subStr = targetUser?.msgs.map((i) => `${i.msg}||`);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  console.log(openai)

  async function request() {
    setGptReponse(null);
    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: `${str}. Вот выражения: ${subStr}` },
        ],
        model: 'gpt-3.5-turbo',
      });

      console.log('completion', completion)

      const response = JSON.parse(completion.choices[0].message.content);

      console.log('res', response)

      const stats = {};
      response.forEach((item) => {
        stats[item] = (stats[item] || 0) + 1;
      });

      setGptReponse({ userId: targetUser.userId, scores: stats });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const transformedScore = {
    negavite: gptReponse?.scores['-1'],
    positive: gptReponse?.scores['1'],
    neutral: gptReponse?.scores['0'],
  };

  return (
    <div className="w-full flex flex-col text-sm mt-16">
      <p className='font-semibold '>Enter user ID: </p>
      <p className='text-xs text-gray-500'>In this section you can analyze users content behaviour with GPT3.5</p>
      <div className="mt-2">
        <input
          type="text"
          value={targetUserId}
          className="border h-[32px] rounded-md w-full px-2 mb-8"
          onChange={(e) => setTargetUserId(e.target.value)}
        />
        <Button
          value='Analyze '
          cb={request}
          theme='black' />
        {loading ? (
          <Spinner />
        ) : (
          <div className="border w-full  rounded-md mt-4  p-1">
            <p>Stats for <span> <strong>userId:</strong>
              {' '}
              {gptReponse?.userId}</span></p>
            <p>

            </p>
            <p>
              <strong></strong>
              {' '}
            </p>
            <span className="text-red-500">
              <strong>neg:</strong>
            </span>
            <span className="ml-1">{transformedScore.negavite}</span>
            <span className="text-yellow-500 ml-2">
              <strong>neu:</strong>
            </span>
            <span className="ml-1">{transformedScore.neutral}</span>
            <span className="text-green-500 ml-2">
              <strong>pos:</strong>
            </span>
            <span className="ml-1">{transformedScore.positive}</span>
          </div>
        )}
      </div>
    </div>
  );
};
