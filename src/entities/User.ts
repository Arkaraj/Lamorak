import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./Address";
import { Food } from "./Food";

import { Order } from "./Order";
import { Rating } from "./Rating";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column("varchar", { unique: true, length: 150 })
  email: string;

  @Column("text")
  userName: string;

  @Column("text")
  password: string;

  @Column({ default: 0.0 })
  balance: number;

  // Real Life it should be Many To Many
  @OneToMany(() => Food, (f) => f.user)
  cart: Food[];

  @OneToMany(() => Order, (ord) => ord.Oid)
  Order: Order[];

  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Rating, (r) => r.RestaurantId)
  restaurantRatingConnection: Rating[];
}
