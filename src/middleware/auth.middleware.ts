import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "../types/index.js";

// Augment Express Request to carry the decoded user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Access token required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    // BUG FIX: token can be undefined if the header has no space
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Malformed authorization header",
      });
      return;
    }

    const secret = process.env["JWT_SECRET"];
    if (!secret) throw new Error("JWT_SECRET is not set");

    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
