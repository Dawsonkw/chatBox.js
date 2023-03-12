import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile, onAuthStateChanged,} from 'firebase/auth';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, doc, updateDoc  } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { getStorage } from 'firebase/storage';

function UpdateProfile(props) {
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState(null);
    const auth = getAuth(); 
    const navigate = useNavigate();
    

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let photoURL = null;

        await updateProfile(user, {
            displayName: username,
            photoURL: selectedImage ? URL.createObjectURL(selectedImage) : null
        })
        
        try {
            const userDocRef = doc(collection(getFirestore(), 'users'), user.uid);
            await updateDoc(userDocRef, {
                displayName: username,
                photoURL: selectedImage ? URL.createObjectURL(selectedImage) : null,
            });
            console.log('Firestore User Database Updated Successfully');
        } catch (error) {
            console.error(error);
        }

        console.log('Profile Updated Successfully')
        navigate('/profile')
    };
    

    return (
        <div>
            <Header />
            <div>
                <h1>
                    Profile Information
                </h1>
                <p>
                    Enter your profile information
                </p>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="">Username</label>
                        <input 
                            type="text" 
                            name="" id="username" 
                            placeholder='What would you like to be called?'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div>
                        <h1>Upload your profile picture</h1>
                            {selectedImage && (
                                <div>
                                    <img 
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="N/A"
                                        width={'250px'}
                                    />
                                    <button
                                        className='bg-red-400 py-1 px-2 rounded-lg'
                                        onClick={(event) => {
                                        setSelectedImage(null)
                                        event.target.value = null;  
                                        }}
                                    > 
                                        Remove 
                                    </button>
                                </div>
                            )}
                            <input 
                                type="file"
                                name='profileImage'
                                onChange={(event) => {
                                    setSelectedImage(event.target.files[0])
                                }} 
                            />
                    </div>
                <button type='submit' onClick={handleUpload} >Update Profile</button>
                
                </form>
                
                
            </div>

        </div>
    );
}

export default UpdateProfile;