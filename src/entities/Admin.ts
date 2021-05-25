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

import { Order } from "./Order";

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  Adminid: string;

  @Column("varchar", { unique: true, length: 150 })
  email: string;

  @Column("text")
  name: string;

  @OneToMany(() => Order, (ord) => ord.Oid)
  Order: Promise<Order[]>;

  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Promise<Address>;
}
