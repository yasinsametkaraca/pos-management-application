import React from 'react';
import { DeleteOutlined,PlusOutlined,MinusOutlined } from '@ant-design/icons';
import {Button, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductToCart,incrementQuantity,decrementQuantity,resetCart} from "../../store/cartSlice";
import {useNavigate} from "react-router";

const CartTotals = () => {
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   return (
      <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
         <h2 className="bg-green-700 text-center py-4 text-white font-bold tracking-wide">
            Cart Summary
         </h2>
         <ul className="cart-items px-3 flex flex-col gap-y-3 py-2 overflow-y-auto">
            {cart.cartItems.length > 0 ?
               cart.cartItems.map((cartItem) => (
                   <li key={cartItem._id} className="cart-item flex justify-between">
                      <div className={"flex items-center cursor-pointer"}  onClick={() => dispatch(deleteProductToCart(cartItem))}>
                         <img src={cartItem.img} alt={cartItem.title} className={"w-16 h-16 object-cover"}/>
                         <div className={"flex flex-col ml-2"}>
                            <b>{cartItem.title}</b>
                            <span>{cartItem.price}$ x {cartItem.quantity}</span>
                         </div>
                      </div>
                      <div className={"flex items-center gap-x-2"}>
                         <Button onClick={() => dispatch(decrementQuantity(cartItem)) } type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<MinusOutlined/>}></Button>
                         <b>{cartItem.quantity}</b>
                         <Button onClick={() => dispatch(incrementQuantity(cartItem))} type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<PlusOutlined/>}></Button>
                      </div>
                   </li>
               )): <p>There are no items in your cart.</p>
            }
         </ul>
         <div className="cart-totals mt-auto">
            <div className="border-t border-b">
               <div className="flex justify-between p-3">
                  <b>Sub Total</b>
                  <span>{(cart.total).toFixed(1)}$</span>
               </div>
               <div className="flex justify-between p-3">
                  <b>Tax %{cart.tax}</b>
                  <span className="text-red-500 font-bold">+{((cart.total*cart.tax)/100).toFixed(1)}$</span>
               </div>
            </div>
            <div className="border-b mt-3">
               <div className="flex justify-between p-2">
                  <b className="text-xl text-green-500">Total</b>
                  <span className="text-xl">{(cart.total+((cart.total*cart.tax)/100)).toFixed(1)}$</span>
               </div>
            </div>
            <div className="py-3 px-3">
               <Button onClick={() => navigate("/cart")} disabled={cart.cartItems.length === 0} type="primary" size="large" className="w-full">Create Order</Button>
               <Button onClick={()=> {
                  if(window.confirm("Are you sure you want to reset the cart?")){
                     dispatch(resetCart());
                     message.success("Your cart has been reset.");
                  }
               }} disabled={cart.cartItems.length === 0} type="primary" size="large" className="w-full mt-2 flex items-center justify-center" icon={<DeleteOutlined />} danger>Delete</Button>
            </div>
         </div>
      </div>
   );
};

export default CartTotals;
