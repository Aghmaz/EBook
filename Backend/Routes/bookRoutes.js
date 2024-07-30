const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllBooks,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controllers/bookController");
const bookService = require("../Services/bookService");
const { bookSchema } = require("../utils/validate");

router.get("/", authMiddleware, getAllBooks);
router.get("/:id", authMiddleware, async (req, res) => {
  await getBooks(req, res);
});

router.post("/", authMiddleware, async (req, res) => {
  const { error } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });

  try {
    const bookData = { ...req.body, userId: req.user.id };
    const book = await bookService.createBook(bookData);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { error } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });

  try {
    const book = await bookService.updateBook(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
