import express from "express";
import { sendEmail } from "../services/email.service.js";
import type { Request, Response } from "express";

const router = express.Router();

router.post("/test-email", async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };

    await sendEmail(email, "Test Email from CRUD API", "This is a test email. Your SMTP setup is working 🚀");

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
