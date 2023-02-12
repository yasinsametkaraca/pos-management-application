const Invoice = require("../models/Invoice.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    }catch (error){
        console.log(error)
        res.status(500).json(error);
    }
});
router.post("/", async (req,res) => {
    try {
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        res.status(200).json("Invoice added successfully")
    }catch (error){
        res.status(500).json(error);
    }
});
router.put("/", async (req,res) => {
    try {
        await Invoice.findOneAndUpdate({ _id : req.body.invoiceId },req.body);  //sol tarafa id sağ tarafa değiştirilecekler.
        res.status(200).json("Invoice updated successfully")
    }catch (error){
        res.status(500).json(error);
    }
});

router.delete("/", async (req,res) => {
    try {
        await Invoice.findOneAndDelete({ _id : req.body.invoiceId });
        res.status(200).json("Invoice deleted successfully")
    }catch (error){
        res.status(500).json(error);
    }
});
module.exports = router;