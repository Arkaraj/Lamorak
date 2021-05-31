import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { FoodIngredient } from "./FoodIngredient";

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  Ingid: string;

  @Column("text")
  name: string;

  @OneToMany(() => FoodIngredient, (fi) => fi.FoodId)
  FoodConnection: FoodIngredient[];
}
