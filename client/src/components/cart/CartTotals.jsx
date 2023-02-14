import React from 'react';
import { DeleteOutlined,PlusOutlined,MinusOutlined } from '@ant-design/icons';
import { Button } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductToCart} from "../../store/cartSlice";

const CartTotals = () => {
   const {cartItems} = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   return (
      <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
         <h2 className="bg-green-700 text-center py-4 text-white font-bold tracking-wide">
            Cart Summary
         </h2>
         <ul className="cart-items px-3 flex flex-col gap-y-3 py-2 overflow-y-auto">
            {
               cartItems.map((cartItem,index) => (
                   <li key={cartItem._id} className="cart-item flex justify-between">
                      <div className={"flex items-center cursor-pointer"}  onClick={() => dispatch(deleteProductToCart(cartItem))}>
                         <img src={cartItem.img} alt={cartItem.title} className={"w-16 h-16 object-cover"}/>
                         <div className={"flex flex-col ml-2"}>
                            <b>{cartItem.title}</b>
                            <span>{cartItem.price}$ x {cartItem.quantity}</span>
                         </div>
                      </div>
                      <div className={"flex items-center gap-x-2"}>
                         <Button type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<MinusOutlined/>}></Button>
                         <b>{cartItem.quantity}</b>
                         <Button type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<PlusOutlined/>}></Button>
                      </div>
                   </li>
               ))
            }
         </ul>
         <div className="cart-totals mt-auto">
            <div className="border-t border-b">
               <div className="flex justify-between p-3">
                  <b>Sub Total</b>
                  <span>28.7$</span>
               </div>
               <div className="flex justify-between p-3">
                  <b>KDV %18</b>
                  <span className="text-red-500 font-bold">+5.17$</span>
               </div>
            </div>
            <div className="border-b mt-3">
               <div className="flex justify-between p-2">
                  <b className="text-xl text-green-500">Final Total</b>
                  <span className="text-xl">33$</span>
               </div>
            </div>
            <div className="py-3 px-3">
               <Button type="primary" size="large" className="w-full">Create Order</Button>
               <Button type="primary" size="large" className="w-full mt-2 flex items-center justify-center" icon={<DeleteOutlined />} danger>Delete</Button>
            </div>
         </div>
      </div>
   );
};

export default CartTotals;
