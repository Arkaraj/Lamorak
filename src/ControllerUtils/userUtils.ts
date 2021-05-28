import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const getUserWithAddress = async (req: any) => {
  const user = await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.address", "address")
    .where("User.uid = :id", { id: req.user.uid })
    .getOne();

  return user;
};
