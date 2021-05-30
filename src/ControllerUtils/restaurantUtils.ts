import { getRepository } from "typeorm";
import { Restaurant } from "../entities/Restaurant";
// import { Food } from "../entities/Food";

export const getRestaurantFoodItemsByCities = async (
  city: string
): Promise<Restaurant[] | undefined> => {
  const restaurantAndFood = await getRepository(Restaurant)
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.address", "address")
    // .leftJoinAndSelect("restaurant.items", "items") // not working
    .where("restaurant.available = :available", { available: true })
    .andWhere("address.city = :city", { city })
    .getMany();

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
