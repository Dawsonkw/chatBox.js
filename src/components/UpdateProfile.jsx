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
                displayNameLower: username.toLowerCase(),
                photoURL: photoURL,
                uid: user.uid,
            });

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

        navigate('/profile')
    };
    
    return (
        <div>
            <Header />
            <div className='flex flex-col mx-auto items-center'>
                <div className='rounded-xl bg-kitsuneBlue7 px-8 py-4 mt-10'>
                    <div className=''>
                        <h1 className='text-4xl underline pb-4 text-center'>
                            Profile Information
                        </h1>
                    </div>
                    <form className='flex flex-col items-center' onSubmit={handleFormSubmit}>
                    
                        <div>
                            <h1 className='text-center text-xl'>Upload your profile picture</h1>
                                {selectedImage && (
                                        <div className='flex flex-col'>
                                            <img
                                            className='mx-auto'
                                                src={URL.createObjectURL(selectedImage)}
                                                alt="N/A"
                                                width={'350px'}
                                            />
                                            <button
                                                className='bg-red-400 py-1 px-2 rounded-lg justify-center items-center mb-2'
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
                            <div className='my-4 flex justify-center'>
                                <label className='text-lg '>Pick A Username: </label>
                                <input
                                    type="text"
                                    name="" id="username"
                                    placeholder=' Username...'
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                        </div>
                    <div className=' bg-kitsuneBlue5 hover:bg-kitsuneBlue4 hover:cursor-pointer py-4 px-6 rounded-lg text-white'>
                        <button type='submit' >Update Profile</button>
                    </div>
                    
                    </form>
                    
                </div>
                
            </div>

        </div>
    );
}

export default UpdateProfile;



