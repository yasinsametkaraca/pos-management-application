const express = require("express");
const mongoose = require("mongoose"); //mongo db ile uygulamamızı bağlar.
const dotenv = require("dotenv");
const app = express();
const port = 8080;
const cors = require("cors");
const logger = require("morgan")  //atılan istekleri terminal de görmemizi sağlar.
dotenv.config(); //dotenv yi direk buraya db linkimizi yazmamak için kullandık ve .env dosyası oluşturduk.

//routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const invoiceRoute = require("./routes/invoices.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

const connect = async () => {
 try{
   await mongoose.connect(process.env.MONGO_URI);
     console.log("connected to mongoDB");
 }catch (error) {
     throw error;
 }
}
//middlewares
app.use(express.json());
app.use(cors());
app.use(logger("dev"))

app.use("/api/categories",categoryRoute);
app.use("/api/products",productRoute);
app.use("/api/invoices",invoiceRoute);
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);

app.listen(port, ()=>{          //dinlemek için sunucuyu
    connect().then(() => {console.log("success")})
    console.log(`Pos application listening on port ${port}`)
});
