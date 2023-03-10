import React from 'react';
import icon from '../icons/faceIcon.png'
import Chats from './Chats';
import Searchbar from './Searchbar';

const Sidebar = () => {
    return (
        <div className='h-full w-1/3 bg-kitsuneBlue7 rounded-l-xl '>
            <div className=' flex flex-col justify-center  h-24 bg-kitsuneBlue4 rounded-tl-xl'>
                <div className='grid grid-cols-4'>
                    <div className='col-span-2 flex justify-start py-2 pl-4 text-xl items-center underline text-white'>
                        chatBox.js
                    </div>
                    <div className='flex col-span-1 justify-end items-center py-2 pr-6 '>
                        <div className='text-lg flex space-x-2'>
                            <img src={icon} style={{height: 30, padding:1}} alt="A face Icon"  className=' flex justify-center items-center bg-teal-500 rounded-full '/>
                            <div className='text-white'>
                                Dawson
                            </div>
                            {/* User Component will go here */}
                            
                        </div>
                    </div>
                    <div className='flex col-span-1 justify-end py-2 pr-2'>
                        <div className=''>
                            <button className='py-1 px-2 text-center bg-kitsuneBlue5 rounded-sm text-lg text-white'>
                                Logout
                                {/* Logout button tethered to Firebase through react router */}
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='border-b-2 border-kitsuneBlue6 h-12 py-6 flex items-center pl-2 w-full text-xl'>
                <div className='grid grid-cols-4'>
                    <div className='col-span-2 col-start-1'>
                        <Searchbar  />
                    </div>
                    {/* SINCE A USER COMPONENT WILL GO HERE AFTER THE SEARCH POPS UP THIS IS JUST A PLACEHOLDER FOR STYLING */}
                    <div className='col-span-1 col-start-4 text-lg flex space-x-2 justify-end pr-2'>
                        <img src={icon} style={{height: 30, padding:1}} alt="A face Icon"  className=' flex items-center bg-teal-500 rounded-full '/>
                        <div className=''>
                           Dawson
                        </div>
                        {/* User Component will go here */}
                    </div>
                </div>
            </div>
            
            <div className='flex-col '>
                <Chats />
                {/* Chats Component */}
            </div>
        </div>
    );
};

export default Sidebar;