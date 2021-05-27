import express from "express";
const router = express.Router();
import passport from "passport";
import "../middlewares/isAuth";

const auth = passport.authenticate("jwt", { session: false });

// Call middleware here
import admin from "../controllers/admin.controllers";
import { isAdmin } from "../middlewares/isAdmin";

router.post("/login", admin.loginAdmin);
router.get("/", auth, isAdmin, admin.viewAdmin);

export default router;
