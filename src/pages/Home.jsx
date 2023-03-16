import React from 'react';
import ChatScreen from '../components/ChatScreen';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Home(props) {
    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className='bg-periwinkle w-full flex-1 flex items-center justify-center '>
                <div className='flex h-4/5 w-4/5  rounded-xl shadow-2xl '>
                    <Sidebar  />
                    <ChatScreen  />
                </div>
            </div>
        </div>
    );
}

export default Home;