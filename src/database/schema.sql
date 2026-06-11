-- Users table
create table users (
  id bigint primary key generated always as identity,
  first_name text not null,
  last_name text not null,
  email text unique not null,
  phone text,
  dob text,
  password text,
  role text default 'USER',
  status text default 'PENDING',
  created_at timestamptz default now()
);

-- Audit logs table
create table audit_logs (
  id bigint primary key generated always as identity,
  user_id bigint references users(id),
  action text not null,
  ip_address text,
  created_at timestamptz default now()
);