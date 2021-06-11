import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Food } from "./Food";

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  imagePath: string;

  @Column("text")
  foodId: string;
  @ManyToOne(() => Food, (item) => item.images)
  @JoinColumn({ name: "foodId" })
  food: Food;
}
