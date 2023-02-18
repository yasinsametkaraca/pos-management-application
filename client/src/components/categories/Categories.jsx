import React, {useEffect, useState} from 'react';
import { PlusCircleOutlined,EditOutlined} from "@ant-design/icons";
import AddCategory from "./AddCategory";
import "./style.css"
import EditCategory from "./EditCategory";

const Categories = ({categories,setCategories,setFilteredProducts,products}) => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory,] = useState("All");

    useEffect(() => {
        if(selectedCategory === "All")
            setFilteredProducts(products)
        else {
            setFilteredProducts(products.filter((product) => product.category === selectedCategory))
        }
    }, [products,setFilteredProducts,selectedCategory]);

    return (
      <ul className={"flex gap-4 text-lg md:flex-col"}>
          <li className={`category-item ${selectedCategory=== "All" && "!bg-pink-700"}`} onClick={() => setSelectedCategory("All")}>
              <span>All</span>
          </li>
          {categories.map(category => (
              <li key={category._id} className={`category-item ${category.title === selectedCategory && "!bg-pink-700"}`} onClick={() => setSelectedCategory(category.title)}>
                  <span>{category.title}</span>
              </li>
          ))}
          <li className={"category-item !bg-green-800 hover:opacity-80"} onClick={() => setIsAddModalOpen(true)}>
              <PlusCircleOutlined className={"md:text-2xl"}></PlusCircleOutlined>
          </li>
          <li className={"category-item !bg-purple-700 hover:opacity-80"} onClick={() => setIsEditModalOpen(true)}>
              <EditOutlined className={"md:text-2xl"}></EditOutlined>
          </li>
          <AddCategory setCategories={setCategories} categories={categories} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}></AddCategory>
          <EditCategory categories={categories} setCategories={setCategories} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen}></EditCategory>
      </ul>
   );
};

export default Categories;
