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

  @OneToMany(() => Order, (ord) => ord.Oid)
  Order: Order[];

  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Address;
}
