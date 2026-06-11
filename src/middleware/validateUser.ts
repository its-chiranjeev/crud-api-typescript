import type { Request, Response, NextFunction } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { first_name, last_name, email, phone, dob } = req.body as Record<string, unknown>;

  // BUG FIX: Corrected grammar in error message ("FIll up all fields" → "All fields")
  if (!first_name || !last_name || !email || !phone || !dob) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  // Phone validation
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(String(phone))) {
    res.status(400).json({
      message: "Invalid phone number",
    });
    return;
  }

  // DOB validation
  const birthDate = new Date(String(dob));

  if (isNaN(birthDate.getTime())) {
    res.status(400).json({
      message: "Invalid DOB format",
    });
    return;
  }

  if (birthDate > new Date()) {
    res.status(400).json({
      message: "DOB cannot be in the future",
    });
    return;
  }

  next();
};
