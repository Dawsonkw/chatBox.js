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


    return (
        <div ref={ref} classname={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div>
                <img src={
                    message.senderId === currentUser.uid ? currentUser.photoURL : data.selectedUser.photoURL
                } alt="" />
                <span>Just Now</span>
            </div>
            <div>
                <p>{message.text}</p>
                {message.img  && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;