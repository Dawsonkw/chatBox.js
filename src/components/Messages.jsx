import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChatsContext } from '../context/ChatsContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import Message from './Message';

const Messages = () =>  {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatsContext);
    const { currentUser } = useContext(AuthContext);
    const autoScrollRef = useRef();

    if(!data.user) {
        return null;
    }

    useEffect(() => {
        const getChats = () => {
            if(!data.combinedId) return;
            const unsubscribe = onSnapshot(doc(db, 'chats', data.combinedId), (doc) => {
                setMessages(doc.data().messages)
            });

            return () => {
                unsubscribe()
            };
        };
        currentUser.uid && getChats()
    }, [currentUser.uid, data.combinedId])
    
    useEffect(() => {
        autoScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    })




     
    return (
        <div className=''>
            {/* {console.log('messages Render:', messages)} */}
            {messages.map((message) => (
                    <Message message={message} key={message.id} />
            ))}
            <div ref={autoScrollRef}></div>
        </div>
    );
}

export default Messages;
