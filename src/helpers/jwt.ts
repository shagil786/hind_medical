import {expressjwt} from "express-jwt";

function authJwt() {
  const secret = process.env.NEXTAUTH_SECRET!;

  return expressjwt({ secret: secret, algorithms: ["HS256"] }).unless({ path: [] });
}

export { authJwt };
