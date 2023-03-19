import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatsContext } from '../context/ChatsContext';
import { db } from '../firebase';


const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatsContext);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data())
            });

            return () => {
                unsubscribe()
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    };

    return (
        <div className=' overflow-y-scroll mobile:max-h-80 sm:max-h-full' style={{  scrollbarWidth: 'none', 'msOverflowStyle': 'none', '::webkitScrollbar': {display: 'none'}}}>     
            {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
                <div className=' flex py-4 px-2 hover:bg-kitsuneBlue4 hover:cursor-pointer'  key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <div className=' mobile:flex-col'>
                        <div className='flex-col px-4 py-2'>
                        <div className='flex flex-row mobile:flex-col sm:flex-row'>
                            <img className=' items-center justify-center rounded-full ' src={chat[1].userInfo.photoURL} style={{height: 80, padding:2}} alt="" />
                                <h1 className='text-2xl px-1 text-white flex items-center sm:text-md'>{chat[1].userInfo.displayName}</h1>
                        </div>
                            <p className='mobile:hidden sm:flex'>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Chats;
