const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId
    },

});

const Book = mongoose.model("Book",bookSchema);
module.exports = Book;