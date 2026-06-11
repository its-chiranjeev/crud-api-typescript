import supabase from "../config/supabase.js";
import type { Request, Response } from "express";

export const getAuditLogs = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }

  res.json(data);
};
