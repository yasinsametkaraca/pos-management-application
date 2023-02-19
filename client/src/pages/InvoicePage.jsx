import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/header/Header";
import {Button, Card, Input, message, Modal, Popconfirm, Space, Spin, Table} from "antd";
import CreateInvoice from "../components/cart/CreateInvoice";
import PrintInvoice from "../components/invoices/PrintInvoice";
import {decrementQuantity, deleteProductToCart, incrementQuantity} from "../store/cartSlice";
import {MinusOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import Highlighter from "react-highlight-words";

const InvoicePage = () => {

   const [invoicesItem, setInvoicesItem] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const dispatch = useDispatch();
   const [invoicesDetail, setInvoicesDetail] = useState();
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);
   const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };
   const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
   };
   const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
              style={{
                 padding: 8,
              }}
              onKeyDown={(e) => e.stopPropagation()}
          >
             <Input
                 ref={searchInput}
                 placeholder={`Search ${dataIndex}`}
                 value={selectedKeys[0]}
                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                 style={{
                    marginBottom: 8,
                    display: 'block',
                 }}
             />
             <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{
                       width: 90,
                    }}
                >
                   Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{
                       width: 90,
                    }}
                >
                   Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                       confirm({
                          closeDropdown: false,
                       });
                       setSearchText(selectedKeys[0]);
                       setSearchedColumn(dataIndex);
                    }}
                >
                   Filter
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                       close();
                    }}
                >
                   close
                </Button>
             </Space>
          </div>
      ),
      filterIcon: (filtered) => (
          <SearchOutlined
              style={{
                 color: filtered ? '#1890ff' : undefined,
              }}
          />
      ),
      onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
         if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
         }
      },
      render: (text) =>
          searchedColumn === dataIndex ? (
              <Highlighter
                  highlightStyle={{
                     backgroundColor: '#ffc069',
                     padding: 0,
                  }}
                  searchWords={[searchText]}
                  autoEscape
                  textToHighlight={text ? text.toString() : ''}
              />
          ) : (
              text
          ),
   });

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
         ...getColumnSearchProps("customerName")
      },
      {
         title: 'Phone Number',
         dataIndex: 'customerPhoneNumber',
         key: 'customerPhoneNumber',
         ...getColumnSearchProps("customerPhoneNumber")
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
         },
         defaultSortOrder: 'descend',
         sorter: (a, b) => a.totalAmount - b.totalAmount,
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
          <h1 className={"mb-5 text-3xl font-bold text-center"}>Invoices</h1>
          {invoicesItem.length > 0 ? (
              <div className={"px-6"}>
                  <Table rowKey={"_id"} dataSource={invoicesItem} columns={columns} bordered pagination={false} scroll={{x:1200, y:300}}/>
              </div>
          ) : <Spin className={"flex justify-center items-center absolute top-1/2 w-screen"} size={"large"}/>}
         <PrintInvoice invoicesDetail={invoicesDetail} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}></PrintInvoice>
      </>
   );
};

export default InvoicePage;
