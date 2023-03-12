import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAuth } from 'firebase/auth';


function Profile(props) {
    const [displayName, setDisplayName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const auth = getAuth(); 
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = auth.currentUser;
        if(user !== null) {
            setDisplayName(user.displayName);
            setProfileImage(user.photoURL);
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