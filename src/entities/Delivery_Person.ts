import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Order } from "./Order";

@Entity()
export class Delivery_Person extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  DPid: string;

  @Column("text")
  name: string;

  @OneToMany(() => Order, (ord) => ord.Oid)
  orderId: Promise<Order[]>;
}
