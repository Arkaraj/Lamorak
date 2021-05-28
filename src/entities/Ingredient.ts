import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Food } from "./Food";

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  Ingid: string;

  @Column("text")
  name: string;

  @ManyToMany(() => Food, (food) => food.Fid)
  @JoinTable()
  Fid: Food[];
}
