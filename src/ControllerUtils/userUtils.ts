import { Food } from "../entities/Food";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const getUserWithAddress = async (req: any) => {
  const user = await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.address", "address")
    .where("User.uid = :id", { id: req.user.uid })
    .getOne();

  return user;
};

export const getUserCartItems = async (req: any): Promise<User | undefined> => {
  const user = await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.cart", "cart")
    .where("User.uid = :id", { id: req.user.uid })
    .getOne();

  return user;
};

export const addToCart = async (userId: string, foodId: string) => {
  const food = await Food.findOne(foodId);
  const user = await User.findOne(userId);

  food!.userId = userId;
  food!.user = user!;

  await food!.save();

  return food;
};

export const removeFromCart = async (foodId: string) => {
  const food = await Food.findOne(foodId);

  food!.userId = null;

  await food!.save();

  return food;
};

export const ViewOrderedItems = async (userId: string, foodId: string) => {};
export const OrderItems = async (userId: string) => {};
export const CancelOrder = async (userId: string, foodId: string) => {};
