import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { totalAmount } from '../../Redux/Slice/cartSlice'
import "./Checkout.css"

function Checkout() {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [country, setCountry] = useState("")
    let [city, setCity] = useState("")
    let [postalCode, setPostalCode] = useState("")
    
    
    let cartTotalAmount = useSelector(totalAmount)
    
    let shippingCost = 30
    
    let total = cartTotalAmount + Number(shippingCost)
    
    let submitHandler = (e)=>{
      e.preventDefault()
    }
  
  return (
    <section className='checkout'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-md-6'>
              <h4 className='mb-4'>Shipping Address</h4>
              
              <form className='checkout-form' onSubmit={submitHandler}>
                <div className='form-group'>
                  <input type="text" placeholder='Enter Your Name' required onChange={e=> setName(e.target.value)}/>
                </div>
                
                <div className='form-group'>
                  <input type="email" placeholder='Enter Your Email' required onChange={e=> setEmail(e.target.value)}/>
                </div>
                
                <div className='form-group'>
                  <input type="number" placeholder='Enter Your Phone Number' required onChange={e=> setPhone(e.target.value)}/>
                </div>
                
                <div className='form-group'>
                  <input type="text" placeholder='Enter Your Country' required onChange={e=> setCountry(e.target.value)}/>
                </div>
                
                <div className='form-group'>
                  <input type="text" placeholder='Enter Your City' required onChange={e=> setCity(e.target.value)}/>
                </div>
                
                <div className='form-group'>
                  <input type="number" placeholder='Enter Your Postal Code' required onChange={e=> setPostalCode(e.target.value)}/>
                </div>
                
                <button type='submit' className='btn mt-4'>Confirm</button>
                
              </form>
            </div>
            
            
            <div className='col-lg-4 col-md-6'>
              <div className='checkout-bill'>
                <h5 className='d-flex align-items-center justify-content-between mb-3'>Subtotal: <span>${cartTotalAmount}</span></h5>
                
                <h5 className='d-flex align-items-center justify-content-between mb-3'>Shipping: <span>${shippingCost}</span></h5>
                
                <div className='checkout-total'>
                  <h4 className='d-flex align-items-center justify-content-between'>Total: <span>${total}</span></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Checkout