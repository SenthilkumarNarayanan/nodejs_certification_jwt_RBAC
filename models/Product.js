import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:String,
  price:Number,
  description:String,
  createdAt:{
    type:Date,
    default:Date.now
  }
});

export default mongoose.model("Product",productSchema);