import React from 'react';
import {Button, Form, Input, message, Modal} from "antd";

const AddCategory = ({isAddModalOpen,setIsAddModalOpen,categories,setCategories}) => {

    const [form] = Form.useForm(); //ant designin bize verdiği özelliktir.
    const addCategory = async (values) => {  //ant design bize forma girilen değerleri bir object olarak döner. onFinish ant design in özelliğidir.
        try {
            fetch("http://localhost:8080/api/categories", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then(res => res.json()).then((res) => {
                if(res._id){
                    message.success(res.message); //yukarıdan toost çıkarır.
                    form.resetFields();
                    setCategories([...categories, {
                        _id : res._id,
                        title:values.title
                    }])
                }else{
                    message.error("Category could not be added.");
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal footer={false} title="Add New Category" onCancel={() => setIsAddModalOpen(false)} open={isAddModalOpen}>
            <Form onFinish={addCategory} layout={"vertical"} form={form}>
                <Form.Item label={"Category Title"} name={"title"} rules={[{required:true, message:"Category title is required!"}]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item className={"mb-0 flex justify-end"}>
                    <Button className={"bg-blue-600 text-white"} htmlType={"submit"}>Add</Button> {/* burada htmlType butonun boş geçildiğinde hata vermesini sağlar*/}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCategory;
