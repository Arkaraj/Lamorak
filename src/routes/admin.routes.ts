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
  "/foodingredient/:foodId/:IngId",
  auth,
  isAdmin,
  adminController.addIngredientToFood
);

// Remove Ingredients to Food
router.delete(
  "/foodingredient/:foodId/:IngId",
  auth,
  isAdmin,
  adminController.removeIngredientToFood
);

// get All restaurants
router.get("/restaurants", auth, isAdmin, adminController.getAllRestaurant);
// Get specific Restaurant
router.get(
  "/restaurants/:Rid",
  auth,
  isAdmin,
  adminController.getSpecificRestaurant
);
// get All the foods with ingredients
router.get("/food", auth, isAdmin, adminController.getAllDishes);
// get All the foods with ingredients
router.get(
  "/foodingredient",
  auth,
  isAdmin,
  adminController.getAllDishesAndIngredients
);
// get All the ingredients
router.get("/ingredients", auth, isAdmin, adminController.getAllIngredients);

// make restaurant unavailable/available
router.put("/restaurant/:Rid", auth, isAdmin, adminController.restaurantClosed);

// make food unavailable/available
router.put("/food/:Fid", auth, isAdmin, adminController.dishOver);

// delete restaurants
router.delete(
  "/restaurants/:rId",
  auth,
  isAdmin,
  adminController.DeleteSpecificRestaurant
);
// delete foods
router.delete(
  "/food/:foodId",
  auth,
  isAdmin,
  adminController.DeleteSpecificFood
);
// delete ingredients
router.delete(
  "/ingredients/:ingredientId",
  auth,
  isAdmin,
  adminController.DeleteSpecificIngredient
);

router.get("/order", auth, isAdmin, adminController.ViewAllOrders);
router.get("/supervision", auth, isAdmin, adminController.ViewAssignedOrders);
router.put("/order/:Oid", auth, isAdmin, adminController.ControlOrders);

router.post("/delivery", auth, isAdmin, adminController.addDeliveryPerson);
router.get("/delivery", auth, isAdmin, adminController.ViewDeliveryPerson);

export default router;
