import React from 'react';
import Header from "../components/header/Header";
import EditProduct from "../components/products/EditProduct";

const ProductPage = () => {

    return (
        <>
            <Header></Header>
            <div className={"px-7"}>
                <h1 className={"font-bold mb-6 text-3xl text-center"}>Products</h1>
                <EditProduct></EditProduct>
            </div>
        </>
    );
};

export default ProductPage;
