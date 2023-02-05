import React from 'react';
import { FileSearchOutlined,HomeOutlined,LogoutOutlined, ShoppingCartOutlined,FormOutlined,UserOutlined,LineChartOutlined} from '@ant-design/icons';
import {Badge, Input} from 'antd';
import {Link} from "react-router-dom";

const Header = () => {
   return (
      <div className={"border-b mb-5"}>
         <header className={"py-3 px-5 flex justify-between items-center gap-9"}>
            <div className={"logo"}>
               <Link to="/">
                  <h2 className={"text-2xl font-bold md:text-4xl"}>YSK</h2>
               </Link>
            </div>
            <div className={"header-search flex-1 flex justify-center"}>
               <Input className={"rounded-3xl max-w-[850px]"} size="large" placeholder="Search Product..." prefix={<FileSearchOutlined />}/>
            </div>
            <div className={"menu-links flex justify-between items-center gap-9 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1"}> {/* md = büyük ekran*/}
               <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/">
                  <HomeOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Home</span>
               </Link>
               <Badge count={5} offset={[0,4]} className={"md:flex hidden"}>
                  <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/cart"> {/* a etiketi yerine Link kullandık çünkü her tıklandığında sayfa yenilensin istemeyiz*/}
                     <ShoppingCartOutlined className={"text-xl md:text-2xl"} />
                     <span className={"text-[9px] md:text-[13px]"}>Cart</span>
                  </Link>
               </Badge>
               <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/">
                  <UserOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Users</span>
               </Link>
               <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/">
                  <FormOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Invoices</span>
               </Link>
               <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/">
                  <LineChartOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Statistics</span>
               </Link>
               <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/">
                  <LogoutOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Logout</span>
               </Link>
            </div>
            <Badge count={5} offset={[0,4]} className={"flex md:hidden"}>
               <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/cart">
                  <ShoppingCartOutlined className={"text-2xl"} />
                  <span className={"text-[12px]"}>Cart</span>
               </Link>
            </Badge>
         </header>
      </div>
   );
};
export default Header;
