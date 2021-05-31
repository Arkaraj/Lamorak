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
): Promise<Food | undefined> => {
  const food = await Food.createQueryBuilder("food")
    .leftJoinAndSelect("food.IngredientConnection", "ingredients")
    .where("food.Fid = :FoodId", { FoodId })
    .getOne();
  return food;
};
