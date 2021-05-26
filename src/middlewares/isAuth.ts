import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { Request } from "express";
import { User } from "../entities/User";

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization Middleware
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: `${process.env.SECRET}`,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne(payload.sub);
        // const user = await User.find({ where: { uid: payload.sub } });
        if (user) {
          return done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
