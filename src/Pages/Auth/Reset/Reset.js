import React, { useState } from 'react'
import "./Reset.css"
import resetImg from "../../../assets/forgot.png"
import { Link } from 'react-router-dom'
import { auth } from '../../../Firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

function Reset() {
  let [email, setEmail] = useState("")
  
  
  let resetPasswords = (e)=>{
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
    .then(function() {  
      toast.success("Check Your Email for a Reset Link")
    })
    .catch(function(error) {
      toast.error(error.message)
    });
  }
  
  return (
    <section className='reset'>
        <div className='container'>
          <div className='content d-flex align-items-center justify-content-center'>
            <div className='img-content'>
                <img src={resetImg} alt = "Login Img" className='w-100 h-100'/>
            </div>
            <div className='form-content'>
                <h2>Reset Password</h2>
                <form>
                  <input type="email" placeholder='Email' required value={email} onChange = {e => setEmail(e.target.value)}/>
                  <button className='btn btn-primary' onClick={resetPasswords}>Reset Password</button>
                  <div className='register-login d-flex align-items-center justify-content-between'>
                    <p className='text-end'> <Link to = "/login">Login</Link></p>
                    <p className='text-start'> <Link to = "/register">Register</Link></p>
                  </div>
                </form>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Reset