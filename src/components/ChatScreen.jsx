import React, { useContext } from 'react';
import { ChatsContext } from '../context/ChatsContext';
import ChatInput from './ChatInput';
import Messages from './Messages';

const ChatScreen = () => {
    const { data } = useContext(ChatsContext);

    return (
        <div className='flex flex-col w-2/3  h-full rounded-r-xl bg-kitsuneBlue6'>
            <div className=' grid grid-cols-2 h-24 bg-kitsuneBlue5 rounded-tr-xl w-full '>
                {/* This Div is gonna be populated with the name of the user who you are chatting with at the time */}
                {data && data.user ? (
                    <div  className=' flex py-2 px-2'>
                            <>
                                <img src={data.user?.photoURL} style={{height: 80, padding:2}} className=' flex justify-center items-center  rounded-full ' alt="" />
                                <h1 className=' col-start-1 flex items-center text-2xl text-white pl-4'>{data.user?.displayName}</h1>
                            </>
                    </div >
                ) : null}

            </div>
            {/* Div For Chatting area */}
            <div className='flex-grow overflow-y-scroll h-64' style={{scrollbarWidth: 'none', 'msOverflowStyle': 'none', '::webkitScrollbar': {display: 'none'}}}>
                <Messages />
            </div>
            {/* Div for chat input field component */}
            <div className='flex-shrink'>
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatScreen;