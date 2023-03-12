import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAuth } from 'firebase/auth';
import { getDoc, getFirestore, doc } from 'firebase/firestore';
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
            <button onClick={() => navigate('/updateProfile')}>
                Update my Profile information
            </button>
            <h1>Display Name : {displayName}</h1>
            <img src={profileImage} alt=""  style={{height: 450}}/>
        </div>
    );
}

export default Profile;