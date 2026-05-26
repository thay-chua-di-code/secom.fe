# Authentication (Xác thực)

## Tổng quan

Trang **Authentication** quản lý toàn bộ luồng xác thực danh tính người dùng trong hệ thống, bao gồm các chức năng chính sau:

---

## Chức năng

### 1. Đăng ký tài khoản (Register Account)

- **Phương thức:** Create
- **Đối tượng:** Guest
- **Mô tả:** Cho phép khách tạo tài khoản mới bằng email.

### 2. Xác minh tài khoản (Verify Account)

- **Phương thức:** Update
- **Đối tượng:** Guest
- **Mô tả:** Xác minh tài khoản thông qua liên kết gửi về hộp thư email.

### 3. Đăng nhập email/mật khẩu (Login System)

- **Phương thức:** Read
- **Đối tượng:** Guest
- **Mô tả:** Đăng nhập truyền thống bằng email và mật khẩu.

### 4. Đăng nhập Google (Login Google)

- **Phương thức:** Read
- **Đối tượng:** Guest
- **Mô tả:** Đăng nhập nhanh qua tài khoản Google (Social Login).

### 5. Quên mật khẩu (Forgot Password)

- **Phương thức:** Update
- **Đối tượng:** Guest
- **Mô tả:** Gửi liên kết đặt lại mật khẩu về email của người dùng.

### 6. Cập nhật mật khẩu (Update Password)

- **Phương thức:** Update
- **Đối tượng:** Buyer / Seller
- **Mô tả:** Cho phép người dùng đã đăng nhập cập nhật mật khẩu mới.

### 7. Đăng xuất (Logout)

- **Phương thức:** Update
- **Đối tượng:** Buyer / Seller / Admin
- **Mô tả:** Kết thúc phiên làm việc và thoát khỏi hệ thống.

---

## Phân quyền

| Chức năng          | Guest | Buyer | Seller | Admin |
| ------------------ | :---: | :---: | :----: | :---: |
| Đăng ký tài khoản  |  ✅   |       |        |       |
| Xác minh tài khoản |  ✅   |       |        |       |
| Đăng nhập hệ thống |  ✅   |       |        |       |
| Đăng nhập Google   |  ✅   |       |        |       |
| Quên mật khẩu      |  ✅   |       |        |       |
| Cập nhật mật khẩu  |       |  ✅   |   ✅   |       |
| Đăng xuất          |       |  ✅   |   ✅   |  ✅   |

---

## Ghi chú

Trang này đóng vai trò là **cổng vào** của toàn bộ hệ thống, kiểm soát quyền truy cập theo từng vai trò người dùng (Guest, Buyer, Seller, Admin) và đảm bảo an toàn thông tin thông qua các cơ chế xác minh email và tích hợp bên thứ ba (Google).