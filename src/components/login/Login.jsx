import React, { useContext, useState } from 'react'
import './Login.css'
import { FirebaseContext } from '../store/Context'
import { useNavigate } from 'react-router'
function Login() {
    let [email,setEmail] = useState('')
    let [password,setPassword]=useState('')
    let [errorMessage, setErrorMessage] = useState(''); 
    let {auth,fireStore,firebaseApp} = useContext(FirebaseContext)
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        
        e.preventDefault()
        setErrorMessage('')
        if(email.trim()==="" || password.trim()===""){
            return setErrorMessage("Please fill all the fields")
        }
        try {
            await auth.signInWithEmailAndPassword(email,password)
            navigate('/')
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    setErrorMessage('Invalid email or password. Please try again.');
                    break;
                default:
                    setErrorMessage('An error occurred. Please try again later.');
                    console.error(error);
            }
        }
    }
    return (
        <div className='login'>
            <div className="login-content">

            
            <img className='login-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/OLX-Logo.png/600px-OLX-Logo.png?20160616162829" alt="" />
            {errorMessage && <span>{errorMessage}</span>}
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="email-input">
                
                <input className='email' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="password-input">
                
                <input className='password' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='login-btn' type='submit'>Login</button>
            </form>
            <button onClick={()=>navigate('/signup')}>Signup</button>
            </div>
            
            
        </div>
    );
}

export default Login