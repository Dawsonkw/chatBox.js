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
        <div>    
            {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
                <div className=' flex py-4 px-2 hover:bg-kitsuneBlue4 hover:cursor-pointer' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img className='flex items-center justify-center bg-teal-500 rounded-full ' src={chat[1].userInfo.photoURL} style={{height: 80, padding:2}} alt="" />
                    <div className='flex-col px-4 py-2'>
                        <h1 className='text-2xl text-white mobile:hidden sm:hidden md:inline-block'>{chat[1].userInfo.displayName}</h1>
                        <p className='mobile:hidden sm:hidden md:flex'>{chat[1].lastMessage?.text}</p>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Chats;
