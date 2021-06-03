import { getRepository } from "typeorm";
import { Order, OrderStatus } from "../entities/Order";

export const ViewOrderAssigned = async (adminId: string): Promise<Order[]> => {
  const order = await getRepository(Order)
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.admin", "admin")
    .leftJoinAndSelect("order.Items", "food")
    .where("order.adminId = :adminId", { adminId })
    .getMany();

  return order;
};

export const ControlOrder = async (orderId: string, status: OrderStatus) => {
  const order = await Order.findOne(orderId);

  if (order) {
    order.status = status;
    await order.save();

    return order;
  } else {
    return undefined;
  }
};
