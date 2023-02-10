import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { ADD_ITEM } from '../../Redux/Slice/cartSlice';
import Product from './Product';
import "./Product.css"

function ProductDetails() {
  
  let [product, setProduct] = useState({})
  
  let [likedProducts, setLikedProducts] = useState([])
  
  let [img, setImg] = useState('')
  
  
  let {id} = useParams()
  
  useEffect(()=>{
    axios
    .get(`https://dummyjson.com/products/${id}`)
    .then(function (response) {
      let product = response.data;
      setImg(product.images[0])
      console.log(product)
      setProduct(product)
      
    });
  },[id])
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[id])
  
  useEffect(()=>{
    axios
    .get("https://dummyjson.com/products")
    .then(function (response) {
      let products = response.data.products;
      setLikedProducts(products.filter(item=> item.category === product.category))
    });
  })
  
  let dispatch = useDispatch()
  
  let addToCart = ()=>{
    dispatch(ADD_ITEM({
      id:id,
      title: product.title,
      image: product.images[0],
      price: product.price,
  }))
  }
  
  
  return (
    <>
    <section>
        <div className='container'>
            <h3 className='mb-5'>{product.title}</h3>
            
            <div className='row d-flex align-items-center justify-content-center'>
                <div className='col-md-6'>
                  <div className='details-img text-center'>
                    <img src={img} alt = "Product"/>
                  </div>
                </div>
                
                <div className='col-md-6 mt-5'>
                  <div className='details-product'>
                    <p>Name: <span>{product.title}</span></p>
                    <p>Description: <span>{product.description}</span></p>
                    <p>Category: <span>{product.category}</span></p>
                    <p>Price: <span>${product.price}</span></p>
                    <p>Stock: <span>{product.stock}</span></p>
                    <button className='btn w-100' onClick={addToCart}>Add to Cart</button>
                  </div>
                </div>
            </div>
        </div>
    </section>
    
    <section>
      <div className='container'>
        <h2 className='mb-5'>You Also May Like</h2>
        
        <div className='row'>
            {
              likedProducts.map(product =>(
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

export default ProductDetails