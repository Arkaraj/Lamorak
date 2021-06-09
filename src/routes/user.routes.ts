import express from "express";
const router = express.Router();
import passport from "passport";
import "../middlewares/isAuth";

const auth = passport.authenticate("jwt", { session: false });

// Call middleware here
import userController from "../controllers/user.controllers";

router.get("/", auth, userController.getAllUsers);

router.get("/:id", userController.getSpecificUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/logout", auth, userController.logoutUser);
router.post("/address", auth, userController.addAddress);
// This route may contain Queries
// Show nearby resturants & food dishes match with address location
router.get("/menu/show", auth, userController.showUserMenu);

// Shows users the food item they are searching for
router.post("/menu/show", auth, userController.showUserRequestedDish);

router.get(
  "/resturant/:resturantId",
  auth,
  userController.showUserSpecificResturant
);

router.get("/item/:FoodId", auth, userController.showUserSpecificFoodItem);

// Add items to cart
router.post("/cart/:FoodId", auth, userController.userAddToCart);

// See all items in cart
router.get("/c/cart", auth, userController.viewCartItems);

// Remove food from cart
router.delete("/cart/:foodId", auth, userController.removeItemFromCart);

// Order food
router.post("/order", auth, userController.userOrderFood);

// View all orderd items, order history
router.get("/c/order", auth, userController.userGetAllOrders);

// View specific order
router.get("/order/:OrderId", auth, userController.userViewSpecificOrder);

// Cancel Order
router.delete("/order/:OrderId", auth, userController.userCancelSpecificOrder);

// Rate restaurants
router.patch("/restaurant/:Rid", auth, userController.rateRestaurant);

export default router;
