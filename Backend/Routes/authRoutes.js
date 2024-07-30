const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../Controllers/authController");
const { registerSchema, loginSchema } = require("../utils/validate");

router.post("/signup", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });

  await registerUser(req, res);
});
router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });

  await loginUser(req, res);
});

module.exports = router;
