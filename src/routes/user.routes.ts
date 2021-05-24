import express from "express";
const router = express.Router();

// Call middleware here
import userController from "../controllers/user.controllers";

router.get("/", userController.getAllUsers);

export default router;
