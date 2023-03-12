import React, { useContext } from 'react';
import icon from '../icons/faceIcon.png'
import testPic from '../TEST/testPic.png'
import { AuthContext } from '../context/AuthContext';

function Messages(props) {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className=''>
            <div className='flex flex-row px-4 pt-2 '>
            <img src={icon} style={{height: 60, padding:2}} alt="A face Icon"  className=' flex items-center justify-center bg-teal-500 rounded-full'/>
                <div className='flex flex-col pt-12'>
                    <p className='bg-gray-300 py-2 px-4 rounded-tl-none rounded-xl max-w-fit'>
                        Message 1 'Hey look at this cool pic
                        {/* Messages will be populated here from firestore */}
                        {/* Message 1 is the message from the user you are talking to */}
                    </p>
                    <img src={testPic} alt="" style={{maxWidth: 400}}/>
                    <p>
                        Just Now
                        {/* Time Stamp will go here */}
                    </p>
                </div>
            </div>

            <div className='flex flex-row-reverse px-4 pt-2 '>
            <img src={currentUser.photoURL} style={{height: 60, padding:2}} alt="A face Icon"  className='flex-grow-0 flex items-center justify-center bg-teal-500 rounded-full'/>
                <div className='flex flex-col pt-12'>
                    <div className='flex flex-col items-end'>
                        <p className='bg-green-300 py-2 px-4 rounded-tr-none rounded-xl max-w-fit '>
                            Message 2 'Hey look at this cool pic 
                            {/* Message 2 Is the message from the user logged in */}
                            {/* Messages will be populated here from firestore */}
                        </p>
                        <img src={testPic} alt="" className='flex justify-end items-end' style={{maxWidth: 400}}/>
                    </div>
                    <p className='flex justify-end'>
                        Just Now
                        {/* Time Stamp will go here */}
                    </p>
                </div>
            </div>     
        </div>
    );
}

export default Messages;