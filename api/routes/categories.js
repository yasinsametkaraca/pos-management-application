const Category = require("../models/Category.js");
const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch (error){
        console.log(error)
        res.status(500).json(error);
    }
});
router.post("/", async (req,res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json({message: "Category saved successfully", _id: newCategory._id})
    }catch (error){
        res.status(500).json(error);
    }
});
router.put("/", async (req,res) => {
    try {
        await Category.findOneAndUpdate({ _id : req.body.categoryId },req.body);  //sol tarafa id sağ tarafa değiştirilecekler.
        res.status(200).json("Category updated successfully")
    }catch (error){
        res.status(500).json(error);
    }
});

router.delete("/", async (req,res) => {
    try {
        await Category.findOneAndDelete({ _id : req.body.categoryId });
        res.status(200).json("Category deleted successfully")
    }catch (error){
        res.status(500).json(error);
    }
});
module.exports = router;