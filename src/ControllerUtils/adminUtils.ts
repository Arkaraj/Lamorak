import { getRepository } from "typeorm";
import { Order, OrderStatus } from "../entities/Order";
import fs from "fs";
import { Image } from "../entities/Image";
import { Food } from "../entities/Food";
const uploadPath = "/uploads/dishes";
import path from "path";

export const uploadImagesForFood = async (req: any, food: Food) => {
  let images: Image[] = [];
  let fileName = new Date().getTime();
  const files = req.files;
  await files.forEach(
    async (
      file: {
        mimetype: string;
        buffer:
          | string
          | Uint8Array
          | Uint8ClampedArray
          | Uint16Array
          | Uint32Array
          | Int8Array
          | Int16Array
          | Int32Array
          | BigUint64Array
          | BigInt64Array
          | Float32Array
          | Float64Array
          | DataView;
      },
      index: any
    ) => {
      try {
        if (
          !fs.existsSync(
            path.normalize(`${__dirname}/../..${uploadPath}/${fileName}`)
          )
        ) {
          fs.mkdirSync(
            path.normalize(`${__dirname}/../..${uploadPath}/${fileName}`)
          );
        }
        fs.writeFile(
          path.normalize(
            `${__dirname}/../..${uploadPath}/${fileName}/${fileName}${index}.${
              file.mimetype.split("/")[1]
            }`
          ),
          file.buffer,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(
              path.normalize(
                `${__dirname}/../..${uploadPath}/${fileName}/${fileName}${index}.${
                  file.mimetype.split("/")[1]
                }`
              )
            );
          }
        );
        const img = await Image.create({
          imagePath: `${uploadPath}/${fileName}/${fileName}${index}.${
            file.mimetype.split("/")[1]
          }`,
          food,
        }).save();
        images.push(img);
      } catch (e) {
        console.log(e);
        console.log("Error in saving");
        return;
        // throw "Error in saving";
      }
    }
  );
  return images;
};

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
