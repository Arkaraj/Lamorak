import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

// For many to many for Food and Ingredient
@Entity()
export class Rating extends BaseEntity {
  @PrimaryColumn("uuid")
  userId: string;

  @PrimaryColumn("uuid")
  RestaurantId: string;

  @Column("float", { default: 0 })
  rating: number;

  @ManyToOne(() => User, (usr) => usr.restaurantRatingConnection, {
    primary: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Restaurant, (rest) => rest.userRatingConnection, {
    primary: true,
  })
  @JoinColumn({ name: "RestaurantId" })
  Restaurant: Restaurant;
}
