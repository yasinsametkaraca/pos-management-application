import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";

const StatisticPage = () => {

   return (
      <>
         <Header></Header>
         <div className={"pb-28 md:pd-0 px-6"}>
            <h1 className={"mb-5 text-3xl font-bold text-center"}>Statistics</h1>
            <div className={"statistic-section"}>
               <h2 className={"text-lg"}>Welcome <span className={"font-bold text-blue-800"}>YSK</span></h2>
               <div className={"statistic-card grid xl:grid-cols-4 md:grid-cols-2 my-12 md:gap-10 gap-4"}>
                  <StatisticCard title={"Total Customers"} amount={"7"} img={"img/user.png"}></StatisticCard>
                  <StatisticCard title={"Total Profit"} amount={"5005161"} img={"img/money.png"}></StatisticCard>
                  <StatisticCard title={"Total Sale"} amount={"32"} img={"img/sale.png"}></StatisticCard>
                  <StatisticCard title={"Total Products"} amount={"631"} img={"img/product.png"}></StatisticCard>
               </div>
               <div className={"flex justify-between items-center gap-10 lg:flex-row flex-col"}>
                  <div className={"lg:w-1/2 lg:h-full h-72 md:p-20"}>Chart 1 </div>
                  <div className={"lg:w-1/2 lg:h-full h-72 flex justify-center"}>Chart 2</div>
               </div>
            </div>
         </div>
      </>
   );
};
export default StatisticPage;
