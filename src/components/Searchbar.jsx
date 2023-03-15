import { collection, doc, endAt, endBefore, getDoc, getDocs, orderBy, query, QuerySnapshot, serverTimestamp, startAt, updateDoc, where, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';


function Searchbar(props) {

    const [username, setUserName] = useState('');
    const [user, setUser] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('displayName', '==', username)
        );
        
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                setUser(doc.data());
            })
        } catch(error) {
            console.error(error)
        }
    };

    const handleKey = (event) => {
        event.code === 'Enter' && handleSearch();
    };

    // NEED TO WRITE A NEW HANDLESELECT FEATURE TO HANDLE WHEN A USER SELECTS THE PERSON THEY WANT TO CHAT WITH, DOC.DATA() IS PULLING IN THE INFO OF THE USER, WE NEED TO SYTHESIZE IT INTO A FIRESTORE DOCUMENT SO THAT THE USERS CAN CHAT AND MAKE ANOTHER FIRESTORE DATABASE TO HOLD THE MESSAGES THEY SEND. 

    const handleSelect = async (selectedUser) => {
        // combinedId sets a unique id composed of the main user and selected users uid's for a unique chat to be had between them
        const combinedId = currentUser.uid > selectedUser.uid 
            ? currentUser.uid + selectedUser.uid 
            : selectedUser.uid + currentUser.uid;


        try {
            const response = await getDoc(doc(db, 'chats', combinedId))
               
            if(!response.exists()) {
                //create a new doc between the 2 users labeled 'chats' if none exists which holds an empty messages array
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });


                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + 'userInfo']: {
                        uid: selectedUser.uid,
                        displayName: selectedUser.displayName,
                        photoURL: selectedUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', selectedUser.uid),{
                    [combinedId + 'userInfo']: {
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
        setUser(null);
        setUserName('');
    }


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
                    <div className='flex items-center ' onClick={() => handleSelect(user)}>
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