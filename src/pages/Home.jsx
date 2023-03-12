import React from 'react';
import ChatScreen from '../components/ChatScreen';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Home(props) {
    return (
        <div className='overflow-hidden h-screen'>
            <Header />
            <div className='bg-periwinkle w-full h-screen flex items-center justify-center '>
            
                <div className='flex items-center justify-center h-4/5 w-4/5 border-2 border-white rounded-xl shadow-2xl'>
                    <Sidebar />
                    <ChatScreen />
                </div>
            </div>
        </div>
    );
}

export default Home;