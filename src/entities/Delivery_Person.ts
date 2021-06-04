import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./Address";
import { Order } from "./Order";

@Entity()
export class Delivery_Person extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  DPid: string;

  @Column("text")
  name: string;

  @Column("boolean", { default: true })
  available: boolean;

  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Order, (ord) => ord.Delivery_Person)
  orderId: Order[];
}
