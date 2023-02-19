import React from 'react';
import {Button, Form, Input, message, Modal, Select} from "antd";

const AddProduct = ({isAddModalOpen,setIsAddModalOpen,products,setProducts, categories}) => {

    const [form] = Form.useForm();
    const addProduct = async (values) => {
        console.log(values)
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then(res => res.json()).then((res) => {
                if(res._id){
                    message.success(res.message); //yukarıdan toost çıkarır.
                    form.resetFields();
                    setIsAddModalOpen(false);
                    setProducts([...products, {
                        _id : res._id,
                        price: Number(values.price),
                        img:values.img,
                        title:values.title,
                        category:values.category
                    }])
                }else{
                    message.error("Product could not be added.");
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal footer={false} title="Add New Product" onCancel={() => setIsAddModalOpen(false)} open={isAddModalOpen}>
            <Form onFinish={addProduct} layout={"vertical"} form={form}>
                <Form.Item label={"Product Name"} name={"title"} rules={[{required:true, message:"Product name is required!"}]}>
                    <Input placeholder={"Enter a product name."}></Input>
                </Form.Item>
                <Form.Item label={"Image"} name={"img"} rules={[{required:true, message:"Product image is required!"}]}>
                    <Input placeholder={"Enter a product image link."}></Input>
                </Form.Item>
                <Form.Item label={"Price"} name={"price"} rules={[{required:true, message:"Product price is required!"}]}>
                    <Input placeholder={"Enter a product price."}></Input>
                </Form.Item>
                <Form.Item label={"Category"} name={"category"} rules={[{required:true, message:"Product category is required!"}]}>
                    <Select
                        optionFilterProp="children"
                        showSearch
                        placeholder="Categories"
                        filterOption={(input, option) => (option?.title ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                        }
                        options={categories}
                    />
                </Form.Item>
                <Form.Item className={"mb-0 flex justify-end"}>
                    <Button className={"bg-blue-600 text-white"} htmlType={"submit"}>Add</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProduct;
