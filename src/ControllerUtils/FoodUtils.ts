import { Food } from "../entities/Food";

export const makeItemsChange = async (Fid: string, available: boolean) => {
  const food = await Food.findOne(Fid);

  food!.available = available;

  food!.save();

  return food;
};
