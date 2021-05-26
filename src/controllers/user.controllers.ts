import { Response, Request } from "express";
import { getRepository } from "typeorm";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// Models
import { User } from "../entities/User";

const signToken = (id: string) => {
  return JWT.sign(
    {
      iss: "https://github.com/Arkaraj",
      sub: id,
    },
    `${process.env.SECRET}`,
    { expiresIn: "1h" }
  ); // '30d'
};

export default {
  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const user = await User.find();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSpecificUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ where: { uid: req.params.id } });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  registerUser: async (req: Request, res: Response) => {
    // Add address later
    const {
      userName,
      email,
      password,
    }: { userName: string; email: string; password: string } = req.body;

    try {
      User.find({ where: { email } }).then(async (user) => {
        if (user.length > 0) {
          res.status(400).json({
            message: { msg: "Email is already taken", msgError: true },
          });
        } else {
          const userRepo = getRepository(User);

          const hash = await bcrypt.hash(password, 10);

          const newUser = userRepo.create({ userName, email, password: hash });

          await userRepo.save(newUser).catch((err) => {
            res.status(500).json({
              message: { msg: "Error has occured", msgError: true, err },
            });
          });
          // User saved successfully
          res.status(200).json(user);
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const userRepo = getRepository(User);

    userRepo.findOne({ where: { email } }).then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: { msg: "Invalid Email", msgError: true } });
      } else {
        bcrypt.compare(password, user.password, (err, validate) => {
          if (err) {
            res.status(500).json({
              message: { msg: "Error has occured in bcrypt", msgError: true },
            });
          }
          if (!validate) {
            res
              .status(400)
              .json({ message: { msg: "Invalid Password", msgError: true } });
          } else {
            // Logged in
            const token = signToken(user.uid);
            // httpOnly doesn't let client side js touch the cookie saves from cross scripting attacks
            res.cookie("access_token", token, {
              httpOnly: true,
              sameSite: true,
            });
            res.status(200).json({
              user,
              isAuthenticated: true,
              message: { msgError: false },
            });
          }
        });
      }
    });
  },

  logoutUser: async (_req: Request, res: Response) => {
    res.clearCookie("access_token");

    res.status(200).json({ msg: "Logged out", user: {}, success: true });
  },
};
