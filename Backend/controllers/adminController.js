import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js"

export const addProduct = async (req, res) => {
  const { name, category, price, desc, size, color } = req.body;
	try {
	  const product = new productModel({
		name,
		category,
		price,
		desc,
		size,
		color,
    createdBy: req.user._id
	  });
  
	  await product.save();
    res.status(201).send({
      success: true,
      message: "Product added successfully",
      product,
    });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Something went wrong" });
	}
};



export const getAllProductsByAdmin = async (req, res) => {
  try {
    const products = await productModel.find({
      createdBy: req.user._id,
      isActive: true
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this admin" });
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



export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const updateProductDetails = async (req, res) => {
  const { name, category, price, desc, size, color } = req.body;
  try {
    const product = await productModel.findById(req.body._id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    product.name = name;
    product.category = category;
    product.price = price;
    product.desc = desc;
    product.size = size;
    product.color = color;
    
    await product.save();

    res.status(200).json({ success: true, message: "Product details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: 0, isActive: true });

    if (users.length === 0) {
      return res.status(200).json({ success: true, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
