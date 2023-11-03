const express = require('express');
const bookData = require("../controller/book");
const verifyToken = require('../middleware/auth');
const bookRoute = express.Router();

bookRoute.get("/",verifyToken,bookData.getAllBook);
bookRoute.get("/:id",verifyToken, bookData.getspecificBook)
bookRoute.post("/add",verifyToken, bookData.addBook);
bookRoute.put("/update/:id",verifyToken, bookData.updateBook);
bookRoute.delete("/delete/:id",verifyToken, bookData.deleteBook);


module.exports = bookRoute;