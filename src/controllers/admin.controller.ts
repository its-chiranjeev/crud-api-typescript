import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import { createAuditLog } from "../services/audit.service.js";
import type { Request, Response } from "express";

type UserInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password, phone, dob } =
      req.body as UserInput;

    if (!password) {
      res.status(400).json({ success: false, message: "Password is required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          phone,
          dob,
          role: "USER",
          status: "APPROVED",
        },
      ])
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }

    if (req.user?.id) {
      await createAuditLog(req.user.id, `Created User: ${email}`, req.ip);
    }

    res.status(201).json({ success: true, user: data });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }

    res.status(200).json({ success: true, users: data });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .update(req.body)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }

    if (req.user?.id) {
      await createAuditLog(req.user.id, `Updated User ID ${userId}`, req.ip);
    }

    res.status(200).json({ success: true, user: data });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};