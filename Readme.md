# Store Rating Application

A **role-based store rating web application** built with **ReactJS**, **ExpressJS**, and **MySQL**, where users can register, log in, and rate stores, while administrators and store owners manage functionalities through dedicated dashboards.

---

## 🚀 Tech Stack
- **Frontend:** ReactJS
- **Backend:** ExpressJS
- **Database:** MySQL

---

## 👥 User Roles & Functionalities

### 🔑 System Administrator
- Add new stores, normal users, and admin users.
- View dashboard with total users, stores, and ratings.
- View stores (Name, Email, Address, Rating).
- View users (Name, Email, Address, Role).
- Apply filters and sorting on all listings.
- View detailed user information.
- Logout functionality.

### 👤 Normal User
- Sign Up and log in.
- Sign Up with (Name, Email, Address, Password).
- Update password after logging in.
- View/search store listings (by name or address).
- View store details (Name, Address, Overall Rating, User Rating).
- Submit and modify store ratings (1–5).
- Logout functionality.

### 🏬 Store Owner
- Log in to the platform.
- Update password after logging in.
- Dashboard to view users who rated their store.
- View average store rating.
- Logout functionality.

---

## ✅ Form Validations
- **Name:** 20–60 characters.
- **Address:** Up to 400 characters.
- **Password:** 8–16 characters, must include at least one uppercase letter and one special character.
- **Email:** Standard email format validation.

---

## 📊 Features
- Sorting (ascending/descending) on key fields like Name, Email, Rating.
- Search and filter support for stores and users.
- Role-based authentication and authorization.
- Secure password handling with validations.
- Responsive and user-friendly UI.
