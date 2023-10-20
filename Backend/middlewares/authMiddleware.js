import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  let token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
  try {
    const decode = JWT.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAuthAdmin = async (req, res, next) => {
  let token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: "Authorizationnn token is required" });
    }
    token = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
  try {
    const decode = JWT.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};


export const isAuthUser = async (req, res, next) => {
  let token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: "Authorizationnn token is required" });
    }
    token = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
  try {
    const decode = JWT.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decode;
    const user = await userModel.findById(req.user._id);
    if (user.role !== 0) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } 
    next();
  } catch (error) {
    console.log(error);
  }
};


//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
