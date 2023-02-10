import React from 'react';

const StatisticCard = ({title,amount,img}) => {
   return (
      <div className={"card-item bg-gray-900 p-7 rounded-lg"}>
         <div className={"flex gap-x-4"}>
            <div className={"rounded-full bg-gray-200 w-16 h-16 p-3"}>
               <img src={img} alt={"user"}/>
            </div>
            <div className={"text-white"}>
               <p className={"text-lg mb-2 text-gray-500"}>{title}</p>
               <p className={"text-xl font-medium text-gray-300"}>{amount}</p>
            </div>
         </div>
      </div>
   );
};

export default StatisticCard;
