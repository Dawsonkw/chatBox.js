import React from 'react';
import { IoMdAttach } from 'react-icons/io'
import { AiOutlinePicture } from 'react-icons/ai'


function ChatInput(props) {
    return (
        <div>
            <div className='bg-white w-full h-24 items-center pl-4 grid grid-cols-2'>
                <textarea name="" id="" cols="100" rows="10" placeholder='Type a message...' className=' resize-none  h-20 my-auto text-xl pl-2 focus: outline-none col-start-1 overflow-y-auto overflow-x-hidden sm:w-44 md:w-52 lg:w-72 xl:w-100' style={{scrollbarWidth: 'none', 'msOverflowStyle': 'none', '::webkit-scrollbar': {display: 'none'}}} ></textarea>
                <div className='flex justify-end items-end col-start-2 text-2xl'>
                    <ul className='flex space-x-4 pr-4'>
                        <li className='flex items-center'>
                            <button>
                                <IoMdAttach />
                            </button>
                        </li>
                        <li className='flex items-center '>
                            <button>
                                <AiOutlinePicture />
                            </button>
                        </li>
                        <li>
                            <button className='bg-green-300 py-2 px-4 text-white'>
                                Send
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default ChatInput;