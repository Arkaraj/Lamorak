import { Food } from "../entities/Food";

export const makeItemsChange = async (Fid: string, available: boolean) => {
  const food = await Food.findOne(Fid);

  food!.available = available;

  food!.save();

  return food;
};

export const showFoodSearchedFor = async (
  foodName: string,
  city: string
): Promise<Food[]> => {
  return await Food.createQueryBuilder("food")
    .leftJoinAndSelect("food.restaurant", "restaurant")
    .leftJoinAndSelect("restaurant.address", "addr")
    .where("food.name like :foodName", { foodName: `%${foodName}%` })
    .andWhere("food.available = :bool", { bool: true })
    .andWhere("addr.city = :city", { city })
    .getMany();
};
