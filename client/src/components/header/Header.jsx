import React from 'react';
import { FileSearchOutlined,HomeOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const Header = () => {
   return (
      <div className={"border-b mb-5"}>
         <header className={"py-3 px-5 flex justify-between items-center gap-9"}>
            <div className={"logo"}>
               <a href="/">
                  <h2 className={"text-2xl font-bold md:text-4xl"}>YSK</h2>
               </a>
            </div>
            <div className={"header-search flex-1"}>
               <Input className={"rounded-3xl max-w-[850px]"} size="large" placeholder="Search Product..." prefix={<FileSearchOutlined />}/>
            </div>
            <div className={"menu-links"}>
               <a className={"flex flex-col"} href="/">
                  <HomeOutlined className={"text-xl md:text-2xl"} />
                  <span>Home</span>
               </a>
            </div>
         </header>
      </div>
   );
};

export default Header;
