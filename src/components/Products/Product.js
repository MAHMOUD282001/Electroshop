import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { ADD_ITEM } from '../../Redux/Slice/cartSlice'
import "./Product.css"

function Product({product}) {
  let {id, title, description, price, rating, stock, brand, category, images} = product
  
  let dispatch = useDispatch()
  
  let addToCart = ()=>{
    dispatch(ADD_ITEM({
      id:id,
      title: title,
      image: images[0],
      price:price,
  }))
  }
  
  let navigate = useNavigate()
  
  let showItemDetails = ()=>{
    navigate(`/${id}`)
  }
  
  return (
    <div className='card'>
        <div className='img' onClick={showItemDetails}>
            <img src={images[0]} alt = "Product Img"/>
        </div>
        
        <div className='details'>
            <p className='price'>${price}</p>
            <p className='title'>{title}</p>
            <button className='btn w-100' onClick={addToCart}>Add to Cart</button>
        </div>
    </div>
  )
}

export default Product