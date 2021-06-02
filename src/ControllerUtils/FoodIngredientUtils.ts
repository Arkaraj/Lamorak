import { FoodIngredient } from "../entities/FoodIngredient";
import { Food } from "../entities/Food";
import { Ingredient } from "../entities/Ingredient";

export const deleteFoodfromIng = async (FoodId: string) => {
  await FoodIngredient.delete({ FoodId });
  await Food.delete({ Fid: FoodId });

  return true;
};

export const deleteIngfromFood = async (Ingid: string) => {
  await FoodIngredient.delete({ IngredientId: Ingid });
  await Ingredient.delete({ Ingid });

  return true;
};

export const queryFoodsIngredients = async (
  FoodId: string
): Promise<FoodIngredient[]> => {
  const food = await FoodIngredient.createQueryBuilder("fi")
    .leftJoinAndSelect("fi.Food", "food")
    .leftJoinAndSelect("fi.Ingredient", "ingredient")
    .where("fi.FoodId = :FoodId", { FoodId })
    .getMany();
  return food;
};

export const queryAllFoodsAlongWithIngredients = async (): Promise<
  FoodIngredient[]
> => {
  return await FoodIngredient.createQueryBuilder("fi")
    .leftJoinAndSelect("fi.Food", "food")
    .leftJoinAndSelect("fi.Ingredient", "ingredient")
    .getMany();
};
