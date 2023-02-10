import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Navigate, Route, Routes } from 'react-router';
import Home from "./Pages/Home/Home"
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import Reset from './Pages/Auth/Reset/Reset';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './Pages/Cart/Cart';
import Products from './components/Products/Products';
import Checkout from './Pages/Checkout/Checkout';

function App() {
  return (
    <>
      <Header/>
          <Routes>
            {/* <Route path="/" element = {Navigate("/Electroshop")}/> */}
            <Route path="/Electroshop" element = {<Home/>}/>
            <Route path="/cart" element = {<Cart/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/checkout" element = {<Checkout/>}/>
            <Route path="/register" element = {<Register/>}/>
            <Route path="/reset" element = {<Reset/>}/>
            <Route path="/products" element = {<Products/>}/>
            <Route path="/:id" element = {<ProductDetails/>}/>
            
            
          </Routes>
      <Footer/>
    </>
  );
}

export default App;
