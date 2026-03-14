import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
//destructure name,email,password from the request body
  const {name,email,password} = req.body;
  //check if the user already exists by email
  const existingUser = await User.findOne({email});
  if(existingUser){
    return res.status(400).json({message:"User already exists"});
  }
  //hash the password using bcrypt with a salt of 10 rounds
  const hashedPassword = await bcrypt.hash(password,10);
  //create a new user with the name,email and hashed password
  const user = new User({
    name,
    email,
    password:hashedPassword
  });
  //save the user to the database
  await user.save();
  //return a success message as json response
  res.json({message:"User Registered"});
};

//login controller to authenticate user and generate token
export const login = async(req,res)=>{
//destructure email and password from the request body
  const {email,password} = req.body;
//check if the user exists by email in the database using User.findOne method
  const user = await User.findOne({email});
// if user not found, return 404 error
  if(!user){
//sent a 404 status code with a json message "User not found"
    return res.status(404).json({message:"User not found"});
  }
//if user found, compare the password with the hashed password in the database using bcrypt.compare method
  const match = await bcrypt.compare(password,user.password);
//check if the password does not match, return 401 error with a json message "Invalid password"
  if(!match){
    return res.status(401).json({message:"Invalid password"});
  }
//if password matches, generate a JWT token with the user id and role as payload, 
// secret key from environment variable and an expiration time of 1 hour by using jwt.sign method
  const token = jwt.sign(
    {id:user._id,role:user.role},
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
  );

  res.json({token,user});
};