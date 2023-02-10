import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducer from "./Slice/authSlice"
import cartSlice from "./Slice/cartSlice"


const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartSlice
})

const store = configureStore({
    reducer : rootReducer
})

export default store