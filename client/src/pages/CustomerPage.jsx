import React from 'react';
import Header from "../components/header/Header";
import {Table} from "antd";


const CustomerPage = () => {

   const dataSource = [
      {
         key: '1',
         name: 'Mike',
         age: 32,
         address: '10 Downing Street',
      },
      {
         key: '2',
         name: 'John',
         age: 42,
         address: '10 Downing Street',
      },
   ];
   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Age',
         dataIndex: 'age',
         key: 'age',
      },
      {
         title: 'Address',
         dataIndex: 'address',
         key: 'address',
      },
   ];
   return (
      <>
         <Header></Header>
         <div className={"px-6"}>
            <h1 className={"mb-5 text-3xl font-bold text-center"}>Customers</h1>
            <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
         </div>
      </>
   );
};

export default CustomerPage;
