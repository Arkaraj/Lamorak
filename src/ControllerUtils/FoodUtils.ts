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
    max = 99999999,
    rating = 0; // max = Infinity not working

  if (req.query.min) {
    min = parseInt(req.query.min);
  }
  if (req.query.max) {
    max = parseInt(req.query.max);
  }
  if (req.query.rating) {
    rating = parseInt(req.query.rating);
  }

  return await Food.createQueryBuilder("food")
    .leftJoinAndSelect("food.restaurant", "restaurant")
    .leftJoinAndSelect("restaurant.address", "addr")
    .where("food.name like :foodName", { foodName: `%${foodName}%` })
    .andWhere("restaurant.available = :bool", { bool: true })
    .andWhere("food.available = :bool", { bool: true })
    .andWhere("addr.city = :city", { city })
    .andWhere("food.price >= :min and food.price <= :max", { min, max })
    .andWhere("restaurant.totalRating >= :rating", { rating })
    .getMany();
};
