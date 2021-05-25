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
import { Food } from "./Food";
import { Order } from "./Order";

@Entity()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  Rid: string;

  @Column("text")
  name: string;

  @Column("text")
  tag: string;

  @Column("boolean", { default: true })
  available: boolean;

  @OneToMany(() => Food, (food) => food.Fid)
  items: Promise<Food[]>;

  @OneToMany(() => Order, (ord) => ord.Oid)
  Orders: Promise<Order[]>;

  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Promise<Address>;
}
