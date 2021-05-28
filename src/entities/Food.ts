import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Ingredient } from "./Ingredient";
import { Restaurant } from "./Restaurant";

@Entity()
export class Food extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  Fid: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column("int", { default: 1 })
  quantity: number;

  @Column("float")
  price: number;

  @ManyToOne(() => Restaurant, (rest) => rest.items)
  restaurant: Restaurant;

  @ManyToMany(() => Ingredient, (ingred) => ingred.Ingid)
  @JoinTable()
  Ingredient: Ingredient[];
}
