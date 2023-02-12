import React from 'react';
import {Button, Form, Input, Modal, Table} from "antd";

const EditCategory = ({categories, setIsEditModalOpen,isEditModalOpen}) => {

    const columns = [       //title : kolon ismi , dataIndex : respond da ki geçen isim.
        {
            title: "Category Title",
            dataIndex:"title"
        },
    ]


    return (
        <Modal footer={false} title="Category Operations" onCancel={() => setIsEditModalOpen(false)} open={isEditModalOpen}>
            <Form>
                <Table bordered dataSource={categories} columns={columns}></Table>
            </Form>
        </Modal>
    );
};

export default EditCategory;
