import React, { useContext } from 'react';
import { getAuth, signOut} from 'firebase/auth';
import Chats from './Chats';
import Searchbar from './Searchbar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser);
    
    const navigate = useNavigate();

    const logout = async(event) => {
        event.preventDefault();
        try{
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                //Sign out successful
                })
                .then(navigate('/login'))
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className='h-full w-1/3 bg-kitsuneBlue7 rounded-l-xl '>
            <div className=' flex flex-col justify-center  h-24 bg-kitsuneBlue4 rounded-tl-xl'>
                <div className='grid grid-cols-4'>
                    <div className='flex col-span-3 items-center py-2 pr-6 pl-2'>
                        <div className='text-lg flex space-x-2'>
                            <img src={currentUser.photoURL} style={{height: 40, padding:1}} alt="A face Icon"  className=' flex justify-center items-center bg-teal-500 rounded-full '/>
                            <div className='text-white pt-1 text-2xl'>
                                {currentUser.displayName}      
                            </div>     
                        </div>
                    </div>
                    <div className='flex col-span-1 justify-end py-2 pr-4'>
                        <div className='pt-1'>
                            <button 
                                className='py-1 px-1 text-center bg-kitsuneBlue5 rounded-sm text-md text-white'
                                onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>          
            </div>

            <div className='border-b-2 border-kitsuneBlue6 h-24 py-6 pl-2 text-xl '>
                <div className=''>
                        <Searchbar />              
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
