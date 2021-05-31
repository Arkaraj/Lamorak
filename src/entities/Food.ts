import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { FoodIngredient } from "./FoodIngredient";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

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

  @Column("text")
  restaurantId: string;

  @Column("boolean", { default: true })
  available: boolean;

  @ManyToOne(() => Restaurant, (rest) => rest.items)
  @JoinColumn({ name: "restaurantId" })
  restaurant: Restaurant;

  @OneToMany(() => FoodIngredient, (fi) => fi.IngredientId)
  IngredientConnection: FoodIngredient[];

  @ManyToOne(() => User, (usr) => usr.cart)
  // @JoinColumn({ name: "user_id" })
  @JoinColumn()
  user: User;
}