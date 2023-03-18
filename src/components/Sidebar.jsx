import React, { useContext, useEffect, useState } from 'react';
import { getAuth, signOut} from 'firebase/auth';
import Chats from './Chats';
import Searchbar from './Searchbar';
import { AuthContext } from '../context/AuthContext';
import { ChatsContext } from '../context/ChatsContext'
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Sidebar = () => {
    const [messages, setMessages] = useState([]);
    const {currentUser} = useContext(AuthContext)  
    const { data } = useContext(ChatsContext);
    const navigate = useNavigate();

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

    const clearMessagesOnLogout = () => {
        setMessages([]);
    }

    const logout = async (event) => {
        event.preventDefault();
        try{
            const auth = getAuth();
            await signOut(auth);
            clearMessagesOnLogout();
            navigate('/login');
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className='relative h-full w-1/3 bg-kitsuneBlue7 rounded-l-xl '>
            <div className=' flex flex-col justify-center  h-24 bg-kitsuneBlue4 rounded-tl-xl'>
                <div className='grid grid-cols-4'>
                    <div className='flex col-span-3 items-center py-2 pr-6 pl-2'>
                        <div className='text-lg flex space-x-2'>
                            <img src={currentUser.photoURL} style={{height: 50, padding:1}} alt="A face Icon"  className=' flex justify-center items-center bg-teal-500 rounded-full '/>
                            <div className='text-white pt-2 text-2xl mobile:hidden sm:hidden md:inline-block'>
                                {currentUser.displayName}      
                            </div>     
                        </div>
                    </div>
                    <div className='flex col-span-1 justify-end py-4 pr-4'>

                    </div>
                </div>          
            </div>

            <div className='border-b-2 border-kitsuneBlue6 h-24 py-6 pl-2 text-xl '>
                <div className=''>
                        <Searchbar />              
                </div>
            </div>
            
            
                <div className='flex flex-col'>
                    <Chats />
                </div>
                {/* Chats Component */}
                <div className='absolute bottom-0 -left-2 right-0 pt-1 pl-2'>
                    <button 
                        className='py-4 px-6 text-center bg-kitsuneBlue5 text-md text-white rounded-bl-xl rounded-tr-xl hover:bg-kitsuneBlue4'
                        onClick={logout}>
                        Logout
                    </button>
                </div>
            
        </div>
    );
};

export default Sidebar;
