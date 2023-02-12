import React, {useState} from 'react';
import "./style.css"
import {PlusOutlined} from "@ant-design/icons";
import {Button, Form, Input, message, Modal} from "antd";
import {useForm} from "antd/es/form/Form";
const Categories = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [form] = Form.useForm();
    const addCategory = (values) => {  //ant design bize forma girilen değerleri bir object olarak döner. onFinish ant design in özelliğidir.
        try {
            fetch("http://localhost:8080/api/categories", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then((res) => {
                if(res.ok){
                    message.success("Category added successfully");
                    form.resetFields();
                }
            })
        } catch (err) {
            console.log(err);
        }
    }


    return (
      <ul className={"flex gap-4 text-lg md:flex-col"}>
         <li className={"category-item"}>
            <span>All</span>
         </li>
          <li className={"category-item !bg-green-800 hover:opacity-80"} onClick={() => setIsAddModalOpen(true)}>
              <PlusOutlined className={"md:text-2xl"}></PlusOutlined>
          </li>
          <Modal footer={false} title="Add New Category" onCancel={() => setIsAddModalOpen(false)} open={isAddModalOpen}>
              <Form onFinish={addCategory} layout={"vertical"} form={form}>
                  <Form.Item label={"Add Category"} name={"title"} rules={[{required:true, message:"Category title is required!"}]}>
                      <Input></Input>
                  </Form.Item>
                  <Form.Item className={"mb-0 flex justify-end"}>
                      <Button className={"bg-blue-600 text-white"} htmlType={"submit"}>Add</Button> {/* burada htmlType butonun boş geçildiğinde hata vermesini sağlar*/}
                  </Form.Item>
              </Form>
          </Modal>
          <li className={"category-item"}>
              <span>All</span>
          </li>
      </ul>
   );
};

export default Categories;
