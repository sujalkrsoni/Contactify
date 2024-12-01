const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      console.log("already exist");
      return res.status(409).json({ message: "User already exists" });
    }
    let newUser = new User({ userName, password, email });
    newUser.password = await bcrypt.hash(password, 10); // 10 is salting
    await newUser.save();
    console.log(newUser);
    console.log("register sucessfully");
    res
      .status(201)
      .json({ message: "Successfully registered ", success: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Internal server error", success: false, error });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exists" });
    }
    const isPassEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const jwtToken = jwt.sign(
      { userName: existingUser.userName },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    const userId = existingUser._id;
    return res.status(200).json({
      message: "Login Successfully !!",
      success: true,
      userName,
      jwtToken,
      userId,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal server error", success: false, error });
  }
};
