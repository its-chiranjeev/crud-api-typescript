import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import type { SignupData, User } from "../types/index.js";

export const signup = async (
  userData: SignupData
): Promise<{ data: User | null; error: { message: string } | null }> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        dob: userData.dob,
        password: hashedPassword,
        role: "USER",
        status: "PENDING",
      },
    ])
    .select()
    .single();

  return { data: data as User | null, error };
};

export const login = async (
  email: string,
  password: string
): Promise<{ data?: User; error?: { message: string } }> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return { error: { message: "Invalid credentials" } };
  }

  const user = data as User;

  // BUG FIX: user.password could be undefined if the column is excluded — guard it
  if (!user.password) {
    return { error: { message: "Invalid credentials" } };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { error: { message: "Invalid credentials" } };
  }

  if (user.status !== "APPROVED") {
    return { error: { message: "Account pending super admin approval" } };
  }

  return { data: user };
};
