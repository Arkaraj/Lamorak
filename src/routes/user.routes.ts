import express from "express";
const router = express.Router();
import passport from "passport";
import "../middlewares/isAuth";

// Call middleware here
import userController from "../controllers/user.controllers";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

router.get("/:id", userController.getSpecificUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete(
  "/logout",
  //   passport.authenticate("jwt", { session: false }),
  userController.logoutUser
);

export default router;
