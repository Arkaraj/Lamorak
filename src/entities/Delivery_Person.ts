import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
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
  address: Address;

  @OneToMany(() => Order, (ord) => ord.Oid)
  orderId: Order[];
}
