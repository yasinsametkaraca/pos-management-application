import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total: 0
    },
    reducers:{
        addProductToCart: (state,action) => {   //cartItem zaten sepetteyse quantity değerini arttırır.
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
        }
    }
})
export const {addProductToCart,deleteProductToCart} = cartSlice.actions
export default cartSlice.reducer