import React, { useState } from 'react';

import { Button } from '../buttons/Button';
import { ChatTypeSelect } from '../chat-type-select';
import ChatFilter from '../chat-filter';

function RequestChatForm({ handleGenerate }) {
    const [searchId, setSearchId] = useState('');
    const [query] = useState('chat');
    const [filter, setFilter] = useState('');

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
