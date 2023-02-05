import React from 'react';
import {Button, Card, Form, Input, Modal, Select} from "antd";

const CreateInvoice = (props) => {

   const onFinish = (values) => {
      console.log(values);
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
               name={"phoneNumber"}
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
               <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>100$</span>
               </div>
               <div className="flex justify-between my-2">
                  <span>Tax %8</span>
                  <span className="text-red-600">+18$</span>
               </div>
               <div className="flex justify-between">
                  <b>Total</b>
                  <b>118$</b>
               </div>
               <div className="flex justify-end">
                  <Button className="mt-4" type="primary" onClick={() => props.setIsModalOpen(true)} htmlType="submit">Create Order</Button>
               </div>
            </Card>
         </Form>
      </Modal>
   );
};

export default CreateInvoice;
