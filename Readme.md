# 🚀 CRUD API with TypeScript, Express & Supabase

A secure and scalable REST API built with **Node.js**, **Express.js**, **TypeScript**, and **Supabase** featuring authentication, role-based authorization, audit logging, and email notifications.

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt

### 👥 Authorization

* USER
* ADMIN
* SUPER_ADMIN

Role-based route protection using middleware.

### 📋 User Management

* Create User
* Get Users
* Update User
* Approve User
* Reject User
* Promote User to Admin

### 📧 Email Notifications

* Registration Request Notification
* User Approval Notification
* User Rejection Notification

### 📝 Audit Logs

Tracks important activities:

* User Login
* User Approval
* User Rejection
* User Updates
* Admin Actions

### 🛡 Security

* Helmet
* CORS
* JWT
* Password Hashing
* Validation Middleware

---

## 🏗 Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── templates/
├── utils/
├── validators/
└── types/
```

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* TypeScript
* Supabase
* PostgreSQL
* JWT
* bcrypt
* Nodemailer

---

## 🚀 Installation

```bash
git clone <https://github.com/its-chiranjeev/crud-api-typescript.git>
cd crud_api_ts

npm install
```

Create `.env`

```env
PORT=5000
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY
JWT_SECRET=YOUR_SECRET
SMTP_USER=YOUR_EMAIL
SMTP_PASS=YOUR_APP_PASSWORD
```

Run Development Server

```bash
npm run dev
```

Build Project

```bash
npm run build
```

Run Production Build

```bash
npm start
```

---

## 📌 API Endpoints

### Auth

```http
POST /api/auth/signup
POST /api/auth/login
```

### Users

```http
GET /api/users/profile
POST /api/users/user
PATCH /api/users/user:id
DELETE /api/users/user:id
```

### Admin

```http
POST /api/admin/users
GET /api/admin/users
PATCH /api/admin/users/:id
DELETE /api/admin/users/:id
```

### Super Admin

```http
PATCH /api/super-admin/approve/:id
PATCH /api/super-admin/reject/:id
PATCH /api/super-admin/make-admin/:id
```

### Audit Logs

```http
GET /api/audit-logs
```

---

## 🔮 Future Improvements

* Forgot Password
* Refresh Tokens
* Pagination
* Search & Filtering
* Swagger Documentation
* Unit Testing
* Docker Support

---

## 👨‍💻 Author

**Chiranjeev Rastogi**

Backend Developer | Node.js | Express.js | TypeScript | Supabase
