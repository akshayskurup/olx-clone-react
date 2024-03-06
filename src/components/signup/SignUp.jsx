

import React, { useState, useContext } from 'react';
import './SignUp.css';
import { FirebaseContext } from '../store/Context';

import { useNavigate } from 'react-router';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage,setErrorMessage] = useState('')
    const [password, setPassword] = useState('');
    const { firebaseApp, auth, firestore } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('')
        try {
            if(name.trim()==='' || email.trim()==='' || phone.trim()==='' || password.trim()===''){
                return setErrorMessage('Please fill all the fields')     
            }
            
            const result = await auth.createUserWithEmailAndPassword( email, password);
            const user = result.user
            await user.updateProfile({ displayName: name });
            
            await firestore.collection('users').add({
            id: user.uid,
            username: name,
            phone: phone
            });
            navigate('/login');
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage('The email address is already in use');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('The email address is invalid.');
                    break;
                case 'auth/weak-password':
                    setErrorMessage('The password is too weak. Please choose a stronger password.');
                    break;
                default:
                    setErrorMessage('An error occurred while signing up. Please try again later.');
                    console.error("Error during sign up:", error);
            }
        }
    };

    return (
        <div className='signup'>
            <div className="signup-content">

            
            <img className='signup-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/OLX-Logo.png/600px-OLX-Logo.png?20160616162829" alt="" />
            {errorMessage && <span>{errorMessage}</span>}
            <form onSubmit={handleSubmit}>
                <div className="username-input">
                <input type="text" className='username' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div className="email-input">
                    <input className='email' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="phone-input">    
                <input type="number" className='phone' value={phone} placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                    </div>                
                <div className="password-input">
                <input type="password" className='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='signup-btn' type='submit'>Signup</button>
            </form>
            <button onClick={()=>navigate('/login')}>Login</button>
            </div>
        </div>
    );
}

export default SignUp;
