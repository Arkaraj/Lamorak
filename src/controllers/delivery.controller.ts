import { Response, Request } from "express";

export default {
  viewOrders: async (_req: Request, _res: Response) => {},
  viewSpecificOrders: async (_req: Request, _res: Response) => {},
  orderDelivered: async (_req: Request, _res: Response) => {},
  changeStatus: async (_req: Request, _res: Response) => {},
};
