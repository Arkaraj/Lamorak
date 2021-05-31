import { Response, Request } from "express";
import JWT from "jsonwebtoken";
import { Ingredient } from "../entities/Ingredient";
import { Admin } from "../entities/Admin";
import { Food } from "../entities/Food";
import { Restaurant } from "../entities/Restaurant";
import { getRepository } from "typeorm";
import { Address } from "../entities/Address";
import { FoodIngredient } from "../entities/FoodIngredient";

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
  viewAdmin: async (_req: Request, _res: Response) => {},
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
    }: {
      city: string;
      state: string;
      Country: string;
      location: string;
      pincode: string;
    } = req.body;

    const addressRepo = getRepository(Address);

    const newAddress = addressRepo.create({
      city,
      state,
      Country,
      location,
      pincode,
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
    }: {
      city: string;
      state: string;
      Country: string;
      location: string;
      pincode: string;
    } = req.body;

    const addressRepo = getRepository(Address);

    const newAddress = addressRepo.create({
      city,
      state,
      Country,
      location,
      pincode,
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
    }: {
      city: string;
      state: string;
      Country: string;
      location: string;
      pincode: string;
    } = req.body;

    const resturant = await Restaurant.findOne(req.params.restaurantId);
    if (resturant) {
      const address = await Address.create({
        city,
        state,
        Country,
        location,
        pincode,
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
      FoodIngredient.create({
        FoodId: foodId,
        IngredientId: IngId,
        Food: food,
        Ingredient: ingredient,
      });
      // food.Ingredient = [...food.Ingredient, ingredient];
      // ingredient.Fid = [...ingredient.Fid, food];

      await food.save();
      await ingredient.save();

      res.status(200).json({ food, ingredient });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
};
