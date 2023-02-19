import React from 'react';
import { FileSearchOutlined,HomeOutlined,LogoutOutlined, ShoppingCartOutlined,FormOutlined,UserOutlined,LineChartOutlined} from '@ant-design/icons';
import {Badge, Input} from 'antd';
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import "./header.css";

const Header = ({setSearchProduct}) => {
   const cartLength = useSelector((state) => state.cart.cartItems.length)
   const navigate = useNavigate();
   const {pathname} = useLocation();
   const logout = () => {
      navigate("/login");
   }

   return (
      <div className={"border-b mb-5"}>
         <header className={"py-3 px-5 flex justify-between items-center gap-9"}>
            <div className={"logo"}>
               <Link to="/">
                  <h2 className={"text-2xl font-bold md:text-4xl"}>YSK</h2>
               </Link>
            </div>
            <div onClick={() => {pathname !== "/" && navigate("/")}} className={"header-search flex-1 flex justify-center"}>
               <Input onChange={(event) => setSearchProduct(event.target.value.toLowerCase())} className={"rounded-3xl max-w-[850px]"} size="large" placeholder="Search Product..." prefix={<FileSearchOutlined />}/>
            </div>
            <div className={"menu-links flex justify-between items-center gap-9 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1"}> {/* md = büyük ekran*/}
               <Link className={`flex flex-col menu-link hover:text-[#2e8b57] transition-all ${pathname === "/" && "active"}`} to="/">
                  <HomeOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Home</span>
               </Link>
               <Badge count={cartLength} offset={[0,0]} className={"md:flex hidden"}>
                  <Link className={`flex flex-col menu-link hover:text-[#2e8b57] transition-all gap-y-[1px] ${pathname === "/cart" && "active"}`} to="/cart"> {/* a etiketi yerine Link kullandık çünkü her tıklandığında sayfa yenilensin istemeyiz*/}
                     <ShoppingCartOutlined className={"text-xl md:text-2xl"} />
                     <span className={"text-[9px] md:text-[13px]"}>Cart</span>
                  </Link>
               </Badge>
               <Link className={`flex flex-col menu-link hover:text-[#2e8b57] transition-all ${pathname === "/customers" && "active"}`} to="/customers">
                  <UserOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Customers</span>
               </Link>
               <Link className={`flex flex-col menu-link hover:text-[#2e8b57] transition-all ${pathname === "/invoices" && "active"}`} to="/invoices">
                  <FormOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Invoices</span>
               </Link>
               <Link className={`flex flex-col menu-link hover:text-[#2e8b57] transition-all ${pathname === "/statistics" && "active"}`} to="/statistics">
                  <LineChartOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Statistics</span>
               </Link>
               <Link className={"flex flex-col menu-link hover:text-[#2e8b57] transition-all"} to="/login">
                  <LogoutOutlined className={"text-xl md:text-2xl"} />
                  <span className={"text-[9px] md:text-[13px]"}>Logout</span>
               </Link>
            </div>
            <Badge count={cartLength} offset={[0,0]} className={"flex md:hidden"}>
               <Link className={`flex flex-col menu-link hover:text-[#2e8b57] transition-all ${pathname === "/cart" && "active"}`} to="/cart">
                  <ShoppingCartOutlined className={"text-2xl"} />
                  <span className={"text-[12px]"}>Cart</span>
               </Link>
            </Badge>
         </header>
      </div>
   );
};
export default Header;
