import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { BiShow } from 'react-icons/bi'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getFirestore, where, collection, doc, updateDoc, setDoc  } from 'firebase/firestore';
import { db } from '../firebase';

const current = new Date().toISOString().split("T")[0] //split method will split the string to divide the date from the included tine, [0] selects for the first element (zeroth indexed), we are after the date not the time so we split it to make it useful

function Creator() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [date, setDate] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Firebase password validation

    const validatePassword = () => {
        let isValid = true;
        if(password !== '' && confirmPassword !== ''){
            if (password != confirmPassword) {
                isValid = false; 
                setError('The passwords do not match');
            }
        }
        return isValid;
    }
    const register = (event) => {
        event.preventDefault();
        setError('');
        if(validatePassword()) {
            //Creating a new user w/ email & password using firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)

                // Add user data to Firestore
                const userRef = doc(db, 'users', res.user.uid);
                const userData = {
                    email: res.user.email,
                    date: current,
                };
                setDoc(userRef, userData);

                Swal.fire({ //On successful account creation SWAL fires the confirmation
                    icon: 'success',
                    title: 'Account Created Successfully'
                  })
                
            })
            // Account is created and navigates user to landing page
            .then (navigate('/'))     
            .catch((error) => {
                switch (error.code) {
                  case 'auth/weak-password':
                    setError('Password should be at least 6 characters'); //updates firebase error message so that it displays more user friendly message
                    break;
                  case 'auth/invalid-email':
                    setError('Invalid email address'); //updates firebase message in same way but with email
                    break;
                  default:
                    setError('An error occurred, please try again later'); // If an error was to occur in the firebaseAPI this message will be used
                    break;
                }
              });
        };
        //Clears out the fields of the form after submission
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDate('');
    }

    return (
        <div className=' pt-10 w-1/2 mx-auto'>
            <div className='bg-kitsuneBlue3 rounded-lg p-6 shadow-lg mx-5 pt-5 pb-20 font-robotoSlab'>
                <div className=' bg-gray-200 rounded-md max-w-md mx-auto font-robotoSlab'>
                    {/* <h1 className='text-xl text-center py-3'>Account Creation</h1> */}
                    
                    <div className=''>
                        <form action="" className='flex justify-center items-center' onSubmit={register} name='registration form'>
                            <div className=' max-w-sm flex flex-col'>
                                <div className='py-8 '>
                                    <label className='pr-4 '>
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        className='w-full rounded-md p-2 border border-kitsuneBlue'
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
            
                                </div>
                                    <div className='py-8'>
                                        <label className='pr-4'>
                                            Password*
                                        </label>
                                        <div className='flex-row w-full relative'>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                className='w-full rounded-md p-2 border border-kitsuneBlue'
                                                value={password}
                                                required
                                                onChange={event => setPassword(event.target.value)}
                                            />
            
                                            <div>
                                                <div className='absolute right-3 top-3 cursor-pointer hover:text-kitsuneBlue2 text-xl'
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    <BiShow />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-8'>
                                        <label className='pr-4'>
                                            Confirm Password*
                                        </label>
                                        <div className='flex-row w-full relative'>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                className='w-full rounded-md p-2 border border-kitsuneBlue'
                                                value={confirmPassword}
                                                required
                                                onChange={event => setConfirmPassword(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='py-8'>
                                        <label className='pr-4'>
                                            Date of Birth*
                                        </label>
                                        <input
                                            type="date"
                                            name="birthdate"
                                            max={current}
                                            className='w-full rounded-md p-2 border border-kitsuneBlue'
                                            required
                                            value={date}
                                            onChange={event => setDate(event.target.value)}
                                        />
                                    </div>
                                <div className='flex justify-center'>
                                    <button type='submit'  className='bg-kitsuneBlue p-5 rounded-lg mb-3 hover:bg-kitsuneBlue3'>
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </form>
                        {error && <p className="text-center text-red-600 py-4 px-6 text-md">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Creator;
