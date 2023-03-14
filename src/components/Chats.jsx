import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatsContext } from '../context/ChatsContext';
import { db } from '../firebase';
import icon from '../icons/faceIcon.png'

const Chats = () => {
   

    return (
        <div>    
            
        </div>
    );
};

export default Chats;


//b[1].date - a[1].date


{/* <div className='flex py-4 px-2 hover:bg-kitsuneBlue4 hover:cursor-pointer'>
<img src={icon} style={{height: 80, padding:2}} alt="A face Icon"  className=' flex items-center justify-center bg-teal-500 rounded-full '/>
<div className='flex-col px-4 py-2'>
<div className='text-2xl text-white'> The Cooler Dawson </div>

<div className=' text-white'> Message goes here </div>

</div>
</div> */}