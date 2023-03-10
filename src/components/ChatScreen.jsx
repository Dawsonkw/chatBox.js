import React from 'react';
import { AiFillVideoCamera } from 'react-icons/ai'
import { RiUserAddFill } from 'react-icons/ri'
import { SlOptions } from 'react-icons/sl'
import ChatInput from './ChatInput';
import Messages from './Messages';

const ChatScreen = () => {
    return (
        <div className='flex flex-col w-2/3  h-full rounded-r-xl bg-kitsuneBlue6'>
            <div className=' grid grid-cols-2 h-24 bg-kitsuneBlue5 rounded-tr-xl w-full '>
                <h1 className=' col-start-1 flex items-center text-2xl text-white pl-4'>The Cooler Dawson
                </h1>
                {/* This H1 Div is gonna be populated with the name of the user who you are chatting with at the time */}
                <ul className='flex items-center justify-end space-x-4 pr-4 text-2xl text-white'>
                    <li>
                        <button>
                            <AiFillVideoCamera />
                        </button>
                    </li>
                    <li>
                        <button>
                            <RiUserAddFill />
                        </button>
                    </li>
                    <li>
                        <button>
                            <SlOptions />
                        </button>
                    </li>
                </ul>
            </div>

            {/* Div For Chatting area */}
            <div className='flex-grow overflow-y-scroll h-64' style={{scrollbarWidth: 'none', 'msOverflowStyle': 'none', '::webkit-scrollbar': {display: 'none'}}}>
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