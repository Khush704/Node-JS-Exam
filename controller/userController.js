import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const error = validationResult(req);

    if (error.array().length != 0) {
      return res.json(error.array());
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) return res.json({ message: "User exist." });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    req.body.password = hashPassword;

    const data = await User.create(req.body);
    return res.status(201).json({ message: "User register success.", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "User not exist." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    if (!user.isVerified)
      return res.status(400).json({ message: "Please verify your email." });

    const token = jwt.sign({ id: user._id }, envConfig.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .json({ message: "Login success.", data: user, token });

    return res.status(200).json({ message: "Login success.", data: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await User.find({});
    return res.status(200).json({ message: "All user Successfully", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User Delete Successfully",
      userId: data.id,
    });
  } catch (error) {
    return res.status(500).json();
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findOneAndReplace(id);

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      userId: data.id,
    });
  } catch (error) {
    return res.status(500).json();
  }
};
