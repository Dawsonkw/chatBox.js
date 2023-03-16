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



{/* <div className='flex flex-row px-4 pt-2 '>
<img src={icon} style={{height: 60, padding:2}} alt="A face Icon"  className=' flex items-center justify-center bg-teal-500 rounded-full'/>
<div className='flex flex-col pt-12'>
<p className='bg-gray-300 py-2 px-4 rounded-tl-none rounded-xl max-w-fit'>
Message 1 'Hey look at this cool pic
</p>
<img src={testPic} alt="" style={{maxWidth: 400}}/>
<p>
Just Now

</p>
</div>
</div>

<div className='flex flex-row-reverse px-4 pt-2 '>
<img src={currentUser.photoURL} style={{height: 60, padding:2}} alt="A face Icon"  className='flex-grow-0 flex items-center justify-center bg-teal-500 rounded-full'/>
<div className='flex flex-col pt-12'>
<div className='flex flex-col items-end'>
<p className='bg-green-300 py-2 px-4 rounded-tr-none rounded-xl max-w-fit '>
Message 2 'Hey look at this cool pic 

</p>
<img src={testPic} alt="" className='flex justify-end items-end' style={{maxWidth: 400}}/>
</div>
<p className='flex justify-end'>
Just Now

</p>
</div>
</div>  */}