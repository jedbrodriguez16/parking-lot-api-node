import { validationResult } from "express-validator";

export default function validateRequest() {
  return function validateRequest(req, res, next) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      let errors = validationErrors.array().map((item) => item.msg);
      return res.status(400).json({ validationErrors: errors });
    }

    next();
  };
}
