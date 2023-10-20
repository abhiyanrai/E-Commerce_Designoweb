import express from "express";
import { addProduct, getAllProductsByAdmin,
    getProductById, updateProductDetails, getAllUsers } from "../controllers/adminController.js";
import { isAuthAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/addProduct", isAuthAdmin,  addProduct)
router.get("/getAllProductsByAdmin", isAuthAdmin,  getAllProductsByAdmin)
router.get("/getProductById/:productId", isAuthAdmin, getProductById)
router.put("/updateProductDetails", isAuthAdmin, updateProductDetails)
router.get("/getAllUsers", isAuthAdmin, getAllUsers)

export default router;
