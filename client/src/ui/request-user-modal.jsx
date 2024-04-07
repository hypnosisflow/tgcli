import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context';

function RequestUserModal() {
    const { id } = useParams();
    const { chatData } = useContext(DataContext);

    const navigate = useNavigate();

    const user = chatData.data?.find((i) => i.user_d === id)

    console.log('use', user)
    // console.log(typeof id)

    return (
        <div onClick={() => navigate(-1)} className='fixed bg-black/50 w-full h-full flex justify-center items-center'>
            {user && <div className="max-w-[768px] w-full rounded-md h-[320px] flex justify-center bg-white items-center">
                <p>{user.user_d}</p>
            </div>}
        </div>
    )
}
export default RequestUserModal