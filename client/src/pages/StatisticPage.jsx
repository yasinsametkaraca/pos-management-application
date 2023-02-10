import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import {Area, Pie} from "@ant-design/charts";

const StatisticPage = () => {

   const [data, setData] = useState([]);

   useEffect(() => {
      asyncFetch();
   }, []);

   const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
         .then((response) => response.json())
         .then((json) => setData(json))
         .catch((error) => {
            console.log('fetch data failed', error);
         });
   };
   const dataPie = [
      {
         type: '分类一',
         value: 27,
      },
      {
         type: '分类二',
         value: 25,
      },
      {
         type: '分类三',
         value: 18,
      },
      {
         type: '分类四',
         value: 15,
      },
      {
         type: '分类五',
         value: 10,
      },
      {
         type: '其他',
         value: 5,
      },
   ];

   const config = {
      data,
      xField: 'Date',
      yField: 'scales',
      xAxis: {
         range: [0, 1],
         tickCount: 5,
      },
      areaStyle: () => {
         return {
            fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
         };
      },
   };
   const configPie = {
      appendPadding: 10,
      data:dataPie,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
         type: 'inner',
         offset: '-50%',
         content: '{value}',
         style: {
            textAlign: 'center',
            fontSize: 14,
         },
      },
      interactions: [
         {
            type: 'element-selected',
         },
         {
            type: 'element-active',
         },
      ],
      statistic: {
         title: false,
         content: {
            style: {
               whiteSpace: 'pre-wrap',
               overflow: 'hidden',
               textOverflow: 'ellipsis',
            },
            content: 'AntV\nG2Plot',
         },
      },
   };

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
                  <div className={"lg:w-1/2 lg:h-full h-72 md:p-20"}><Area {...config} /></div>
                  <div className={"lg:w-1/2 lg:h-full h-72 flex justify-center"}><Pie {...configPie} /></div>
               </div>
            </div>
         </div>
      </>
   );
};
export default StatisticPage;
