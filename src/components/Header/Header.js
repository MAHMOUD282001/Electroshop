import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBarsStaggered,faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER, selectIsLoggedIn, SET_ACTIVE_USER } from "../../Redux/Slice/authSlice";
import { totalQuantity } from "../../Redux/Slice/cartSlice";


const Header = () => {
  
  let [displayName, setDisplayName] = useState("")
  
  let navigate = useNavigate()
  
  const dispatch = useDispatch()
  
  const isLoggedIn = useSelector(selectIsLoggedIn)
  
  let quantity = useSelector(totalQuantity)
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        console.log(user)
        
        if(user.displayName === null){
          let index = user.email.indexOf('@')
          let u = user.email.slice(0, index) 
          let uName = u.charAt(0).toUpperCase() + u.slice(1)
          console.log(uName)
          setDisplayName(uName)
        }
        else{
          setDisplayName(user.displayName)
        }
        
        
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userId: user.uid,
      }))
      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  },[dispatch, displayName])
  
  
  let logoutUser = ()=>{
    signOut(auth).then(() => {
      toast.success("Logout Successfully")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  
  let menuRef = useRef()
  
  let menuToggle = ()=> menuRef.current.classList.toggle("active")
  
  let headerRef = useRef()
  
  useEffect(()=>{
    
    window.addEventListener("scroll", ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add("header__shrink")
      }
      
      else{
        headerRef.current.classList.remove("header__shrink")
      }
    })
  },[headerRef])
  
  return (
    <header ref={headerRef}>
        <div className="container">
          <div className="logo">
            <NavLink to="/Electroshop"><h2><span>Electro</span>shop<span>.</span></h2></NavLink>
          </div>
          
          <nav ref = {menuRef} onClick = {menuToggle}>
            <div className="menu">
            <div className="logo">
              <NavLink to="/Electroshop"><h2><span>Electro</span>shop<span>.</span></h2></NavLink>
            </div>
            <ul>
              <li>
                <NavLink to="/Electroshop" className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/products" className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Products</NavLink>
              </li>
            </ul>
            
            <div className="header-right">
              <NavLink to="">{displayName ? "Hi, " + displayName : "Hi, Guest"}</NavLink>
              {
                isLoggedIn === false ? <NavLink to="/login" className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Login</NavLink> : ""
              }
              
              {
                isLoggedIn === false ? <NavLink to="/register" className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Register</NavLink> : ""
              }
              
              {
                isLoggedIn ? <NavLink to="/checkout" className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>Checkout</NavLink> : ""
              }
              {
                isLoggedIn ? <NavLink to="/" onClick={logoutUser}>Logout</NavLink> : ""
              }
              <NavLink to= "/cart"><FontAwesomeIcon icon={faCartShopping}/>{quantity}</NavLink>
            </div>
            </div>
          </nav>
          
          <div className="menu-icon" onClick = {menuToggle}>
            <div><FontAwesomeIcon icon={faBarsStaggered}/></div>
          </div>
        </div>
    </header>
  );
};

export default Header;
