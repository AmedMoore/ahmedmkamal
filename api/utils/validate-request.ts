import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
}
