import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total: 0,
        tax: 18
    },
    reducers:{
        addProductToCart: (state,action) => {   //cartItem zaten sepetteyse quantity değerini arttırır.
            state.total += action.payload.price;
            const findCartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            if(findCartItem){
                findCartItem.quantity = findCartItem.quantity + 1;        //bulduğu itemin quantity değerini bir arttırır.
            }else{
                state.cartItems.push(action.payload);
            }
        },
        deleteProductToCart: (state,action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id) //üstüne tıklanan itemi silicez.
            state.total -= action.payload.price * action.payload.quantity;
        },
        incrementQuantity: (state,action) => {
            const findCartItem = state.cartItems.find(
                (item) => item._id === action.payload._id);
            findCartItem.quantity += 1;
            state.total += findCartItem.price;
        },
        decrementQuantity: (state,action) => {
            const findCartItem = state.cartItems.find(
                (item) => item._id === action.payload._id);
            if(findCartItem.quantity > 1){
                findCartItem.quantity -= 1;
                state.total -= findCartItem.price;
            }else{
                state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id)
                state.total -= findCartItem.price;
            }
        },
        resetCart: (state,action) => {
            state.cartItems = [];
            state.total = 0
        }
    }
})
export const {addProductToCart,deleteProductToCart,incrementQuantity,decrementQuantity,resetCart} = cartSlice.actions
export default cartSlice.reducer