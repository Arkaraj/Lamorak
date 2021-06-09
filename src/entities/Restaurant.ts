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

  @Column("float", { nullable: true })
  discount: number | null;

  // @Column({ default: 0 })
  // rating: number;

  @OneToMany(() => Food, (food) => food.restaurant)
  items: Food[];

  @OneToMany(() => Order, (ord) => ord.Oid)
  Orders: Order[];

  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Address;
}
