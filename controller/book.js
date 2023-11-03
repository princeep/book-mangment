const Book = require("../models/bookmodel");

exports.addBook = async (req, res) => {
  try {
      const { name, title, description, author, price } = req.body;
      const userId = req.userId; 
      const newBook = new Book({
          name,
          title,
          description,
          price,
          user: userId, 
          author,
      });
      await newBook.save();
      res.status(201).json(newBook); 
  } catch (error) {
      console.log("Server error: " + error);
      res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBook = async(req,res)=>{
    try{
        const getbook =  await Book.find({});
        if(getbook.length < 0){
            res.send({message:"Book not found"})
        }
        res.send(getbook)
    } catch(error){
        console.log("server error: " + error)
    }
};

exports.getspecificBook = async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
  
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.updateBook = async (req, res) => {
    try {
      const bookId = req.params.id; 
      const { name, title, description, price, author } = req.body;
      const updatedBook = await Book.findByIdAndUpdate(bookId, {
        name,
        title,
        description,
        price,
        author,
      }, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(updatedBook);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id; 
    const deletedBook = await Book.findByIdAndRemove(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};