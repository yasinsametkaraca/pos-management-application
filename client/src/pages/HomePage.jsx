import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart/CartTotals";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/categories");
            const data = await res.json();
            data && setCategories(data.map(category => (
                {...category,value:category.title} //bunu yapmamızın sebebi addproductta selectte value istemesinden dolayıdır.
            )));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories()
    }, []);

   return (
      <>
         <Header></Header>
         <div className={"home h-screen px-5 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-28"}>
            <div className={"categories overflow-auto max-h-[calc(100vh_-_118px)] md:pb-5"}>
               <Categories categories={categories} setCategories={setCategories}></Categories>
            </div>
            <div className={"products flex-[8] pb-10 max-h-[calc(100vh_-_118px)]"}>
               <Products categories={categories}></Products>
            </div>
            <div className={"card-wrapper min-w-[300px] md:-mt-[21px] md:-mr-[21px] border"}>
               <CartTotals></CartTotals>
            </div>
         </div>
      </>
   );
};

export default HomePage;
