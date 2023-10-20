import express from "express";
const router = express.Router();
import { getAllProducts } from "../controllers/userController.js";
import { isAuthUser } from "../middlewares/authMiddleware.js";


router.get("/getAllProducts", isAuthUser, getAllProducts)

export default router;