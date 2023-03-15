import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile, onAuthStateChanged,} from 'firebase/auth';
import { getFirestore, collection, doc, updateDoc, } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function UpdateProfile(props) {
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState({})
    
    const auth = getAuth(); 
    const storage = getStorage(); 
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
        let photoURL = null

        if(selectedImage) {
            const storageRef = ref(storage, `profilePics/${user.uid}`);
            await uploadBytes(storageRef, selectedImage)
            const downloadURL = await getDownloadURL(storageRef);
            photoURL = downloadURL;
        }
        try {
            const userDocRef = doc(collection(getFirestore(), 'users'), user.uid);
            await updateDoc(userDocRef, {
                displayName: username,
                photoURL: photoURL,
                uid: user.uid,
            });
            console.log('Firestore User Database Updated Successfully'); // Remove console statements before final deployment
            const updatedUser = {
                ...currentUser,
                displayName: username,
                photoURL: photoURL,
                uid: user.uid,
            }
            setCurrentUser(updatedUser);
            await updateProfile(auth.currentUser, {
                displayName: username,
                photoURL: photoURL,
                uid: user.uid,
            })      
        } catch (error) {
            console.error(error);
        }
        
        console.log('Profile Updated Successfully') // Remove before final deployment
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
                <button type='submit' >Update Profile</button>
                
                </form>
                
                
            </div>

        </div>
    );
}

export default UpdateProfile;



