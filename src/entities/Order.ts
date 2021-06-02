import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  //   OneToMany,
} from "typeorm";
import { Admin } from "./Admin";
import { Delivery_Person } from "./Delivery_Person";
import { Food } from "./Food";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

export enum OrderType {
  COD = "COD",
  NET_BANKING = "NET_BANKING",
}

export enum OrderStatus {
  PLACED = "PLACED",
  PAYED = "PAYED",
  ON_TRANSPORT = "ON_TRANSPORT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  Oid: string;

  @Column({ default: 0.0 })
  totalPrice: number;

  @Column({ type: "enum", enum: OrderType, default: OrderType.COD })
  type: OrderType;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PLACED })
  status: OrderStatus;

  @Column()
  uid: string;

  @Column()
  Rid: string;

  @Column()
  adminId: string;

  @Column()
  DPId: string;

  @ManyToOne(() => User, (usr) => usr.Order)
  @JoinColumn({ name: "uid" })
  user: User;

  @OneToMany(() => Food, (food) => food.order)
  Items: Food[];

  @ManyToOne(() => Admin, (admin) => admin.Order)
  @JoinColumn({ name: "adminId" })
  admin: Admin;

  // This is kindda pointless, should be many to many
  @ManyToOne(() => Restaurant, (rst) => rst.Orders)
  @JoinColumn({ name: "Rid" })
  Restaurant: Restaurant;

  @ManyToOne(() => Delivery_Person, (DP) => DP.orderId)
  @JoinColumn({ name: "DPId" })
  Delivery_Person: Delivery_Person;
}
