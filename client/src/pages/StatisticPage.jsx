import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import {message} from "antd";

const StatisticPage = () => {

   const [data, setData] = useState([]);
   const [products, setProducts] = useState([]);
   const getInvoices = async () => {
      try {
         const res = await fetch("http://localhost:8080/api/invoices");
         const resData = await res.json();
         setData(resData)
      } catch (error) {
         message.error(error)
      }
   }
   const getProducts = async () => {
      try {
         const res = await fetch("http://localhost:8080/api/products");
         const data = await res.json();
         setProducts(data);
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
      getInvoices();
      getProducts();
   }, []);

   const totalAmount = () => {
      const total = data.reduce((total,item) => item.totalAmount + total,0).toFixed(3)  //total = 0 dan başlar ve item.totalAmount ile toplanır. Yani bütün totalAmountları toplarız.
      return total + "$";
   }
   return (
      <>
         <Header></Header>
         <div className={"pb-28 md:pd-0 px-6"}>
            <h1 className={"mb-5 text-3xl font-bold text-center"}>Statistics</h1>
            <div className={"statistic-section"}>
               <h2 className={"text-lg"}>Welcome <span className={"font-bold text-blue-800"}>YSK</span></h2>
               <div className={"statistic-card grid xl:grid-cols-4 md:grid-cols-2 my-12 md:gap-10 gap-4"}>
                  <StatisticCard title={"Total Customers"} amount={data?.length} img={"img/user.png"}></StatisticCard>
                  <StatisticCard title={"Total Profit"} amount={totalAmount()} img={"img/money.png"}></StatisticCard>
                  <StatisticCard title={"Total Sale"} amount={data?.length} img={"img/sale.png"}></StatisticCard>
                  <StatisticCard title={"Total Products"} amount={localStorage.getItem("productsCount")} img={"img/product.png"}></StatisticCard>
               </div>
               <div className={"flex justify-between items-center gap-10 lg:flex-row flex-col"}>
                  <div className={"lg:w-1/2 lg:h-full h-72 md:p-20"}></div>
                  <div className={"lg:w-1/2 lg:h-full h-72 flex justify-center"}></div>
               </div>
            </div>
         </div>
      </>
   );
};
export default StatisticPage;
