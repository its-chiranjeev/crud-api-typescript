import { body } from "express-validator";

export const signupValidator = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("phone").matches(/^[6-9]\d{9}$/).withMessage("Phone number must be 10 digits"),
  body("dob").notEmpty().withMessage("Date of birth required"),
];
