import { Food } from "../entities/Food";

export const makeItemsChange = async (Fid: string, available: boolean) => {
  const food = await Food.findOne(Fid);

  food!.available = available;

  food!.save();

  return food;
};

export const showFoodSearchedFor = async (
  foodName: string,
  city: string,
  req?: any
): Promise<Food[]> => {
  let min = 0,
    max = 99999999; // Infinity not working

  if (req.query.min) {
    min = parseInt(req.query.min);
  }
  if (req.query.max) {
    max = parseInt(req.query.max);
  }

  return await Food.createQueryBuilder("food")
    .leftJoinAndSelect("food.restaurant", "restaurant")
    .leftJoinAndSelect("restaurant.address", "addr")
    .where("food.name like :foodName", { foodName: `%${foodName}%` })
    .andWhere("food.available = :bool", { bool: true })
    .andWhere("addr.city = :city", { city })
    .andWhere("food.price >= :min and food.price <= :max", { min, max })
    .getMany();
};
