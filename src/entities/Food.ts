import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
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

  // F i misspelled it lol
  @Column("text")
  resturantId: string;

  @ManyToOne(() => Restaurant, (rest) => rest.items)
  @JoinColumn({ name: "resturantId" })
  restaurant: Restaurant;

  @ManyToMany(() => Ingredient, (ingred) => ingred.Ingid)
  @JoinTable()
  Ingredient: Ingredient[];
}
