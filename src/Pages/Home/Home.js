import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from '../../components/Products/Product';
import Slider from '../../components/Slider/Slider'

function Home() {
  let [smartPhones, setSmartPhones] = useState([])
  let [laptops, setLaptops] = useState([])
  let [fragrances, setFragrances] = useState([])
  let [skincare, setSkincare] = useState([])
  let [groceries, setGroceries] = useState([])
  let [homeDecoration, setHomeDecoration] = useState([])
  
  
  useEffect(()=>{
    axios
    .get("https://dummyjson.com/products")
    .then(function (response) {
      let products = response.data.products;
      setSmartPhones(products.filter(product=> product.category === "smartphones"))
      setLaptops(products.filter(product=> product.category === "laptops"))
      setFragrances(products.filter(product=> product.category === "fragrances"))
      setSkincare(products.filter(product=> product.category === "skincare"))
      setGroceries(products.filter(product=> product.category === "groceries"))
      setHomeDecoration(products.filter(product=> product.category === "home-decoration"))
    });
  },[])
  
  
  
  
  return (
    <>
      <Slider/>
      
      <section>
        <h2 className='text-center mb-5 mt-5'>Smart Phones</h2>
        <div className='container'>
          <div className='row'>
            {
              smartPhones.map(product =>(
                <div className='col-xl-3 col-lg-4 col-md-6'>
                  <Product product = {product}/>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      
      <section>
        <h2 className='text-center mb-5 mt-5'>Laptops</h2>
        <div className='container'>
          <div className='row'>
            {
              laptops.map(product =>(
                <div className='col-xl-3 col-lg-4 col-md-6'>
                  <Product product = {product}/>
                </div>
              ))
            }
          </div>
        </div>
        
      </section>
      
      <section>
        <h2 className='text-center mb-5 mt-5'>Fragrances</h2>
        <div className='container'>
          <div className='row'>
            {
              fragrances.map(product =>(
                <div className='col-xl-3 col-lg-4 col-md-6'>
                  <Product product = {product}/>
                </div>
              ))
            }
          </div>
        </div>
        
      </section>
      
      <section>
        <h2 className='text-center mb-5 mt-5'>Skincare</h2>
        <div className='container'>
          <div className='row'>
            {
              skincare.map(product =>(
                <div className='col-xl-3 col-lg-4 col-md-6'>
                  <Product product = {product}/>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      
      
      <section>
        <h2 className='text-center mb-5 mt-5'>Groceries</h2>
        <div className='container'>
          <div className='row'>
            {
              groceries.map(product =>(
                <div className='col-xl-3 col-lg-4 col-md-6'>
                  <Product product = {product}/>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      
      <section>
        <h2 className='text-center mb-5 mt-5'>home Decoration</h2>
        <div className='container'>
          <div className='row'>
            {
              homeDecoration.map(product =>(
                <div className='col-xl-3 col-lg-4 col-md-6'>
                  <Product product = {product}/>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    
    </>
  )
}

export default Home