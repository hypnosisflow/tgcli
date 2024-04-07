import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context';
import { DatabaseCard } from './database-card';
export const DatabaseModal = () => {
    const { id } = useParams();
    const { database } = useContext(DataContext);

    const navigate = useNavigate();

    const user = database?.find((i) => i.user_id === id)



    console.log('use', user)
    console.log(database)
    // console.log(typeof id)




    return (
        <div onClick={() => navigate(-1)} className='fixed bg-black/50 w-full h-full flex justify-center items-center'>
            <p>DatabaseModal</p>

            {user && <DatabaseCard user={user} />}
        </div>
    )
}
