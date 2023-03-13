import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';


function Searchbar(props) {

    const [username, setUserName] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false)

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('displayName', '==', username)
        );
        
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
        } catch(error) {
            setError(true)
        }
    };

    const handleKey = (event) => {
        event.code === 'Enter' && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const response = await getDoc(doc(db, 'chats', combinedId));

            if(!response.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName, 
                        photoURL: user.photoURL
                    },
                    [combinedId + 'date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + 'date']: serverTimestamp(),
                });
            }
        } catch (error) {}

        setUser(null);
        setUserName('')
    };

    return (
        <div> 
            <div className='flex  justify-between'>
                <div className='pt-2'>
                    <input
                        type="text"
                        placeholder='User Search'
                        onKeyDown={handleKey}
                        onChange={(event) => setUserName(event.target.value)}
                        value={username}
                        className='bg-transparent w-32 text-white outline-none placeholder:text-white '
                    />
                </div>
                {user && (
                    <div className='flex items-center ' onClick={handleSelect}>
                        <img
                            className='bg-teal-500 rounded-full pr-2 '
                            src={user.photoURL}
                            style={{height: 50, objectFit: 'cover',  padding:1}}
                            alt="User Photo"
                
                        />
                        <div>
                            <span className=' text-white text-xl px-2 pb-1'>{user.displayName}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Searchbar;