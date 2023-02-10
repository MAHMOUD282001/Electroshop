import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalQuantity : 0,
    totalAmount : 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_ITEM: (state, action)=>{
        let item = action.payload
        let existingItem = state.cartItems.find(product => product.id === item.id)
        state.totalQuantity++
        
        if(!existingItem){
            state.cartItems.push({
                id: item.id,
                quantity: 1,
                title: item.title,
                image: item.image,
                price: item.price,
                totalPrice: item.price,
            })
        }
        else{
            existingItem.quantity++
            existingItem.totalPrice = Number(existingItem.price) + Number(existingItem.totalPrice)
        }
        
        state.totalAmount = state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
        );
    },
    
    REMOVE_ITEM: (state, action)=>{
        let id = action.payload
        let existingItem = state.cartItems.find(product => product.id === id)
        state.totalQuantity--
        
        if(existingItem.quantity === 1){
           state.cartItems = state.cartItems.filter(product => product.id !== id)
        }
        else{
            existingItem.quantity--
            existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price)
        }
        
        state.totalAmount = state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
        );
    },
    
    DELETE(state, action) {
        const id = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === id);
  
        if (existingItem) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          state.totalQuantity = state.totalQuantity - existingItem.quantity;
        }
  
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
    }
  }
});

export const {ADD_ITEM, REMOVE_ITEM, DELETE} = cartSlice.actions


export const totalQuantity = (state)=> state.cart.totalQuantity
export const totalAmount = (state)=> state.cart.totalAmount
export const cartItems = (state)=> state.cart.cartItems


export default cartSlice.reducer