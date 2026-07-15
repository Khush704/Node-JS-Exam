import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  login,
  register,
} from "../controller/userController.js";
import userAuth from "../middleware/userAuth.js";

const employeeRouter = Router();

//To Create Employee
employeeRouter.post("/", register);

//To Show All Employee Data
employeeRouter.get("/", userAuth, getAllUser);

//To Login
employeeRouter.post("/login", login);

//To Delete
employeeRouter.delete("/:id", userAuth, deleteUser);

//To Update
employeeRouter.patch("/:id", userAuth, updateUser);

export default employeeRouter;
