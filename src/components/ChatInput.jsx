import React, { useContext, useEffect, useState } from 'react';
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
    const [previewImage, setPreviewImage] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatsContext);

    useEffect(() => {
        if(image) {
            const read = new FileReader()
            read.onload = (event) => {
                setPreviewImage(event.target.result)
            };
            read.readAsDataURL(image);
        } else {
            setPreviewImage(null)
        }
    }, [image]);

    const handleSend = async () => {
        if(!text.trim() && !image) return;

        if(image) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef,  image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + uploadProgress + '% done')
                },
                (error) => {
                    console.error(error)
                },
                async () => {
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
                        setImage(null);
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
            <div className='bg-white w-full h-28 items-center pl-4 flex justify-between'>
                <textarea 
                    className=' w-full resize-none h-20 my-auto text-xl pl-2 focus:outline-none overflow-y-auto  sm:w-44 md:w-52 lg:w-72 xl:w-100 bg-transparent mobile:placeholder:text-sm md:placeholder:text-xl mobile:text-xs sm:text-sm md:text-xl' 
                    style={{lineHeight: '1.5', padding: '10px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowY: 'auto', display: 'block', boxSizing: 'border-box'}} 
                    placeholder='Chat...'
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    onKeyDown={handleKey}
                />
                {previewImage && 
                <div className='relative'>
                    <img
                        src={previewImage}
                        alt='Image Upload Preview'
                        style={{ width: '75px', height: '75px', objectFit: 'cover', }}
                        className=''
                    />
                    <button
                        className='absolute -top-3 -left-5 text-lg rounded-full py-1 px-3 bg-red-600 text-white mobile:text-xs'
                        onClick={() => {
                            setImage(null);
                            setPreviewImage(null);
                        }}
                    >
                        X
                    </button>
                </div>
                }

                <div className='flex justify-end items-end col-start-2 text-2xl'>
                    <div className='flex space-x-2 pr-4 '>
                        <div className='flex  sm:inline-flex'>
                            <div className='flex items-center  '>
                                <input
                                    id='imageUpload'
                                    className=''
                                    type='file'
                                    onChange={(event) => setImage(event.target.files[0])}
                                    accept='image/*'
                                    style={{display: 'none'}}
                                >
                                </input>
                                    <label
                                        className='hover:text-kitsuneBlue4 hover:cursor-pointer' 
                                        htmlFor="imageUpload"
                                    > 
                                        <AiOutlinePicture />
                                    </label>
                            </div>
                        </div>
                        <div>
                            <button             
                                className=' bg-kitsuneBlue5 py-2 px-4 text-white hover:bg-kitsuneBlue4 mobile:text-sm sm:text-lg'
                                onClick={handleSend} >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChatInput;