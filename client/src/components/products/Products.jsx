import React, {useState} from 'react';
import ProductItem from "./ProductItem";
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import AddProduct from "./AddProduct";
import {useNavigate} from "react-router";

const Products = ({products,setProducts,categories,filteredProducts,searchProduct}) => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const navigate = useNavigate();

    if (products.length===0){
        return (
            <div>Products could not be loaded. Please try again later.</div>
        )
    }
    return (
      <div className={"products-wrapper grid gap-4 grid-cols-card"} style={{gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))"}}>
          {filteredProducts.filter((item) => item.title.toLowerCase().includes(searchProduct)).map((product) => (
              <ProductItem key={product._id} product={product}></ProductItem>
          ))}
          <div onClick={() => setIsAddModalOpen(true)} className={"product-item flex justify-center items-center md:min-h-[190px] min-h-[50px] border hover:shadow-lg transition-shadow cursor-pointer hover:opacity-80 bg-green-800"}>
              <PlusCircleOutlined className={"md:text-2xl text-white"}></PlusCircleOutlined>
          </div>
          <div onClick={() => navigate("/products")} className={"product-item flex justify-center items-center md:min-h-[190px]  min-h-[50px] border hover:shadow-lg transition-shadow cursor-pointer hover:opacity-80 bg-purple-700 "}>
              <EditOutlined className={"md:text-2xl text-white"}></EditOutlined>
          </div>
          <AddProduct categories={categories} setProducts={setProducts} products={products} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}></AddProduct>
      </div>
   );
};

export default Products;
