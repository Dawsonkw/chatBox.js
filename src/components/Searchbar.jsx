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
        <div className='grid grid-cols-2'> 
            <div className='flex flex-row justify-between'>
                <div className=''>
                    <input
                        type="text"
                        placeholder='User Search'
                        onKeyDown={handleKey}
                        onChange={(event) => setUserName(event.target.value)}
                        value={username}
                        className='bg-black w-40 text-white outline-none placeholder:text-white  col-start-1'
                    />
                </div>
                {user && (
                    <div className='flex py-2 col-start-2 items-center' onClick={handleSelect}>
                        <img
                            className=' flex bg-teal-500 rounded-full '
                            src={user.photoURL}
                            style={{height: 40, objectFit: 'cover',  padding:1}}
                            alt="User Photo"
                
                        />
                        <div>
                            <span className=' text-white text-xl'>{user.displayName}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Searchbar;