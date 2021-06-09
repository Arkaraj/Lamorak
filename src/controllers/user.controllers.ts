import { Response, Request } from "express";
import { getRepository } from "typeorm";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// Models
import { User } from "../entities/User";
import { Address } from "../entities/Address";
import {
  addToCart,
  CancelOrder,
  getUserCartItems,
  getUserWithAddress,
  OrderItems,
  removeFromCart,
  ViewOrderedItems,
  ViewSpecificOrder,
} from "../ControllerUtils/userUtils";
import {
  getRestaurantFoodItemsByCities,
  getSpecificRestaurant,
} from "../ControllerUtils/restaurantUtils";
import { queryFoodsIngredients } from "../ControllerUtils/FoodIngredientUtils";
import { showFoodSearchedFor } from "../ControllerUtils/FoodUtils";

const signToken = (id: string) => {
  return JWT.sign(
    {
      iss: "https://github.com/Arkaraj",
      sub: id,
      isAdmin: false,
    },
    `${process.env.SECRET}`,
    { expiresIn: "30d" }
  ); // '30d'
};

export default {
  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const user = await User.find();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSpecificUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ where: { uid: req.params.id } });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  registerUser: async (req: Request, res: Response) => {
    // Add address later
    const {
      userName,
      email,
      password,
    }: { userName: string; email: string; password: string } = req.body;

    try {
      User.find({ where: { email } }).then(async (user) => {
        if (user.length > 0) {
          res.status(400).json({
            message: { msg: "Email is already taken", msgError: true },
          });
        } else {
          const userRepo = getRepository(User);

          const hash = await bcrypt.hash(password, 10);

          const newUser = userRepo.create({ userName, email, password: hash });

          await userRepo.save(newUser).catch((err) => {
            res.status(500).json({
              message: { msg: "Error has occured", msgError: true, err },
            });
          });
          // User saved successfully
          res.status(200).json(user);
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const userRepo = getRepository(User);

    userRepo.findOne({ where: { email } }).then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: { msg: "Invalid Email", msgError: true } });
      } else {
        bcrypt.compare(password, user.password, (err, validate) => {
          if (err) {
            res.status(500).json({
              message: { msg: "Error has occured in bcrypt", msgError: true },
            });
          }
          if (!validate) {
            res
              .status(400)
              .json({ message: { msg: "Invalid Password", msgError: true } });
          } else {
            // Logged in
            const token = signToken(user.uid);
            // httpOnly doesn't let client side js touch the cookie saves from cross scripting attacks
            res.cookie("access_token", token, {
              httpOnly: true,
              sameSite: true,
            });
            res.status(200).json({
              user,
              isAuthenticated: true,
              message: { msgError: false },
            });
          }
        });
      }
    });
  },

  logoutUser: async (_req: Request, res: Response) => {
    res.clearCookie("access_token");

    res.status(200).json({ msg: "Logged out", user: {}, success: true });
  },

  addAddress: async (req: any, res: Response) => {
    // add Address
    const {
      city,
      state,
      Country,
      location,
      pincode,
      phone,
    }: {
      city: string;
      state: string;
      Country: string;
      location: string;
      pincode: string;
      phone: string;
    } = req.body;

    const addressRepo = getRepository(Address);

    const newAddress = addressRepo.create({
      city,
      state,
      Country,
      location,
      pincode,
      phone,
    });

    // const newAddress = addressRepo.create(req.body);

    await addressRepo
      .save(newAddress)
      .catch((err) => {
        res.status(500).json({
          message: { msg: "Error has occured", msgError: true, err },
        });
      })
      .then(async (address) => {
        const userRepo = getRepository(User);

        const user = await userRepo.findOne(req.user.uid);
        if (user && address) {
          user.address = address;
        }
        await user?.save();

        res.status(200).json({ address, user });
      });
  },
  showUserMenu: async (req: any, res: Response) => {
    // Showcase foods/items based on user's location/city

    const user = await getUserWithAddress(req);

    const city = user?.address.city;

    if (city) {
      const restaurantAndFood = await getRestaurantFoodItemsByCities(city);

      res.status(200).json({ restaurantAndFood });
    } else {
      res.status(200).json({ msg: "Please Register your Address" });
    }
  },
  showUserRequestedDish: async (req: any, res: Response) => {
    // Showcase foods/items based on user's location/city

    const { foodName }: { foodName: string } = req.body;
    const user = await getUserWithAddress(req);

    const city = user?.address.city;

    if (city) {
      const restaurantAndFood = await showFoodSearchedFor(foodName, city);

      res.status(200).json({ restaurantAndFood });
    } else {
      res.status(200).json({ msg: "Please Register your Address" });
    }
  },
  showUserSpecificResturant: async (req: Request, res: Response) => {
    const resturantId = req.params.resturantId;

    const resturant = await getSpecificRestaurant(resturantId);

    res.status(200).json({ resturant });
  },
  showUserSpecificFoodItem: async (req: Request, res: Response) => {
    const FoodId = req.params.FoodId;

    const foodItem = await queryFoodsIngredients(FoodId);

    res.status(200).json({ foodItem });
  },
  userAddToCart: async (req: any, res: Response) => {
    const foodId = req.params.FoodId;
    const userId = req.user.uid;

    const food = await addToCart(userId, foodId);

    res.status(200).json({ food, msg: "Added To Cart" });
  },
  viewCartItems: async (req: any, res: Response) => {
    const user = await getUserCartItems(req);

    if (user) {
      const cartPriceArray = user.cart.map((item) => item.price);
      const totalPrice = cartPriceArray.reduce((prev, curr) => {
        return prev + curr;
      }, 0);

      res.status(200).json({ user, totalPrice });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  removeItemFromCart: async (req: Request, res: Response) => {
    const foodId: string = req.params.foodId;
    const food = await removeFromCart(foodId);

    if (food) {
      res.status(200).json({ food });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  userOrderFood: async (req: any, res: Response) => {
    const { orderType } = req.body;

    const order = await OrderItems(req.user.uid, orderType);

    // This is gonna return massive data of Order items, Admin, Delivery Person, all of them from same city
    res.status(200).json({ order, msg: "Order Placed" });
  },
  userGetAllOrders: async (req: any, res: Response) => {
    const order = await ViewOrderedItems(req.user.uid);

    res.status(200).json({ order });
  },
  userViewSpecificOrder: async (req: Request, res: Response) => {
    const order = await ViewSpecificOrder(req.params.OrderId);

    if (order) {
      res.status(200).json({ order });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  userCancelSpecificOrder: async (req: Request, res: Response) => {
    const orderId = req.params.OrderId;
    const { reason } = req.body;

    const order = await CancelOrder(orderId);

    if (order) {
      res.status(200).json({
        order,
        msg: "Order Cancelled, You will be refurbished",
        reason,
      });
    } else {
      res.status(500).json({
        msg:
          "Order not Cancelled, Order Either doesn't exsit or already Delivered",
      });
    }
  },
};
