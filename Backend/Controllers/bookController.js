const bookService = require("../Services/bookService");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookService.getBooksByUser(req.user.id);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const bookData = { ...req.body, userId: req.user.id };
    const book = await bookService.createBook(bookData);
    if (book.error) {
      return res.status(400).json({ error: book.error });
    }
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await bookService.updateBook(id, req.user.id, req.body);
    if (!updatedBook)
      return res
        .status(404)
        .json({ error: "Book not found or not owned by user" });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(id, req.user.id);
    if (!deletedBook) {
      return res
        .status(404)
        .json({ error: "Book not found or not owned by user" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
