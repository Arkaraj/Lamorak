import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Food } from "./Food";
import { Ingredient } from "./Ingredient";

// For many to many for Food and Ingredient
@Entity()
export class FoodIngredient extends BaseEntity {
  @PrimaryColumn()
  FoodId: string;

  @PrimaryColumn()
  IngredientId: string;

  @ManyToOne(() => Food, (food) => food.IngredientConnection, { primary: true })
  @JoinColumn({ name: "FoodId" })
  Food: Food;

  @ManyToOne(() => Ingredient, (ing) => ing.FoodConnection, { primary: true })
  @JoinColumn({ name: "IngredientId" })
  Ingredient: Ingredient;
}
