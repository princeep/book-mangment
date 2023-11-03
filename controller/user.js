const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel")

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id },process.env.secret_key, {
            expiresIn: '1h', 
        });
        res.status(201).json({ token, userId: newUser._id, message: 'User created successfully' });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.login = async(req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
        const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id },process.env.secret_key, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token, userId: user._id, message: 'Login successful' });
  
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  
  
  
  