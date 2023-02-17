import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import {Button, Card, message, Modal, Popconfirm, Table} from "antd";
import CreateInvoice from "../components/cart/CreateInvoice";
import PrintInvoice from "../components/invoices/PrintInvoice";
import {decrementQuantity, deleteProductToCart, incrementQuantity} from "../store/cartSlice";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";

const InvoicePage = () => {

   const [invoicesItem, setInvoicesItem] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const dispatch = useDispatch();
   const [invoicesDetail, setInvoicesDetail] = useState();

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
         title: 'Phone Number',
         dataIndex: 'customerPhoneNumber',
         key: 'customerPhoneNumber',
      },
      {
         title: 'Created At',
         dataIndex: 'createdAt',
         key: 'createdAt',
         render: (text,record) => {
            return (<span>{text.substring(0,10)}</span>)
         }
      },
      {
         title: 'Payment Method',
         dataIndex: 'paymentMode',
         key: 'paymentMode',
      },
      {
         title: 'Total Price',
         dataIndex: 'totalAmount',
         key: 'totalAmount',
         render: (text) => {
            return (<span>{(text).toFixed(2)}$</span>)
         }
      },
      {
         title: 'Actions',
         render: (value,record) => {
            return (
                <Popconfirm onConfirm={() => {
                   setIsModalOpen(true);
                   setInvoicesDetail(record)
                }}
                            title={"Print it??"}
                            okText={"Yes"} cancelText={"No"}
                >
                   <Button className={"pl-0"} type={"link"}>
                      Print
                   </Button>
                </Popconfirm>
            )
         }
      },
   ];

   return (
      <>
         <Header></Header>
         <div className={"px-6"}>
            <h1 className={"mb-5 text-3xl font-bold text-center"}>Invoices</h1>
            <Table dataSource={invoicesItem} columns={columns} bordered pagination={false} scroll={{x:1200, y:300}}/>
         </div>
         <PrintInvoice invoicesDetail={invoicesDetail} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}></PrintInvoice>
      </>
   );
};

export default InvoicePage;
