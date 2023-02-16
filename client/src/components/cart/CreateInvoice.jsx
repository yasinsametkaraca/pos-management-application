import React from 'react';
import {Button, Card, Form, Input, message, Modal, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductToCart, resetCart} from "../../store/cartSlice";
import {useNavigate} from "react-router";

const CreateInvoice = (props) => {

   const cart = useSelector(state => state.cart);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const onFinish = async (values) => {
      try {
         const res = await fetch("http://localhost:8080/api/invoices", {
            method: "POST",
            body: JSON.stringify({
               ...values,
               cartItems: cart.cartItems,
               subTotal: cart.total,
               tax: ((cart.total * cart.tax) / 100).toFixed(2),
               totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
         });
         if (res.status === 200) {
            message.success("The invoice was created successfully.");
            dispatch(resetCart());
            navigate("/invoices");
         }else {
            message.danger("You created the invoice incorrectly.");
         }
      } catch (error) {
         message.danger("Something wrong.");
      }
   };

   return (
      <Modal title="Create Invoice" footer={false} open={props.isModalOpen} onCancel={() => props.setIsModalOpen(false)}>
         <Form layout={"vertical"} onFinish={onFinish}>
            <Form.Item
               label="CustomerName"
               name={"customerName"}
               rules={[{required: true, message: "Username is required",}]}>
               <Input placeholder="Enter a customer name..." maxLength={40}/>
            </Form.Item>
            <Form.Item
               rules={[{ required: true, message: "Phone number is required" }]}
               name={"customerPhoneNumber"}
               label="Tel No"
            >
               <Input placeholder="Enter a phone number..." maxLength={11} />
            </Form.Item>
            <Form.Item
               label="Payment Method"
               rules={[{ required: true, message: "Payment Method is required" }]}
               name={"paymentMode"}
            >
               <Select placeholder="Choose a payment method...">
                  <Select.Option value="Cash">Cash</Select.Option>
                  <Select.Option value="Credit Card">Credit Card</Select.Option>
               </Select>
            </Form.Item>
            <Card>
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
               <div className="flex justify-end">
                  <Button disabled={cart.cartItems.length === 0} className="mt-4" type="primary" onClick={() => props.setIsModalOpen(true)} htmlType="submit">Create Order</Button>
               </div>
            </Card>
         </Form>
      </Modal>
   );
};

export default CreateInvoice;
