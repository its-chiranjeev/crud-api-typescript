import supabase from "../config/supabase.js";

export const getAllUsers = async (limit: number, offset: number) => {
  const from = offset;
  const to = offset + limit - 1;

  return supabase
    .from("users")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(from, to);
};

export const getUsersCount = async () => {
  return supabase
    .from("users")
    .select("*", { count: "exact", head: true });
};

export const getUserById = async (id: string | number) => {
  return supabase
    .from("users")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();
};

export const createUser = async (userData: Record<string, unknown>) => {
  return supabase.from("users").insert([userData]).select();
};

export const updateUser = async (
  id: string | number,
  userData: Record<string, unknown>
) => {
  return supabase.from("users").update(userData).eq("id", id).select();
};

export const deleteUser = async (id: string | number) => {
  return supabase.from("users").delete().eq("id", id).select();
};
