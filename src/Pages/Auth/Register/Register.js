import React, { useState } from 'react'
import "./Register.css"
import registerImg from "../../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../../Firebase/config"

function Register() {
  
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [cPassword, setCPassword] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  
  
  
  let registerUser = (e)=>{
    e.preventDefault();
    
    if(password !== cPassword){
      toast.error("Passwords Doesn't Match")
    }
    setIsLoading(true)
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      setIsLoading(false)
      toast.success("Registeration Successfully")
      navigate("/")
    })
    .catch((error) => {
      toast.error(error.message)
      setIsLoading(false)
    });
  }
  
  return (
    <section className='register'>
        <div className='container'>
          <div className='content d-flex align-items-center justify-content-center'>
            <div className='form-content'>
                <h2>Login</h2>
                <form onSubmit={registerUser}>
                  <input type="text" placeholder='Email' required value={email} onChange = {e => setEmail(e.target.value)}/>
                  <input type="password" placeholder='Password' required value={password} onChange = {e => setPassword(e.target.value)}/>
                  <input type="password" placeholder='Conferm Password' required value={cPassword} onChange = {e => setCPassword(e.target.value)}/>
                  <button type='submit' className='btn btn-primary'>Register</button>
                  <p className='text-center mt-4'>Already Have an Account? <Link to = "/login">Login</Link></p>
                </form>
            </div>
            
            <div className='img-content'>
                <img src={registerImg} alt = "Login Img" className='w-100 h-100'/>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Register