import React, {useRef, useState} from 'react';
import Header from "../components/header/Header";
import {Button, Card, Input, message, Popconfirm, Space, Table} from "antd";
import CreateInvoice from "../components/cart/CreateInvoice";
import {useDispatch, useSelector} from "react-redux";
import {decrementQuantity, deleteProductToCart, incrementQuantity} from "../store/cartSlice";
import {MinusOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

const CartPage = () => {

   const [isModalOpen, setIsModalOpen] = useState(false);
   const cart = useSelector(state => state.cart);
   const dispatch = useDispatch();
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
         ...getColumnSearchProps("title")
      },
      {
         title: 'Category',
         dataIndex: 'category',
         key: 'category',
         ...getColumnSearchProps("category")
      },
      {
         title: 'Product Price',
         dataIndex: 'price',
         key: 'price',
         render: (value) => {
            return (<span>{value.toFixed(1)}$</span>)
         },
         defaultSortOrder: 'descend',
         sorter: (a, b) => a.price - b.price,
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
