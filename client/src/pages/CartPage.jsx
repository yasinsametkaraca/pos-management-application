import React, {useState} from 'react';
import Header from "../components/header/Header";
import {Button, Card, Modal, Table} from "antd";
import CreateInvoice from "../components/cart/CreateInvoice";

const CartPage = () => {

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
            <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
            <div className={"cart-total flex justify-end mt-5 justif"}>
               <Card title="Cart Summary" className={"w-72"}>
                  <div className={"flex justify-between mb-2"}>
                     <span>Sub Total</span>
                     <span>100$</span>
                  </div>
                  <div className={"flex justify-between mb-2"}>
                     <span>Tax</span>
                     <span className={"text-red-500"}>+12$</span>
                  </div>
                  <div className={"flex justify-between mb-2"}>
                     <b>Total</b>
                     <b>112$</b>
                  </div>
                  <Button onClick={() => {setIsModalOpen(true)}} size={"large"} type={"primary"} className={"w-full mt-2"}>Create Order</Button>
               </Card>
            </div>
         </div>
         <CreateInvoice setIsModalOpen={setIsModalOpen}  isModalOpen={isModalOpen}></CreateInvoice>
      </>
   );
};
export default CartPage;
