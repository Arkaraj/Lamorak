import { Response, Request } from "express";
import JWT from "jsonwebtoken";
import { Ingredient } from "../entities/Ingredient";
import { Admin } from "../entities/Admin";
import { Food } from "../entities/Food";
import { Restaurant } from "../entities/Restaurant";
import { getRepository } from "typeorm";
import { Address } from "../entities/Address";
import { FoodIngredient } from "../entities/FoodIngredient";
import {
  deleteRestaurant,
  getAllRestaurants,
  getSpecificRestaurants,
  makeRestaurantChange,
} from "../ControllerUtils/restaurantUtils";
import { queryAllFoodsAlongWithIngredients } from "../ControllerUtils/FoodIngredientUtils";
import { makeItemsChange } from "../ControllerUtils/FoodUtils";
import { Order, OrderStatus } from "../entities/Order";
import { ControlOrder, ViewOrderAssigned } from "../ControllerUtils/adminUtils";
import { Delivery_Person } from "../entities/Delivery_Person";

const signToken = (id: string) => {
  return JWT.sign(
    {
      iss: "https://github.com/Arkaraj",
      sub: id,
      isAdmin: true,
    },
    `${process.env.SECRET}`,
    { expiresIn: "30d" }
  ); // '30d'
};

export default {
  loginAdmin: async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;

    Admin.findOne({ where: { email } }).then((admin) => {
      if (!admin) {
        res
          .status(400)
          .json({ message: { msg: "Invalid Admin Email", msgError: true } });
      } else {
        // Logged in
        const token = signToken(admin.Adminid);
        res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: true,
        });
        res.status(200).json({
          admin,
          isAdminAuth: true,
          message: { msgError: false },
        });
      }
    });
  },
  viewAdmin: async (req: any, res: Response) => {
    const admin = await Admin.findOne(req.user.Adminid);

    if (admin) {
      res.status(200).json({ admin });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  addRestaurant: async (req: Request, res: Response) => {
    const { name, tag }: { name: string; tag: string } = req.body;

    const restaurant = await Restaurant.create({
      name,
      tag,
      available: true,
      items: [],
      Orders: [],
    }).save();

    res.status(200).json({ restaurant });
  },
  addAddressToRestaurant: async (req: Request, res: Response) => {
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
        const restRepo = getRepository(Restaurant);

        const restaurant = await restRepo.findOne(req.params.rId);
        if (restaurant && address) {
          restaurant.address = address;
        }
        await restaurant?.save();

        res.status(200).json({ address, restaurant });
      });
  },
  addDish: async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    const {
      name,
      description,
      quantity,
      price,
    }: {
      name: string;
      description: string;
      quantity: number;
      price: number;
    } = req.body;

    const restaurant = await Restaurant.findOne(restaurantId);

    if (restaurant) {
      const food = await Food.create({
        name,
        description,
        quantity,
        price,
        restaurantId,
        IngredientConnection: [],
        userId: null,
        orderOid: null,
      }).save();
      // food.restaurant = restaurant
      // await food.save()

      food.restaurant = restaurant;

      res.status(200).json({ food, restaurant });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  addIngredient: async (req: Request, res: Response) => {
    const { name }: { name: string } = req.body;

    const ingredient = await Ingredient.create({ name }).save();

    res.status(200).json({ ingredient, msg: "Created Ingredient" });
  },
  addAddress: async (req: any, res: Response) => {
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
        const userRepo = getRepository(Admin);

        const admin = await userRepo.findOne(req.user.Adminid);
        if (admin && address) {
          admin.address = address;
        }
        await admin?.save();

        res.status(200).json({ address, admin: admin });
      });
  },
  addRestaurantAddress: async (req: Request, res: Response) => {
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

    const resturant = await Restaurant.findOne(req.params.restaurantId);
    if (resturant) {
      const address = await Address.create({
        city,
        state,
        Country,
        location,
        pincode,
        phone,
      }).save();

      resturant.address = address;

      await resturant.save();

      res.status(200).json({ resturant });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  addIngredientToFood: async (req: Request, res: Response) => {
    const { foodId, IngId } = req.params;

    const food = await Food.findOne(foodId);
    const ingredient = await Ingredient.findOne(IngId);

    if (food && ingredient) {
      const food_Ingredient = await FoodIngredient.create({
        FoodId: foodId,
        IngredientId: IngId,
        Food: food,
        Ingredient: ingredient,
      }).save();
      // food.Ingredient = [...food.Ingredient, ingredient];
      // ingredient.Fid = [...ingredient.Fid, food];

      res
        .status(200)
        .json({ food, ingredient, food_Ingredient: food_Ingredient });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  removeIngredientToFood: async (req: Request, res: Response) => {
    const { foodId, IngId } = req.params;

    const food_Ingredient = await FoodIngredient.delete({
      FoodId: foodId,
      IngredientId: IngId,
    });

    res.status(200).json({ food_Ingredient: food_Ingredient });
  },

  restaurantClosed: async (req: Request, res: Response) => {
    const Rid = req.params.Rid;
    // true or false
    const { available } = req.body;

    const restaurant = await makeRestaurantChange(Rid, available);

    if (restaurant) {
      res.status(200).json({ restaurant });
    } else {
      res.status(500).json({ msg: "Invalid Restaurant Id given...." });
    }
  },

  dishOver: async (req: Request, res: Response) => {
    const Fid = req.params.Fid;
    // true or false
    const { available }: { available: boolean } = req.body;

    const food = await makeItemsChange(Fid, available);

    if (food) {
      res.status(200).json({ food });
    } else {
      res.status(500).json({ msg: "Invalid Food Id given...." });
    }
  },

  getAllRestaurant: async (_req: Request, res: Response) => {
    const restaurant = await getAllRestaurants();

    res.status(200).json({ restaurant });
  },
  getSpecificRestaurant: async (req: Request, res: Response) => {
    const restaurant = await getSpecificRestaurants(req.params.Rid);

    res.status(200).json({ restaurant });
  },
  getAllDishes: async (_req: Request, res: Response) => {
    const foodList = await Food.find();

    res.status(200).json({ dishes: foodList });
  },
  getAllDishesAndIngredients: async (_req: Request, res: Response) => {
    const foodList = await queryAllFoodsAlongWithIngredients();

    res.status(200).json({ dishes: foodList });
  },
  getAllIngredients: async (_req: Request, res: Response) => {
    const ingredient = await Ingredient.find();
    res.status(200).json({ ingredient });
  },

  DeleteSpecificRestaurant: async (req: Request, res: Response) => {
    const deletedRestaurant = await deleteRestaurant(req.params.rId);

    res.status(200).json({ deletedRestaurant });
  },
  DeleteSpecificFood: async (req: Request, res: Response) => {
    const Fid = req.params.foodId;

    const deletedFood = await Food.delete({ Fid });
    res.status(200).json({ deletedFood });
  },
  DeleteSpecificIngredient: async (req: Request, res: Response) => {
    const Ingid = req.params.ingredientId;

    const deletedIngredient = await Ingredient.delete({ Ingid });
    res.status(200).json({ deletedIngredient });
  },
  ViewAllOrders: async (_req: Request, res: Response) => {
    const order = await Order.find();

    res.status(200).json({ order });
  },
  ViewAssignedOrders: async (req: any, res: Response) => {
    const adminId = req.user.Adminid;

    const order = await ViewOrderAssigned(adminId);

    res.status(200).json({ order });
  },
  ControlOrders: async (req: Request, res: Response) => {
    let { status }: { status: OrderStatus } = req.body;

    const orderId = req.params.Oid;

    const order = await ControlOrder(orderId, status);

    if (order) {
      res.status(200).json({ order });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  addDeliveryPerson: async (req: Request, res: Response) => {
    const { name } = req.body;

    const dperson = await Delivery_Person.create({
      name,
      available: true,
    }).save();

    res
      .status(200)
      .json({ Delivery_Person: dperson, msg: "Created New Delivery Person" });
  },
  ViewDeliveryPerson: async (_req: Request, res: Response) => {
    const dperson = await Delivery_Person.find();

    res.status(200).json({ Delivery_Person: dperson });
  },
};
