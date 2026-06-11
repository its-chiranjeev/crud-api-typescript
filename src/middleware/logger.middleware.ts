import type { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  console.log({
    method: req.method,
    route: req.originalUrl,
    user: req.user?.email,
    timestamp: new Date(),
  });
  next();
};
