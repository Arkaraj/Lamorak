import { Food } from "../entities/Food";
import { getRepository } from "typeorm";
import { Restaurant } from "../entities/Restaurant";
// import { Food } from "../entities/Food";

export const getRestaurantFoodItemsByCities = async (
  city: string
): Promise<Restaurant[] | undefined> => {
  const restaurantAndFood = await getRepository(Restaurant)
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.address", "address")
    .leftJoinAndSelect("restaurant.items", "items")
    .where("restaurant.available = :available", { available: true })
    .andWhere("address.city = :city", { city })
    .andWhere("items.available = :available", { available: true })
    .getMany();

  return restaurantAndFood;
};

export const getSpecificRestaurant = async (Rid: string) => {
  const restaurantAndFood = await getRepository(Restaurant)
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.address", "address")
    .leftJoinAndSelect("restaurant.items", "items")
    .where("restaurant.available = :available", { available: true })
    .andWhere("restaurant.Rid = :Rid", { Rid })
    .getOne();

  return restaurantAndFood;
};

export const getRestaurantsByCities = async (
  city: string
): Promise<Restaurant[] | undefined> => {
  const restaurant = await getRepository(Restaurant)
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.address", "address")
    .andWhere("address.city = :city", { city })
    .getMany();

  return restaurant;
};

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  return await getRepository(Restaurant)
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.address", "address")
    .getMany();
};

export const makeRestaurantChange = async (Rid: string, available: boolean) => {
  const restaurant = await Restaurant.findOne(Rid);

  restaurant!.available = available;

  restaurant!.save();

  return restaurant;
};

export const deleteRestaurant = async (restaurantId: string) => {
  // Delete all the foods in the Restaurant
  await getRepository(Food)
    .createQueryBuilder("food")
    .delete()
    .from(Food)
    .where("food.restaurantId = :restaurantId", { restaurantId })
    .execute();

  const deletedRestaurant = await Restaurant.delete({ Rid: restaurantId });

  return deletedRestaurant;
};
