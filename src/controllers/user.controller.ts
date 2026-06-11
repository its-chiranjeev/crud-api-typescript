import * as userService from "../services/user.service.js";
import { calculateAge } from "../utils/age.js";
import type { Request, Response } from "express";
import type { User } from "../types/index.js";

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(parseInt(String(req.query["page"])) || 1, 1);
    const limit = Math.max(parseInt(String(req.query["limit"])) || 10, 1);

    const { count } = await userService.getUsersCount();
    const totalPages = Math.ceil((count ?? 0) / limit);

    if (page > totalPages && totalPages > 0) {
      res.status(200).json({
        success: true,
        message: "No users found for this page",
        pagination: {
          currentPage: page,
          usersPerPage: limit,
          totalUsers: count,
          totalPages,
          hasNextPage: false,
          hasPreviousPage: true,
        },
        data: [],
      });
      return;
    }

    const offset = (page - 1) * limit;
    const { data, error } = await userService.getAllUsers(limit, offset);

    if (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }

    const usersWithAge = (data as User[]).map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      age: calculateAge(user.dob),
      created_at: user.created_at
        ? new Date(user.created_at).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,
          })
        : null,
    }));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      pagination: {
        currentPage: page,
        usersPerPage: limit,
        totalUsers: count,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      data: usersWithAge,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER BY ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
      return;
    }

    const { data, error } = await userService.getUserById(id);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (!data) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const user = data as User;

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        ...user,
        age: calculateAge(user.dob),
      },
    });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE USER
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, phone, dob } = req.body as Record<string, string>;

    if (!first_name || !last_name || !email || !phone || !dob) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      res.status(400).json({
        success: false,
        message: "Invalid phone number. Enter a valid 10-digit Indian mobile number.",
      });
      return;
    }

    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      res.status(400).json({ success: false, message: "Invalid DOB format" });
      return;
    }

    if (birthDate > new Date()) {
      res.status(400).json({ success: false, message: "DOB cannot be in the future" });
      return;
    }

    const ageInYears = new Date().getFullYear() - birthDate.getFullYear();
    if (ageInYears < 18) {
      res.status(400).json({ success: false, message: "User must be at least 18 years old" });
      return;
    }

    const age = calculateAge(dob);
    const { data, error } = await userService.createUser({ first_name, last_name, email, phone, dob });

    if (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }

    //data is an array from .select(), safely access index 0
    const created = Array.isArray(data) ? data[0] : null;
    res.status(201).json({ success: true, message: "User created successfully", data: { ...created, age } });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE USER
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
      return;
    }

    const body = req.body as Record<string, unknown>;

    const { data, error } = await userService.updateUser(id, body);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (!data || data.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const updated = data[0] as User;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        ...updated,
        age: calculateAge(updated.dob),
      },
    });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
      return;
    }

    const { data, error } = await userService.deleteUser(id);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (!data || data.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};