import jwt from "jsonwebtoken";

export const generateJwt = (nic: string): string => {
  return jwt.sign({ nic: nic }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
