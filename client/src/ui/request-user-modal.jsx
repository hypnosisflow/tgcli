import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context';

function RequestUserModal() {
    const { id } = useParams();
    const { chatData } = useContext(DataContext);

    const navigate = useNavigate();

    const user = chatData.data?.find((i) => i.user_id === id)

    console.log('user', user)
    const handleClose = () => {
        navigate(-1)
    }

    // const blob = new Blob([user.photo.thumb.data], { type: 'image/jpeg' });

    // // Create a URL representing the blob
    // const url = URL.createObjectURL(blob);
    // console.log(url)



    return (
        <div onClick={handleClose} role='button' className='fixed bg-black/50 w-full h-full flex justify-center items-center'>
            {user &&


                <div className="max-w-[390px] w-full rounded-md h-[600px] flex flex-col justify-center px-4 py-4 bg-white items-center">

                    <div className='flex text-sm w-full'>
                        <div className='w-full flex flex-col font-semibold'>
                            <span>Telegram ID:</span>
                            <span>Username: </span>
                            <span>Firstname:</span>
                            <span>Lastname:</span>
                            <span>Phone:</span>
                        </div>

                        <div className='flex flex-col w-full text-left'>
                            <span>{user.user_id ?? <span className='text-gray-500 text-xs'>none</span>}</span>
                            <span>{user.username ?? <span className='text-gray-500 text-xs'>none</span>}</span>
                            <span>{user.firstname ?? <span className='text-gray-500 text-xs'>none</span>}</span>
                            <span>{user.lastname ?? <span className='text-gray-500 text-xs'>none</span>}</span>
                            <span>{user.phone ?? <span className='text-gray-500 text-xs'>none</span>}</span>
                        </div>
                    </div>
                    <ul className={`max-h-[500px] w-full my-4 relative overflow-y-scroll overflow-x-hidden transition duration-150 ease-linear`}>
                        {user?.msgs?.map((i, index) => {
                            const date = new Date(i.date * 1000).toLocaleDateString();
                            return (
                                <li className=" mb-3 border-b px- " key={index}>
                                    <div className="flex mb-1">
                                        <span className="font-bold text-xs">msg id: </span>
                                        <span className="text-xs ml-1">{i.msgId}</span>
                                        <span className="text-black font-bold  text-xs ml-2">
                                            {date}
                                        </span>
                                    </div>
                                    <span className="text-xs leading-tight">
                                        *
                                        {i.msg}
                                        *
                                    </span>
                                </li>
                            );
                        })}
                    </ul>


                </div>


            }


        </div>
    )
}
export default RequestUserModal