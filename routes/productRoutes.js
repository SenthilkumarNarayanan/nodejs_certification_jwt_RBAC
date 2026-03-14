import express from "express";
import {getProducts,addProduct} from "../controllers/productController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/",verifyToken,getProducts);

router.post("/add",
verifyToken,
isAdmin,
addProduct
);

export default router;