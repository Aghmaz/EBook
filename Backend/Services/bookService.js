const Book = require("../Models/ebook");

exports.getAllBooks = async () => {
  return await Book.find({});
};

exports.getBooksByUser = async (userId) => {
  return await Book.find({ userId });
};

exports.createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

exports.updateBook = async (bookId, userId, updateData) => {
  return await Book.findOneAndUpdate({ _id: bookId, userId }, updateData, {
    new: true,
  });
};

exports.deleteBook = async (bookId, userId) => {
  return await Book.findOneAndDelete({ _id: bookId, userId });
};
