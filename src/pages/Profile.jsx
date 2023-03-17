import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';



function Profile(props) {
    const [displayName, setDisplayName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const auth = getAuth(); 
    const navigate = useNavigate();
    

    useEffect(() => {
        const user = auth.currentUser;
        if(user !== null) {
            const userDocRef = doc(db, 'users', user.uid)
            getDoc(userDocRef).then((doc) => {
                if(doc.exists()) {
                    const userData = doc.data();
                    setDisplayName(userData.displayName);
                    setProfileImage(userData.photoURL)
                } else {
                    console.log('There is no data to display!')
                }
            }).catch((error) => {
                console.error(error)
            })
        }
    }, [auth])

    
    return (
        <div>
            <Header />
            
            
            <div>
                <div className='flex w-full flex-col justify-center items-center'>
                    <div className=' bg-kitsuneBlue7 rounded-xl px-8 py-4 mt-10'>
                        <div className='flex  text-4xl mt-4'>
                            <h1 className='flex font-bold mx-auto'>Display Name: {displayName}</h1>
                        </div>
                        <div className=' mt-4 justify-center'>
                            <img src={profileImage} alt=""  style={{height: 450}}/>
                            <div className='flex justify-center'>
                                <button
                                    className='bg-kitsuneBlue5 hover:bg-kitsuneBlue4 py-4 px-6 rounded-lg mt-4 text-white'
                                    onClick={() => navigate('/updateProfile')}
                                >
                                    Update my Profile information
                                </button>
                            </div>
                        </div>
                    </div>             
                </div>            
            </div>       
        </div>
    );
}

export default Profile;