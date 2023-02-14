import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addProductToCart} from "../../store/cartSlice";


const ProductItem = ({product}) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)

    const handleCart = () => {
        dispatch(addProductToCart({...product,quantity: 1}))
    }

    return (
        <div onClick={handleCart} className={"product-item border hover:shadow-lg transition-shadow cursor-pointer"}>
            <div className={"product-img"}>
                <img className={"h-32 object-fill w-full border-b"} src={product.img} alt={product.title} />
            </div>
            <div className={"product-info flex flex-col p-3 flex justify-center items-center"}>
                <span className={"font-bold"}>{product.title}</span>
                <span>{product.price}$</span>
            </div>
        </div>
    );
};


export default ProductItem;
