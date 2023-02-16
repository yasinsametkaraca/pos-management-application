import React, {useState} from 'react';
import Header from "../components/header/Header";
import {Button, Card, message, Popconfirm, Table} from "antd";
import CreateInvoice from "../components/cart/CreateInvoice";
import {useDispatch, useSelector} from "react-redux";
import {decrementQuantity, deleteProductToCart, incrementQuantity} from "../store/cartSlice";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const CartPage = () => {

   const [isModalOpen, setIsModalOpen] = useState(false);

   const cart = useSelector(state => state.cart);
   const dispatch = useDispatch();

   const columns = [
      {
         title: 'Product Image',
         dataIndex: 'img',
         key: 'img',
         width:"130px",
         render: (value) => {
            return ( <img className={"w-full h-20 object-fill"} src={value} alt={value}/>)
         }
      },
      {
         title: 'Product Name',
         dataIndex: 'title',
         key: 'title',
      },
      {
         title: 'Category',
         dataIndex: 'category',
         key: 'category',
      },
      {
         title: 'Product Price',
         dataIndex: 'price',
         key: 'price',
         render: (value) => {
            return (<span>{value.toFixed(1)}$</span>)
         }
      },
      {
         title: 'Product Quantity',
         dataIndex: 'quantity',
         key: 'quantity',
         render: (value,record) => {
            return (
            <div className={"flex items-center gap-x-2"}>
               <Button onClick={() => {
                  if (record.quantity === 1) {
                     if (window.confirm("Delete Product?")) {
                        dispatch(decrementQuantity(record))
                        message.success("The product has been deleted from the cart.");
                     }
                  }
                  if (record.quantity > 1) {
                     dispatch(decrementQuantity(record))
                  }}} type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<MinusOutlined/>}>
               </Button>
               <b>{record.quantity}</b>
               <Button onClick={() => dispatch(incrementQuantity(record))} type="primary" size="small" className="w-full flex items-center justify-center !rounded-full" icon={<PlusOutlined/>}></Button>
            </div>)
         }
      },
      {
         title: 'Total Price',
         render: (_,record) => {
            return (<span>{(record.quantity*record.price).toFixed(2)}$</span>)
         }
      },
      {
         title: 'Actions',
         render: (value,record) => {
            return (
                <Popconfirm onConfirm={() => {
                   dispatch(deleteProductToCart(record));
                   message.success("The product has been deleted from the cart.")
                }}
                   title={"Delete Product?"}
                   okText={"Yes"} cancelText={"No"}
                >
                   <Button className={"pl-0"} type={"link"} danger>
                      Delete
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
            <Table dataSource={cart.cartItems} columns={columns} bordered pagination={false} scroll={{x:1500,y:450}} />
            <div className={"cart-total flex justify-end mt-5"}>
               <Card title="Cart Summary" className={"w-72"}>
                  <div className={"flex justify-between mb-2"}>
                     <span>Sub Total</span>
                     <span>{(cart.total).toFixed(3)}$</span>
                  </div>
                  <div className={"flex justify-between mb-2"}>
                     <span>Tax %{cart.tax}</span>
                     <span className={"text-red-500"}>+{((cart.total*cart.tax)/100).toFixed(3)}$</span>
                  </div>
                  <div className={"flex justify-between mb-2"}>
                     <b>Total</b>
                     <b>{(cart.total+((cart.total*cart.tax)/100)).toFixed(3)}$</b>
                  </div>
                  <Button disabled={cart.cartItems.length === 0 } onClick={() => {setIsModalOpen(true)}} size={"large"} type={"primary"} className={"w-full mt-2"}>Create Order</Button>
               </Card>
            </div>
         </div>
         <CreateInvoice setIsModalOpen={setIsModalOpen}  isModalOpen={isModalOpen}></CreateInvoice>
      </>
   );
};
export default CartPage;
