import express from "express";
const router = express.Router();
import passport from "passport";
import "../middlewares/isAuth";

const auth = passport.authenticate("jwt", { session: false });

// Call middleware here
import adminController from "../controllers/admin.controllers";
import { isAdmin } from "../middlewares/isAdmin";

/**
 *  Ok, so here I am letting admin create Ingredients & Resturants and stuff, not sure how it is done in real life...
 */

router.post("/login", adminController.loginAdmin);
router.get("/", auth, isAdmin, adminController.viewAdmin);
router.post("/createRestaurant", auth, isAdmin, adminController.addRestaurant);
router.post(
  "/addAddressToRest/:rId",
  auth,
  isAdmin,
  adminController.addAddressToRestaurant
);
router.post(
  "/createFood/:restaurantId",
  auth,
  isAdmin,
  adminController.addDish
);
router.post("/createIngredient", auth, isAdmin, adminController.addIngredient);
// Add address
router.post("/address", auth, isAdmin, adminController.addAddress);
// Add address to a Restaurant
router.post(
  "/restaurant/address/:restaurantId",
  auth,
  isAdmin,
  adminController.addRestaurantAddress
);

// Add Ingredients to Food
router.post(
  "food/:foodId/:IngId",
  auth,
  isAdmin,
  adminController.addIngredientToFood
);

export default router;
