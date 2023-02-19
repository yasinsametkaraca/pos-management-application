import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart/CartTotals";
import {Spin} from "antd";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState("");

    const getCategories = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories");
            const data = await res.json();
            data && setCategories(data.map(category => (
                {...category,value:category.title} //bunu yapmamızın sebebi addproductta selectte value istemesinden dolayıdır.
            )));
        } catch (error) {
            console.log(error);
        }
    };
    const getProducts = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products");
            const data = await res.json();
            setProducts(data);
            localStorage.setItem("productsCount",data.length);
        } catch (error) {
            return (
                <div>
                    <p>Products could not be loaded.</p>
                    <p>{error}</p>
                </div>
            )
        }
    };
    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

   return (
      <>
         <Header setSearchProduct={setSearchProduct} ></Header>
          {(products.length > 0 && categories.length > 0) ? (
              <div className={"home px-5 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-28"}>
                  <div className={"categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-5"}>
                      <Categories categories={categories} setCategories={setCategories} products={products} setFilteredProducts={setFilteredProducts}></Categories>
                  </div>
                  <div className={"products flex-[8] pb-10 max-h-[calc(100vh_-_112px)] min-h-[500px] overflow-y-auto"}>  {/*overflow-y-auto ile scroll çıkmasını sağladım.*/}
                      <Products products={products} setProducts={setProducts} filteredProducts={filteredProducts} categories={categories} searchProduct={searchProduct}></Products>
                  </div>
                  <div className={"card-wrapper min-w-[300px] md:-mt-[21px] md:-mr-[21px] border"}>
                      <CartTotals></CartTotals>
                  </div>
              </div>
          ) : <Spin className={"flex justify-center items-center h-screen w-screen"} size={"large"}/>}
      </>
   );
};

export default HomePage;
