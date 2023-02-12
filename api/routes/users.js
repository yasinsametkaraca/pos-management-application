const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (error){
        console.log(error)
        res.status(500).json(error);
    }
});
router.get("/:id", async (req,res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.status(200).json({
            _id : user._id,
            username : user.username,
            email : user.email,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt,
        });
    }catch (error){
        console.log(error)
        res.status(500).json(error);
    }
});

router.put("/", async (req,res) => {
    try {
        await User.findOneAndUpdate({ _id : req.body.userId },req.body);  //sol tarafa id sağ tarafa değiştirilecekler.
        res.status(200).json("User updated successfully")
    }catch (error){
        res.status(500).json(error);
    }
});

router.delete("/", async (req,res) => {
    try {
        await User.findOneAndDelete({ _id : req.body.userId });
        res.status(200).json("User deleted successfully")
    }catch (error){
        res.status(500).json(error);
    }
});
module.exports = router;