import supabase from "../config/supabase.js";
import { createAuditLog } from "../services/audit.service.js";
import type { Request, Response } from "express";

export const approveUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .update({ status: "APPROVED" })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    await createAuditLog(
      req.user!.id,
      `Approved User ID ${id}`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: "User approved successfully",
      user: data,
    });
  } catch (error) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const rejectUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .update({ status: "REJECTED" })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    await createAuditLog(
      req.user!.id,
      `Rejected User ID ${id}`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: "User rejected successfully",
      user: data,
    });
  } catch (error) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const makeAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .update({ role: "ADMIN" })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    await createAuditLog(
      req.user!.id,
      `Promoted User ID ${id} to ADMIN`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: "User promoted to ADMIN successfully",
      user: data,
    });
  } catch (error) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};