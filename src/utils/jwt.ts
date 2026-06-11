import jwt from "jsonwebtoken";
import type { User, JwtPayload } from "../types/index.js";

export const generateToken = (user: Pick<User, "id" | "email" | "role">): string => {
  const secret = process.env["JWT_SECRET"];
  // Validate JWT_SECRET at runtime instead of silently passing undefined
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    } satisfies JwtPayload,
    secret,
    { expiresIn: "1d" }
  );
};
