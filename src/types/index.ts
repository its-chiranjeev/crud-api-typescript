export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  created_at?: string;
}

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
}

export interface AuditLog {
  id: number;
  user_id: number;
  action: string;
  ip_address: string | null;
  created_at: string;
}
