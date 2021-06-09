import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coupon extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  title: string;

  // Discount percentage, say 25% then 25
  @Column("float")
  value: number;

  @Column("boolean", { default: true })
  valid: boolean;

  @Column("int", { default: 0 })
  count: number;
}
