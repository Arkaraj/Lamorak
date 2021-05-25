import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  Addressid: string;

  @Column("text")
  city: string;

  @Column("text")
  state: string;

  @Column("text")
  Country: string;

  @Column("text")
  location: string;

  @Column("text")
  pincode: string;
}
