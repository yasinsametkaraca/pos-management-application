import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import {message, Table} from "antd";

const CustomerPage = () => {

   const [invoicesItem, setInvoicesItem] = useState([]);
   const getInvoices = async () => {
      try {
         const res = await fetch("http://localhost:8080/api/invoices");
         const data = await res.json();
         setInvoicesItem(data);
      } catch (error) {
         message.error(error)
      }
   }
   useEffect(() => {
      getInvoices();
   }, []);

   const columns = [
      {
         title: 'Customer Name',
         dataIndex: 'customerName',
         key: 'customerName',
      },
      {
         title: 'Phone number',
         dataIndex: 'customerPhoneNumber',
         key: 'customerPhoneNumber',
      },
      {
         title: 'Created At',
         dataIndex: 'createdAt',
         key: 'createdAt',
         render: (text) => {
            return <span>{text.substring(0,10)}</span>
         }
      },
   ];
   return (
      <>
         <Header></Header>
         <div className={"px-6"}>
            <h1 className={"mb-5 text-3xl font-bold text-center"}>Customers</h1>
            <Table dataSource={invoicesItem} columns={columns} bordered pagination={false} scroll={{x:1200,y:300}}/>
         </div>
      </>
   );
};

export default CustomerPage;
