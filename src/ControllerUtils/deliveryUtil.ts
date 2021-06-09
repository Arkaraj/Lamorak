import { Delivery_Person as Delivery } from "../entities/Delivery_Person";
import { Order, OrderStatus } from "../entities/Order";

export const viewOrders = async (DPId: string) => {
  return await Order.createQueryBuilder("order")
    .leftJoinAndSelect("order.Items", "food")
    .leftJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("user.address", "adr")
    .where("order.DPId = :DPId", { DPId })
    .orderBy("order.Oid", "DESC")
    .getMany();
};

export const viewSpecificOrder = async (DPId: string, orderId: string) => {
  return await Order.createQueryBuilder("order")
    .leftJoinAndSelect("order.Items", "food")
    .leftJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("user.address", "adr")
    .where("order.DPId = :DPId", { DPId })
    .andWhere("order.Oid = :orderId", { orderId })
    .orderBy("order.Oid", "DESC")
    .getMany();
};

export const orderDelivered = async (orderId: string) => {
  const order = await Order.findOne(orderId);
  console.log(orderId);
  console.log(order);
  if (order) {
    order.status = OrderStatus.DELIVERED;
    await order.save();
    return order;
  } else {
    return undefined;
  }
};

export const changeStatusofDelPerson = async (
  DPId: string,
  available: boolean
) => {
  const Dperson = await Delivery.findOne(DPId);

  if (Dperson) {
    Dperson.available = available;
    await Dperson.save();

    return Dperson;
  } else {
    return undefined;
  }
};
