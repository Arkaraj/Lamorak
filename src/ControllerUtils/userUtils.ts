import { Food } from "../entities/Food";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { Order, OrderStatus, OrderType } from "../entities/Order";
import { Delivery_Person } from "../entities/Delivery_Person";
import { Admin } from "../entities/Admin";

export const getUserWithAddress = async (req: any) => {
  const user = await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.address", "address")
    .where("User.uid = :id", { id: req.user.uid })
    .getOne();

  return user;
};

export const getUserCartItems = async (req: any): Promise<User | undefined> => {
  const user = await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.cart", "cart")
    .where("User.uid = :id", { id: req.user.uid })
    .getOne();

  return user;
};

export const addToCart = async (userId: string, foodId: string) => {
  const food = await Food.findOne(foodId);
  const user = await User.findOne(userId);

  food!.userId = userId;
  food!.user = user!;
  food!.quantity = food!.quantity - 1;
  food!.available = food!.quantity === 0 ? false : true;

  await food!.save();

  return food;
};

export const removeFromCart = async (foodId: string) => {
  const food = await Food.findOne(foodId);

  food!.userId = null;
  food!.quantity = food!.quantity + 1;
  food!.available = true;

  await food!.save();

  return food;
};

export const ViewOrderedItems = async (userId: string) => {
  return await Order.find({
    where: { uid: userId },
    order: { Oid: "DESC" },
  });
};
export const ViewSpecificOrder = async (orderId: string) => {
  return await getRepository(Order)
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.Items", "items")
    .leftJoinAndSelect("items.restaurant", "restaurant")
    .leftJoinAndSelect("order.Delivery_Person", "DP") // not necessary
    .where("order.Oid = :orderId", { orderId })
    .getOne();
};

export const OrderItems = async (userId: string, method: OrderType) => {
  const user = await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.cart", "cart")
    .leftJoinAndSelect("User.address", "address")
    .where("User.uid = :id", { id: userId })
    .getOne();

  const cartPriceArray = user?.cart.map((item) => item.price);
  const totalPrice = cartPriceArray?.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  const newOrder = Order.create({
    uid: userId,
    Items: user?.cart,
    totalPrice,
    type: method,
    status: OrderStatus.PLACED, // default
  });

  const deliveryPerson = await getRepository(Delivery_Person)
    .createQueryBuilder("DP")
    .leftJoinAndSelect("DP.address", "addr")
    .leftJoinAndSelect("DP.orderId", "order")
    .where("addr.city = :city", { city: user?.address.city })
    .andWhere("DP.available = :bool", { bool: true })
    .getMany();

  const adminPerson = await getRepository(Admin)
    .createQueryBuilder("admin")
    .leftJoinAndSelect("admin.address", "adr")
    .where("adr.city = :city", { city: user?.address.city })
    .getMany();

  // Now sort Delivery Persons by less Orders

  const numOfOrders = deliveryPerson
    .map((DP, indx) => {
      return { value: DP.orderId.length, indx };
    })
    .sort((a, b) => {
      return a.value - b.value;
    });

  const indx: number = numOfOrders[0].indx;

  newOrder.DPId = deliveryPerson[indx].DPid;

  newOrder.Delivery_Person = deliveryPerson[indx];

  var admin = adminPerson[Math.floor(Math.random() * adminPerson.length)];

  newOrder.adminId = admin.Adminid;
  newOrder.admin = admin;

  // empty cart
  user!.cart = [];
  await user?.save();
  await newOrder.save();

  // like finally
  return newOrder;
};
export const CancelOrder = async (orderId: string) => {
  const order = await Order.findOne(orderId);

  if (order?.status != OrderStatus.DELIVERED) {
    order!.status = OrderStatus.CANCELLED;
  } else {
    return undefined;
  }

  await order!.save();

  return order;
};
