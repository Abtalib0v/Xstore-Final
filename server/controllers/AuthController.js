const env = require("dotenv").config(); // dotenv kullanıyoruz
const bcrypt = require("bcrypt"); // artık bcrypt kullanıyoruz
const jwt = require("jsonwebtoken");
const User = require("../Models/User/UserSchema"); // relative path düzeltilmiş

// Şifreyi hashleyen fonksiyon
const HashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

// Register
const AuthRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kullanıcı var mı kontrol
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ message: "Email already used" });
    }

    // Şifreyi hashle
    const hashPassword = await HashPassword(password);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json({ data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login
const AuthLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .cookie("token", token, {
        httpOnly: false,
        secure: false,
        maxAge: 3600000,
      })
      .json({
        message: "Login successful",
        token: token,
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { AuthRegister, AuthLogin };
