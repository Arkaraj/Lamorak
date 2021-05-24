import { Response, Request } from "express";
// Import models here

export default {
  getAllUsers: (_req: Request, res: Response) => {
    res.send("Hello Lamorak");
  },
};
