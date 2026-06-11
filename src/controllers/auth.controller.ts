import { signup, login } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import { createAuditLog } from "../services/audit.service.js";
import { sendEmail } from "../services/email.service.js";
import type { Request, Response } from "express";
import type { SignupData } from "../types/index.js";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await signup(req.body as SignupData);

    if (error) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }

    // Non-blocking email notification to super admin
    sendEmail(
      process.env["SUPER_ADMIN_EMAIL"],
      "New User Registration Request",
      `New Registration Request\nName: ${data?.first_name ?? ""} ${data?.last_name ?? ""}\nEmail: ${data?.email ?? ""}\nPhone: ${data?.phone ?? "N/A"}\nStatus: ${data?.status ?? "pending"}\nRegistration Time: ${data?.created_at ?? new Date().toISOString()}`
    ).catch((err: Error) => console.error("Email error:", err.message));

    res.status(201).json({
      success: true,
      message: "Registration request submitted successfully",
      user: data,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const result = await login(email, password);

    if (result.error) {
      res.status(400).json({ success: false, message: result.error.message });
      return;
    }

    const user = result.data!;

    // Non-blocking audit log
    createAuditLog(user.id, "User Login", req.ip).catch((err: Error) =>
      console.error("Audit log error:", err.message)
    );

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};
