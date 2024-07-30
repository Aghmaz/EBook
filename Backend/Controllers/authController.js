const authService = require("../Services/authService");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await authService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await authService.loginUser(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
