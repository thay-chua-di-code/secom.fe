# Authentication

## Overview

The **Authentication** page manages the full user identity flow in the system, including these core features:

---

## Features

### 1. Register Account

- **Method:** Create
- **Actor:** Guest
- **Description:** Allows guests to create a new account with an email address.

### 2. Verify Account

- **Method:** Update
- **Actor:** Guest
- **Description:** Verifies an account through the confirmation link sent to the user's email inbox.

### 3. Email/Password Login

- **Method:** Read
- **Actor:** Guest
- **Description:** Traditional login with email and password.

### 4. Google Login

- **Method:** Read
- **Actor:** Guest
- **Description:** Quick login through a Google account.

### 5. Forgot Password

- **Method:** Update
- **Actor:** Guest
- **Description:** Sends a password reset link to the user's email address.

### 6. Update Password

- **Method:** Update
- **Actor:** Buyer / Seller
- **Description:** Allows signed-in users to update their password.

### 7. Logout

- **Method:** Update
- **Actor:** Buyer / Seller / Admin
- **Description:** Ends the current session and exits the system.

---

## Permissions

| Feature              | Guest | Buyer | Seller | Admin |
| -------------------- | :---: | :---: | :----: | :---: |
| Register Account     |  ✅   |       |        |       |
| Verify Account       |  ✅   |       |        |       |
| System Login         |  ✅   |       |        |       |
| Google Login         |  ✅   |       |        |       |
| Forgot Password      |  ✅   |       |        |       |
| Update Password      |       |  ✅   |   ✅   |       |
| Logout               |       |  ✅   |   ✅   |  ✅   |

---

## Note

This page acts as the **entry point** of the system, controls access by user role (Guest, Buyer, Seller, Admin), and protects account security through email verification and third-party Google integration.
