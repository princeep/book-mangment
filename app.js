const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const Book = require("./models/bookmodel");
const connectDB = require("./db");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/user",userRoute)
app.use("/book",bookRoute);

const MONGO_URL = process.env.MONGO_URL;
connectDB(MONGO_URL);

app.listen(port,()=>{
    console.log(`server listening on ${port}`)
})