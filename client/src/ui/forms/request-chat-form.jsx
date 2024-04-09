import React, { useState } from 'react';

import { Button } from '../buttons/Button';
import { ChatTypeSelect } from '../chat-type-select';
import ChatFilter from '../chat-filter';

const MONTHS = ['January', 'February', 'March', 'April'];

function RequestChatForm({ handleGenerate }) {
    const [searchId, setSearchId] = useState('');
    const [query] = useState('chat');
    const [filter, setFilter] = useState('');

    const [month, setMonth] = useState('')
    const [collapsed, setCollapsed] = useState(false)

    console.log(filter)
    const handleFilter = (input) => {
        switch (input) {
            case 'week': return setFilter('week');
            case 'month': return setFilter('month');
            case 'quater': return setFilter('quater');
            default: return 'da';
        }
    };



    return (
        <form
            onSubmit={(e) => handleGenerate(e, filter, searchId)}
            className="flex flex-col relative w-full max-w-[320px] mt-2 transition ease-in-out duration-500 delay-200"
        >
            <ChatTypeSelect id={searchId} setId={setSearchId} />
            <ChatFilter filter={filter} handleFilter={handleFilter} />

            <div className='w-full flex gap-2 items-center mt-2'>
                <span className='text-sm font-semibold '>Pick a month:</span>

                <div className='w-full h-32px flex-1 relative'>
                    <input type="button" value={filter} onClick={() => setCollapsed((prev) => !prev)} className='w-full text-sm bg-white border rounded-md flex items-center justify-center h-[32px] cursor-pointer' />

                    <ul className={`absolute bg-white w-full text-center rounded-md ${collapsed ? 'block' : 'hidden'}`}>
                        {MONTHS.map((i, index) => <li key={index} className='text-sm flex items-center justify-center h-[32px] text-gray-500 hover:text-black hover:font-semibold cursor-pointer'>
                            <input type="button" value={i} onClick={() => setFilter(i)} className="w-full cursor-pointer" />
                        </li>)}
                    </ul>
                </div>

            </div>
            <div className="flex gap-2 mt-8">
                <Button
                    value="Clear"
                    disabled={!query}
                    theme="smoke"
                />
                <Button
                    value="Generate"
                    disabled={!query}
                    theme="black"
                    type='submit'
                />
            </div>
        </form>

    );
}

export default RequestChatForm
