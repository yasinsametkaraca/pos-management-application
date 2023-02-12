const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
    {
        customerName: {type: String, require: true},
        customerPhoneNumber: {type: String, require: true},
        paymentMode: {type: String, require: true},
        cartItems: {type: Array, require: true},
        subTotal: {type: Number, require: true},
        tax: {type: Number, require: true},
        totalAmount: {type: Number, require: true},
    },
    {timestamps: true}
);

const Invoice = mongoose.model("invoices",InvoiceSchema); //db de açılacak alan ismi.
module.exports = Invoice;