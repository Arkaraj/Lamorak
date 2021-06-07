import { Response, Request } from "express";
import { Address } from "../entities/Address";
import { getRepository } from "typeorm";
import { Delivery_Person as Delivery } from "../entities/Delivery_Person";
import {
  changeStatusofDelPerson,
  orderDelivered,
  viewOrders,
  viewSpecificOrder,
} from "../ControllerUtils/deliveryUtil";

export default {
  viewOrders: async (req: Request, res: Response) => {
    const order = await viewOrders(req.params.DPId);

    res.status(200).json({ order });
  },
  viewSpecificOrders: async (req: Request, res: Response) => {
    const order = await viewSpecificOrder(req.params.DPId, req.params.OrderId);

    res.status(200).json({ order });
  },
  addAddress: async (req: Request, res: Response) => {
    // add Address
    const {
      city,
      state,
      Country,
      location,
      pincode,
      phone,
    }: {
      city: string;
      state: string;
      Country: string;
      location: string;
      pincode: string;
      phone: string;
    } = req.body;

    const addressRepo = getRepository(Address);

    const newAddress = addressRepo.create({
      city,
      state,
      Country,
      location,
      pincode,
      phone,
    });

    // const newAddress = addressRepo.create(req.body);

    await addressRepo
      .save(newAddress)
      .catch((err) => {
        res.status(500).json({
          message: { msg: "Error has occured", msgError: true, err },
        });
      })
      .then(async (address) => {
        const dperson = await Delivery.findOne(req.params.DPId);
        if (dperson && address) {
          dperson.address = address;
        }
        await dperson?.save();

        res.status(200).json({ address, dperson });
      });
  },
  orderDelivered: async (req: Request, res: Response) => {
    const order = await orderDelivered(req.params.OrderId);

    if (order) {
      res.status(200).json({ order });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  changeStatus: async (req: Request, res: Response) => {
    const Dperson = await changeStatusofDelPerson(
      req.params.DPId,
      req.body.available
    );

    if (Dperson) {
      res.status(200).json({ Dperson });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
};
