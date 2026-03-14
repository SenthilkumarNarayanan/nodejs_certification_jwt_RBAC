import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get all users
export const getUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// Add new user (admin can add admin or user)
export const addUser = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.json({ message: "User added successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};