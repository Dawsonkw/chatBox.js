import React, { useContext, useState } from 'react';
import { IoMdAttach } from 'react-icons/io'
import { AiOutlinePicture } from 'react-icons/ai'
import { AuthContext } from '../context/AuthContext';
import { ChatsContext } from '../context/ChatsContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import {  v4 as uuid } from 'uuid'
import { arrayUnion, serverTimestamp, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';




function ChatInput(props) {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatsContext);

    const handleSend = async () => {
        if(image) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef,  image);

            uploadTask.on(
                (error) => {
                    console.error(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log(data.combinedId)
                        await updateDoc(doc(db, 'chats', data.combinedId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                image: downloadURL,
                            })
                        });
                    });
                }
            );
            } else{
                await updateDoc(doc(db, 'chats', data.combinedId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    })
                });
            }

            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [data.combinedId + '.lastMessage']: {
                    text
                },
                [data.combinedId + '.date']: serverTimestamp(),
            });
            setText('');
            setImage(null);
    }

    const handleKey = (event) => {
        event.code === 'Enter' && handleSend();
    };


    return (
        <div>
            <div className='bg-white w-full h-24 items-center pl-4 grid grid-cols-2'>
                <textarea 
                    className=' w-full resize-none h-20 my-auto text-xl pl-2 focus:outline-none col-start-1 overflow-y-auto overflow-x-hidden sm:w-44 md:w-52 lg:w-72 xl:w-100 bg-transparent' 
                    style={{lineHeight: '1.5', padding: '10px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowY: 'auto', display: 'block', boxSizing: 'border-box'}} 
                    placeholder='Type a message...'
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    onKeyDown={handleKey}
                />

                <div className='flex justify-end items-end col-start-2 text-2xl'>
                    <ul className='flex space-x-6 pr-4 '>
                        <div className='flex mobile:hidden sm:inline-flex'>
                            <li className='flex items-center '>
                                <button
                                    className='hover:text-kitsuneBlue4'
                                    type='file'
                                    onChange={(event) => setImage(event.target.files[0])}
                                >
                                    <AiOutlinePicture />
                                </button>
                            </li>
                        </div>
                        <li>
                            <button             
                                className=' bg-kitsuneBlue5 py-2 px-4 text-white hover:bg-kitsuneBlue4'
                                onClick={handleSend} >
                                Send
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default ChatInput;