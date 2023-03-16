import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatsContext } from '../context/ChatsContext';

const Message = ({message}) => {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatsContext)

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message]);

    const isSender = message.senderId === currentUser.uid;


    return (
        <div ref={ref} className={`message ${isSender ? 'owner' : ''} pb-4`}>
            <div className={`flex px-4 pt-2 ${
                isSender ? 'flex-row-reverse' : 'flex-row'
            }`}>
                <div>
                    <img src={ isSender ? currentUser.photoURL : data.user.photoURL} style={{ height: 60, padding: 2 }} alt="" className="flex-grow-0 flex items-center justify-center bg-teal-500 rounded-full" />       
                </div>
                <div className={`${ isSender ? 'justify-end' : 'justify-start'} pt-12`}>
                    <p className={`${ isSender ? 'bg-green-300 rounded-xl rounded-tr-none' : 'bg-gray-300 rounded-xl rounded-tl-none'} py-2 px-4 `}>{message.text}</p>
                    {message.img && <img src={message.img} alt='' />}
                </div>

            </div>
        </div>
       
    );
};

export default Message;
