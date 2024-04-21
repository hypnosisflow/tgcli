import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context';
import { DatabaseCard } from './database-card';

function DatabaseModal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { database } = useContext(DataContext);
    const user = database?.find((i) => i.user_id === id)

    return (
        <div onClick={() => navigate(-1)} className='fixed bg-black/50 w-full h-full flex justify-center items-center'>
            {user && <DatabaseCard user={user} />}
        </div>
    )
}

export default DatabaseModal;