import supabase from "../config/supabase.js";

export const createAuditLog = async (
  userId: number,
  action: string,
  ipAddress: string | undefined
): Promise<void> => {
  const { error } = await supabase.from("audit_logs").insert([
    {
      user_id: userId,
      action,
      ip_address: ipAddress ?? null,
    },
  ]);

  if (error) {
    console.error("Audit Log Error:", error.message);
  }
};
