//category entity.
const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        title: {type: String, require: true, unique: true},
    },
    {timestamps: true}
);  // timestamps ne zaman oluşturulduğu.

const Category = mongoose.model("categories",CategorySchema); //db de açılacak alan ismi.
module.exports = Category;