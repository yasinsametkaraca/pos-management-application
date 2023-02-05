import React from 'react';
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart/CartTotals";

const HomePage = () => {

   return (
      <>
         <Header></Header>
         <div className={"home px-5 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-28"}>
            <div className={"categories overflow-auto max-h-[calc(100vh_-_118px)] md:pb-5"}>
               <Categories></Categories>
            </div>
            <div className={"products flex-[8] overflow-auto pb-10 max-h-[calc(100vh_-_118px)]"}>
               <Products></Products>
            </div>
            <div className={"card-wrapper min-w-[300px] md:-mt-[21px] md:-mr-[21px] border"}>
               <CartTotals></CartTotals>
            </div>
         </div>
      </>
   );
};

export default HomePage;
