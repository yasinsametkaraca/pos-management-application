const User = require("../models/User.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req,res) => {
    try {
        const {username, email, password} = req.body;
        const user = await User.findOne({email:req.body.email});
        user && res.status(409).send({error: "This e-mail is already taken"});
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save();
        res.status(200).json({message : "User added successfully"})
    }catch (error){
        res.status(500).json(error);
    }
});

router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).send({error: "User not found"});
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            res.status(401).json({error: "Invalid Password or E-mail"});
        }else {
            res.status(200).json({
                _id : user._id,
                username : user.username,
                email : user.email,
                createdAt : user.createdAt,
                updatedAt : user.updatedAt,
            });
        }
    }catch (error){
        res.status(500).json({error: error});
    }
});

module.exports = router;