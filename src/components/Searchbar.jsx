import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatsContext } from '../context/ChatsContext';
import { db } from '../firebase';


function Searchbar(props) {
    const [username, setUserName] = useState('');
    const [user, setUser] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatsContext)

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('displayNameLower', '==', username.toLowerCase())
        );
        
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());   
            })
        } catch(error) {
            console.error(error)
        }    
    };

    const handleKey = (event) => {
        event.code === 'Enter' && handleSearch();
    };

    const handleSelect = async () => {
        // combinedId sets a unique id composed of the main user and selected users uid's for a unique chat to be had between them
        const combinedId = currentUser.uid > user.uid 
            ? currentUser.uid + user.uid 
            : user.uid + currentUser.uid;
        try {
            const response = await getDoc(doc(db, 'chats', combinedId))
                         
            if(!response.exists()) {
                //create a new doc between the 2 users labeled 'chats' if none exists which holds an empty messages array
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
                await updateDoc(doc(db, 'userChats', user.uid),{
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL, 
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (error) {
            console.error(error)
        }
        dispatch({ type: 'CHANGE_USER', payload: user })
        setUser(null);
        setUserName('');
    }

    return (
        <div> 
            <div className='flex  justify-between'>
                <div className='pt-2'>
                    <input
                        type="text"
                        placeholder='Find User'
                        onKeyDown={handleKey}
                        onChange={(event) => setUserName(event.target.value)}
                        value={username}
                        className='bg-transparent w-32 text-white outline-none placeholder:text-white mobile:placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-xl'
                    />
                </div>
                {user && (
                    <div className='absolute bg-kitsuneBlue4 py-2 px-3 rounded z-10 block sm:block md:block hover:cursor-pointer' onClick={() => handleSelect(user)}>
                        <div className='flex items-center ' >
                            <img
                                className=' rounded-full pr-2  '
                                src={user.photoURL}
                                style={{height: 50, objectFit: 'cover',  padding:1}}
                                alt="User Photo"
                            />
                            <div>
                                <span className=' text-white text-xl px-2 pb-1 mobile:hidden sm:hidden md:inline-block'>{user.displayName}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Searchbar;