import React, {useState} from 'react';
import Header from "../components/header/Header";
import {Button, Card, Modal, Table} from "antd";
import CreateInvoice from "../components/cart/CreateInvoice";
import PrintInvoice from "../components/invoices/PrintInvoice";

const InvoicePage = () => {

   const [isModalOpen, setIsModalOpen] = useState(false);

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
            <h1 className={"mb-5 text-3xl font-bold text-center"}>Invoices</h1>
            <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
            <div className={"cart-total flex justify-end mt-5"}>
               <Card className={"w-72"}>
                  <Button onClick={() => {setIsModalOpen(true)}} size={"large"} type={"primary"} className={"w-full mt-2"}>Print</Button>
               </Card>
            </div>
         </div>
         <PrintInvoice setIsModalOpen={setIsModalOpen}  isModalOpen={isModalOpen}></PrintInvoice>
      </>
   );
};

export default InvoicePage;
