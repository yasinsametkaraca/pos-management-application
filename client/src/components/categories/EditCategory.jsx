import React, {useState} from 'react';
import {Button, Form, Input, message, Modal, Table} from "antd";

const EditCategory = ({categories, setIsEditModalOpen,isEditModalOpen, setCategories}) => {

    const [editingRow, setEditingRow] = useState({});

    const columns = [       //title : kolon ismi , dataIndex : respond da ki geçen isim.
        {
            title: "Category Title",
            dataIndex:"title",
            render: (_,record) => {      //record : dönen item
                if(record._id === editingRow._id){
                    return (
                        <Form.Item name={"title"} className={"mb-0"}>
                            <Input defaultValue={record.title}></Input>
                        </Form.Item>
                    )
                }else {
                    return <p>{record.title}</p>
                }

            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text,record) => {
                return (
                   <div>
                       <Button className={"pl-0"} type={"link"} onClick={() => setEditingRow(record)} >Edit</Button>
                       <Button danger={true} type={"link"} onClick={() => deleteCategory(record._id)}>Delete</Button>
                       <Button type={"text"} htmlType={"submit"}>Save</Button>
                   </div>
                )
            }
        }
    ]
    const editCategory = (values) => {
        console.log(values);
        try {
            fetch("http://localhost:8080/api/categories", {
                method: "PUT",
                body: JSON.stringify({...values, categoryId: editingRow._id}),
                headers: {"Content-type": "application/json; charset=UTF-8"},
            }).then((res) => {
                if(res.ok){
                    message.success("Category updated successfully.");
                }else{
                    message.error("Category could not be updated.");
                    setCategories(
                        categories.map((category) => {
                            return category;
                        })
                    );
                }
            })
            setCategories(
                categories.map((category) => {
                    if (category._id === editingRow._id) {
                        return {...category, title: values.title};
                    }
                    return category;
                })
            );
        } catch (error) {
            message.error("Server Error.");
            console.log(error);
        }
    }

    const deleteCategory = (id) => {
        if(window.confirm("Are you sure you want to delete?")){
            try {
                fetch("http://localhost:8080/api/categories", {
                    method: "DELETE",
                    body: JSON.stringify({ categoryId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                }).then((res) => {
                    if(res.ok){
                        message.success("Category deleted successfully.");
                        setCategories(categories.filter((item) => item._id !== id));
                    }else
                        message.error("Category could not be deleted.")
                    })
            } catch (error) {
                message.error("Server Error.");
            }
        }
    }

    return (
        <Modal footer={false} title="Category Operations" onCancel={() => setIsEditModalOpen(false)} open={isEditModalOpen}>
            <Form onFinish={editCategory}>
                <Table  rowKey={"_id"} bordered dataSource={categories} columns={columns}></Table>
            </Form>
        </Modal>
    );
};

export default EditCategory;
