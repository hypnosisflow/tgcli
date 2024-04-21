import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../img/res.png'
import { Button } from '../buttons/Button';

function HelpModal() {
    const navigate = useNavigate();


    return (
        <div id='overlay' className='absolute bg-black/50 w-full h-full flex justify-center items-center '>
            <div className='max-w-[390px] z-50 text-center py-4 px-4 rounded-md flex flex-col justify-between items-center bg-white w-full h-[350px]'>
                <div className='w-full flex flex-col '>
                    <h3 className='font-semibold mb-4'>How can I find out group chat ID?</h3>
                    <span className='text-sm'>Open your Telegram and follow instructions:</span>
                    <Link to='https://t.me/username_to_id_bot' target='_blank' className='font-semibold'>https://t.me/username_to_id_bot</Link>

                    <p className='mt-4 text-sm'>Get response like on picture and use it in our service </p>
                    <img src={img} alt="screenshot" className='mt-2 w-full rounded-md' />
                </div>

                <Button cb={() => navigate(-1)} value="Got It!" theme="black" />

            </div>
        </div>
    )
}

export default HelpModal;