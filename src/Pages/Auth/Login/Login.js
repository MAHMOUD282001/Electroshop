import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import loginImg from "../../../assets/login.png"
import { auth } from '../../../Firebase/config'
import "./Login.css"

function Login() {
  
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  
  
  
  let loginUser = (e)=>{
    e.preventDefault()
    setIsLoading(true)
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setIsLoading(false)
      toast.success("Login Successfully")
      navigate("/")
    })
    .catch((error) => {
      setIsLoading(false)
      toast.error(error.message)
    });
  }
  
  //Sign In With Google
  
  const provider = new GoogleAuthProvider();
  
  let signInWithGoogle = (e)=>{
    e.preventDefault()
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      toast.success("Login Successfully")
      navigate("/")
      
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  
  return (
    <section className='login'>
        <div className='container'>
          <div className='content d-flex align-items-center justify-content-center'>
            <div className='img-content'>
                <img src={loginImg} alt = "Login Img" className='w-100 h-100'/>
            </div>
              
            <div className='form-content'>
                <h2>Login</h2>
                <form>
                  <input type="text" placeholder='Email' required value={email} onChange = {e => setEmail(e.target.value)}/>
                  <input type="password" placeholder='Password' required value={password} onChange = {e => setPassword(e.target.value)}/>
                  <button className='btn btn-primary' onClick={loginUser}>Login</button>
                  <Link to="/reset">Forget Password</Link>
                  <p className='text-center mt-4'>--Or--</p>
                  <button className='btn login-google' onClick={signInWithGoogle}>Login With Google</button>
                  <p className='text-center mt-4'>Don't Have an Account? <Link to = "/register">Register</Link></p>
                  
                </form>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Login