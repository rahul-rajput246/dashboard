import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../models/User";

const authorizeRoles =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };

export default authorizeRoles;
