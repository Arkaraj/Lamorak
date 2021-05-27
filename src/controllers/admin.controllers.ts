import { Response, Request } from "express";
import JWT from "jsonwebtoken";
import { Admin } from "../entities/Admin";

const signToken = (id: string) => {
  return JWT.sign(
    {
      iss: "https://github.com/Arkaraj",
      sub: id,
      isAdmin: true,
    },
    `${process.env.SECRET}`,
    { expiresIn: "30d" }
  ); // '30d'
};

export default {
  loginAdmin: async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;

    Admin.findOne({ where: { email } }).then((admin) => {
      if (!admin) {
        res
          .status(400)
          .json({ message: { msg: "Invalid Admin Email", msgError: true } });
      } else {
        // Logged in
        const token = signToken(admin.Adminid);
        res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: true,
        });
        res.status(200).json({
          admin,
          isAdminAuth: true,
          message: { msgError: false },
        });
      }
    });
  },
  viewAdmin: async (_req: Request, _res: Response) => {},
};
