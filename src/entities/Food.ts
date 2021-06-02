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
import { Order } from "./Order";
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

  @Column("text", { nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (usr) => usr.cart)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column("text", { nullable: true })
  orderId: string | null;

  @ManyToOne(() => Order, (order) => order.Items)
  @JoinColumn({ name: "orderId" })
  order: Order;
}
