import React, { useContext } from 'react';
import { AiFillVideoCamera } from 'react-icons/ai'
import { RiUserAddFill } from 'react-icons/ri'
import { SlOptions } from 'react-icons/sl'
import { ChatsContext } from '../context/ChatsContext';
import ChatInput from './ChatInput';
import Messages from './Messages';

const ChatScreen = () => {
    const { data } = useContext(ChatsContext);

    return (
        <div className='flex flex-col w-2/3  h-full rounded-r-xl bg-kitsuneBlue6'>
            <div className=' grid grid-cols-2 h-24 bg-kitsuneBlue5 rounded-tr-xl w-full '>
                <div  className=' flex py-2 px-2'>
                    {data && data.user ? (
                        <>
                            <img src={data.user?.photoURL} style={{height: 80, padding:2}} className=' flex justify-center items-center bg-teal-500 rounded-full mobile:hidden sm:hidden md:inline-block' alt="" />
                            <h1 className=' col-start-1 flex items-center text-2xl text-white pl-4'>{data.user?.displayName}</h1>
                        </>
                    ) : (<div> </div>)}
                </div >
                {/* This H1 Div is gonna be populated with the name of the user who you are chatting with at the time */}
                <ul className='flex items-center justify-end space-x-4 pr-4 text-2xl text-white'>
                    <li>
                        <button className='hover:text-kitsuneBlue4'>
                            <AiFillVideoCamera />
                        </button>
                    </li>
                    <li>
                        <button className='hover:text-kitsuneBlue4'>
                            <RiUserAddFill />
                        </button>
                    </li>
                    <li>
                        <button className='hover:text-kitsuneBlue4'>
                            <SlOptions />
                        </button>
                    </li>
                </ul>
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