import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  login,
  register,
} from "../controller/userController.js";

const employeeRouter = Router();

//To Create Employee
employeeRouter.post("/", register);

//To Show All Employee Data
employeeRouter.get("/", getAllUser);

//To Login
employeeRouter.post("/login", login);

//To Delete
employeeRouter.delete("/:id", deleteUser);

//To Update
employeeRouter.patch("/:id", updateUser);

export default employeeRouter;
