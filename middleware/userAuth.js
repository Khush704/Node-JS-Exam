import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, envConfig.JWT_SECRET);
      if (decoded) {
        const user = await User.findById(decoded.id);
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(400).json({
            success: false,
            message: "User not Found -> Please login",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "User not Found -> Please login",
        });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Token is expired please login again...",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Please login again...",
    });
  }
};

export default userAuth;
