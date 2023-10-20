import productModel from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({
          isActive: true
        });
    
        if (products.length === 0) {
          return res.status(200).json({success: true,  message: "No products found" });
        }
    
        res.status(200).json({
          success: true,
          message: "Products retrieved successfully",
          products,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
      }
};