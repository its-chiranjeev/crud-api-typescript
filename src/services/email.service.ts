import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env["EMAIL_USER"],
    pass: process.env["EMAIL_PASS"],
  },
});

export const sendEmail = async (
  to: string | undefined,
  subject: string,
  text: string
): Promise<void> => {
  //: Guard against undefined recipient (e.g. SUPER_ADMIN_EMAIL not set)
  if (!to) {
    console.warn("sendEmail: recipient address is undefined, skipping");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"CRUD API App" <${process.env["EMAIL_USER"]}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully to:", to);
  } catch (error) {
    const err = error as Error;
    console.error("Email error:", err.message);
  }
};
