import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Table} from "antd";

const EditProduct = () => {

    const [editingProduct, setEditingProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [form] = Form.useForm();

    const getProducts = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getCategories = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories");
            const data = await res.json();
            data && setCategories(data.map(category => (
                {...category,value:category.title}
            )));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    const columns = [
        {
            title: "Product Name",
            dataIndex:"title",
            width: "8%",
            render: (_, record) => {
                return <p>{record.title}</p>;
            },
        },
        {
            title: "Product Image",
            width: "6%",
            dataIndex: "img",
            render: (_, record) => {
                return (
                    <img src={record.img} alt={record.title} className="w-full h-16 w-20 object-cover" />
                );
            },
        },
        {
            title: "Product Price",
            dataIndex: "price",
            width: "8%",
        },
        {
            title: "Category",
            dataIndex: "category",
            width: "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "8%",
            render: (text,record) => {
                return (
                    <div>
                        <Button className={"pl-0"} type={"link"} onClick={() => {
                            setIsEditModalOpen(true);
                            setEditingProduct(record);
                        }} >Edit</Button>
                        <Button danger={true} type={"link"} onClick={() => deleteProduct(record._id)}>Delete</Button>
                    </div>
                )
            }
        }
    ]
    const editProduct = (values) => {
        console.log(values);
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products", {
                method: "PUT",
                body: JSON.stringify({...values, productId : editingProduct._id}),
                headers: {"Content-type": "application/json; charset=UTF-8"},
            }).then((res) => {
                if(res.ok){
                    message.success("Product updated successfully.");
                    setProducts(products.map((product)=>{
                        if(product._id===editingProduct._id){
                            return values;
                        }else{
                            return product;
                        }
                    }))
                }else{
                    message.error("Product could not be updated.");
                }
            })
        } catch (error) {
            message.error("Server Error.");
        }
    }
    const deleteProduct = (id) => {
        if(window.confirm("Are you sure you want to delete?")){
            try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/products", {
                    method: "DELETE",
                    body: JSON.stringify({ productId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                }).then((res) => {
                    if(res.ok){
                        message.success("Product deleted successfully.");
                        setProducts(products.filter((product) => product._id !== id));
                    }else
                        message.error("Product could not be deleted.")
                })
            } catch (error) {
                message.error("Server Error.");
            }
        }
    }
    return (
        <>
            <Table scroll={{x: 1000, y: 600,}} rowKey={"_id"} bordered dataSource={products} columns={columns}></Table>
            <Modal footer={false} title="Update Product" onCancel={() => setIsEditModalOpen(false)} open={isEditModalOpen}>
                <Form onFinish={editProduct} layout={"vertical"} form={form} initialValues={form.setFieldsValue(editingProduct)}>
                    <Form.Item label={"Product Name"} name={"title"} rules={[{required:true, message:"Product name is required!"}]}>
                        <Input  placeholder={"Enter a product name."}></Input>
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
                        <Button className={"bg-blue-600 text-white"} htmlType={"submit"}>Update</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditProduct;
