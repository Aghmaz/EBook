const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
exports.registerUser = async (name, email, password) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const user = new User({ email, name, password: hashedPassword });
    await user.save();
    return { message: "User registered successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.loginUser = async (email, password) => {
  try {
    // Find user by username
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    let id = user._id;
    return { token, id };
  } catch (err) {
    throw new Error(err.message);
  }
};
