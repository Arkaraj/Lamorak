import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Ingredient } from "./Ingredient";

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

  @ManyToMany(() => Ingredient, (ingred) => ingred.Ingid)
  @JoinTable()
  Ingredient: Promise<Ingredient[]>;
}
