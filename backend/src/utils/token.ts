import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const generateToken = (userId: string, isAdmin: boolean): string => {
  return jwt.sign({ _id: userId, isAdmin }, JWT_SECRET, {
    expiresIn: "30d", // Token expiration (optional)
  });
};
