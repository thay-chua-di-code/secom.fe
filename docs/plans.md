Dựa trên danh sách **28 Use Case đang MISSING**, kế hoạch FE nên chia theo mức độ ưu tiên và phụ thuộc Backend như sau.

# 1. Tổng quan kế hoạch

| Nhóm | Số UC | Mục tiêu                                                      |
| ---- | ----: | ------------------------------------------------------------- |
| P0   |    12 | Hoàn thiện các luồng đơn hàng, hoàn tiền, quản trị tài khoản  |
| P1   |     8 | Hoàn thiện quản lý sản phẩm, ví, voucher                      |
| P2   |     8 | Hoàn thiện review, rating, category, comparison, notification |

Không nên làm lần lượt theo số UC. Nên gom theo **module nghiệp vụ** để tái sử dụng component, service và state.

---

# 2. Giai đoạn 1 — Order và Return/Refund

## Use Case

* UC-41 — Cancel Order
* UC-42 — Confirm Received
* UC-43 — Request Return / Refund
* UC-47 — Update Order Status
* UC-48 — View Return Requests
* UC-49 — View Return Request Details
* UC-50 — Approve Return Request
* UC-51 — Reject Return Request
* UC-52 — Update Return Request Status

Đây là nhóm quan trọng nhất vì liên quan trực tiếp đến trạng thái đơn hàng và dòng tiền.

## 2.1. Buyer — Cancel Order

### FE cần làm

Tại trang danh sách đơn hàng và chi tiết đơn hàng:

* Hiển thị nút `Cancel Order` khi trạng thái cho phép.
* Ẩn hoặc disable nút với đơn đã giao, đã nhận, đã hủy hoặc đang hoàn tiền.
* Mở dialog xác nhận trước khi hủy.
* Cho nhập lý do hủy nếu Backend hỗ trợ.
* Disable nút trong lúc gửi request.
* Sau khi thành công:

  * cập nhật trạng thái đơn;
  * refresh order detail;
  * refresh order list;
  * hiển thị toast thành công.

### API cần xác nhận

```http
PATCH /orders/{orderId}/cancel
```

Hoặc API hiện tại:

```http
DELETE /orders/{orderId}
```

Không nên tự đổi trạng thái chỉ ở local state trước khi Backend trả thành công.

### Acceptance criteria

* Không thể nhấn hủy hai lần.
* Reload trang vẫn thấy trạng thái đã hủy.
* Đơn sai trạng thái không hiển thị nút hủy.
* Lỗi Backend được hiển thị rõ.

---

## 2.2. Buyer — Confirm Received

### FE cần làm

* Thêm nút `Confirm Received` tại order detail.
* Chỉ hiển thị khi đơn đã ở trạng thái giao thành công hoặc đủ điều kiện.
* Có dialog xác nhận.
* Disable trong lúc xử lý.
* Sau khi xác nhận:

  * cập nhật trạng thái thành `Completed` hoặc `Received`;
  * ẩn nút xác nhận;
  * cho phép review sản phẩm nếu phù hợp;
  * refresh dữ liệu đơn hàng.

### API dự kiến

```http
PATCH /orders/{orderId}/confirm-received
```

### Acceptance criteria

* Không gửi request trùng.
* Refresh trang không hiển thị lại nút.
* Không cho xác nhận đơn đã hủy hoặc hoàn tiền.
* Không tự giả lập việc chuyển tiền cho Seller ở FE.

---

## 2.3. Buyer — Request Return / Refund

### FE cần làm

Tạo form yêu cầu hoàn trả:

* Chọn sản phẩm hoặc order item.
* Chọn lý do.
* Nhập mô tả.
* Upload ảnh bằng chứng nếu Backend hỗ trợ.
* Hiển thị chính sách và trạng thái xử lý.
* Validate:

  * bắt buộc chọn lý do;
  * mô tả không rỗng;
  * số lượng trả không vượt số lượng mua;
  * chỉ cho gửi trong thời hạn hợp lệ.

### Route đề xuất

```text
/orders/:orderId/return-request
```

Hoặc mở modal từ order detail.

### API dự kiến

```http
POST /orders/{orderId}/return-requests
```

### Component đề xuất

```text
src/pages/Orders/ReturnRequest/
src/components/orders/ReturnRequestForm.jsx
src/service/returnRequestService.js
```

---

## 2.4. Seller — Update Order Status

### FE cần làm

Tại trang Seller Orders:

* Hiển thị trạng thái hiện tại.
* Chỉ hiển thị các trạng thái tiếp theo hợp lệ.
* Không cho Seller chọn tùy ý mọi trạng thái.
* Có dialog xác nhận.
* Có loading và rollback khi lỗi.
* Refresh danh sách sau khi cập nhật.

### Luồng trạng thái gợi ý

```text
Pending
→ Confirmed
→ Processing
→ Shipped
→ Delivered
```

Không cho phép:

```text
Delivered → Processing
Cancelled → Shipped
Refunded → Processing
```

### API dự kiến

```http
PATCH /seller/orders/{orderId}/status
```

Request:

```json
{
  "status": "Shipped"
}
```

---

## 2.5. Admin — Return/Refund Management

### Routes đề xuất

```text
/admin/return-requests
/admin/return-requests/:id
```

### Trang danh sách cần có

* ID yêu cầu.
* Buyer.
* Seller.
* Order.
* Lý do.
* Ngày tạo.
* Trạng thái.
* Bộ lọc trạng thái.
* Pagination.
* Nút xem chi tiết.

### Trang chi tiết cần có

* Thông tin Buyer.
* Thông tin Seller.
* Thông tin đơn hàng.
* Sản phẩm yêu cầu hoàn.
* Lý do.
* Mô tả.
* Ảnh bằng chứng.
* Timeline trạng thái.
* Nút Approve.
* Nút Reject.
* Nút cập nhật trạng thái nếu flow có nhiều bước.

### Khi Reject

Bắt buộc nhập lý do từ chối.

### API cần có

```http
GET /admin/return-requests
GET /admin/return-requests/{id}
PATCH /admin/return-requests/{id}/approve
PATCH /admin/return-requests/{id}/reject
PATCH /admin/return-requests/{id}/status
```

### Backend dependency

Các UC-43 và UC-48 đến UC-52 không thể hoàn thành hoàn toàn ở FE nếu Backend chưa có:

* model return request;
* endpoint danh sách;
* endpoint chi tiết;
* approve/reject;
* status transition;
* response contract.

---

# 3. Giai đoạn 2 — Admin Account Management

## Use Case

* UC-73 — Lock User Account
* UC-74 — Unlock User Account

## FE cần làm

Tại:

```text
/admin/users
```

Thêm:

* Cột trạng thái tài khoản.
* Nút Lock khi tài khoản đang hoạt động.
* Nút Unlock khi tài khoản đang bị khóa.
* Dialog xác nhận.
* Disable nút khi đang xử lý.
* Cập nhật row sau khi Backend trả thành công.
* Không cho Admin tự khóa tài khoản của chính mình nếu Backend có rule này.
* Hiển thị lý do lỗi nếu tài khoản không thể khóa.

### API

```http
PATCH /admin/users/{userId}/lock
PATCH /admin/users/{userId}/unlock
```

### Component đề xuất

```text
src/pages/Admin/Users/components/UserStatusAction.jsx
src/pages/Admin/Users/components/LockUserDialog.jsx
```

### Acceptance criteria

* Trạng thái thay đổi ngay sau khi thành công.
* Reload vẫn giữ đúng trạng thái.
* Không gửi request hai lần.
* Không render cả hai nút Lock và Unlock cùng lúc.

---

# 4. Giai đoạn 3 — Seller Product Management

## Use Case

* UC-15 — Delete Product
* UC-17 — Manage Product Inventory

## 4.1. Delete Product

Hiện service đã có nhưng button bị comment.

### FE cần làm

* Bật lại nút Delete.
* Chỉ cho Seller thao tác với sản phẩm của mình.
* Hiển thị confirmation dialog.
* Nếu sản phẩm đang có order chưa hoàn tất, hiển thị lỗi Backend.
* Sau khi xóa:

  * remove row khỏi state;
  * hoặc refetch danh sách;
  * hiển thị toast thành công.

### API

```http
DELETE /seller/products/{productId}
```

### Không nên

* Xóa trực tiếp row trước khi Backend xác nhận.
* Dùng `window.confirm` nếu project đang có dialog component.
* Cho xóa khi đang submit request khác.

---

## 4.2. Manage Product Inventory

### FE cần làm

Thêm chức năng cập nhật tồn kho:

* Cột `Stock`.
* Nút Edit Inventory.
* Input số lượng.
* Không cho số âm.
* Không cho giá trị thập phân.
* Có thể thêm:

  * increase stock;
  * decrease stock;
  * set exact stock.

### API dự kiến

```http
PATCH /seller/products/{productId}/inventory
```

Request:

```json
{
  "quantity": 20
}
```

### UI đề xuất

Có thể dùng modal:

```text
Edit Inventory
Current stock: 15
New stock: [20]
```

### Acceptance criteria

* Validate số lượng trước khi gọi API.
* Không cho âm.
* Sau cập nhật, table hiển thị số mới.
* Nếu Backend báo conflict, refresh lại product.

---

# 5. Giai đoạn 4 — Admin Product Moderation và Category

## Use Case

* UC-19 — Approve Product
* UC-20 — Reject Product
* UC-21 — View Moderation History
* UC-25 — Activate / Disable Category

## 5.1. Approve / Reject Product

### FE cần làm

Tại:

```text
/admin/products
```

* Chỉ hiển thị nút Approve/Reject cho sản phẩm `Pending`.
* Approve cần dialog xác nhận.
* Reject bắt buộc nhập lý do.
* Disable action trong lúc gửi request.
* Refetch product list sau mutation.
* Hiển thị moderation status và moderator.

### API

```http
PATCH /admin/products/{productId}/approve
PATCH /admin/products/{productId}/reject
```

Reject body:

```json
{
  "reason": "Product information is incomplete"
}
```

---

## 5.2. Moderation History

### Route

```text
/admin/moderation-history
```

Hoặc:

```text
/admin/products/:id/moderation-history
```

### Hiển thị

* Product.
* Action.
* Admin thực hiện.
* Lý do.
* Trạng thái trước.
* Trạng thái sau.
* Thời gian.

### API dự kiến

```http
GET /admin/moderation-history
GET /admin/products/{productId}/moderation-history
```

### Backend dependency

Nếu Backend chưa có audit table hoặc endpoint history thì FE chỉ có thể chuẩn bị UI skeleton.

---

## 5.3. Activate / Disable Category

### FE cần làm

Tại:

```text
/admin/categories
```

* Thêm cột `Status`.
* Thêm switch hoặc action menu.
* Có confirmation khi disable.
* Disable category không có nghĩa là delete.
* Refresh table sau mutation.

### API dự kiến

```http
PATCH /admin/categories/{categoryId}/status
```

Request:

```json
{
  "isActive": false
}
```

---

# 6. Giai đoạn 5 — Review và Seller Rating

## Use Case

* UC-61 — Update Product Review
* UC-62 — Delete Product Review
* UC-63 — Rate Seller
* UC-64 — View Seller Rating

## 6.1. Update Product Review

### FE cần làm

* Chỉ hiển thị Edit cho review của user hiện tại.
* Load nội dung cũ vào form.
* Validate rating và comment.
* Update danh sách sau thành công.

### API

```http
PUT /products/{productId}/reviews/{reviewId}
```

---

## 6.2. Delete Product Review

### FE cần làm

* Chỉ hiển thị Delete với review của chính user.
* Confirmation dialog.
* Remove review sau thành công.
* Cập nhật lại average rating.

### API

```http
DELETE /products/{productId}/reviews/{reviewId}
```

---

## 6.3. Rate Seller

### Vị trí UI

Có thể đặt tại:

* Order completed detail.
* Seller detail.
* Sau khi Buyer xác nhận đã nhận hàng.

### Form

* Rating từ 1 đến 5.
* Comment tùy chọn.
* Chỉ Buyer đã mua hàng mới được rate.
* Mỗi order hoặc mỗi Seller chỉ được rate theo rule Backend.

### API dự kiến

```http
POST /sellers/{sellerId}/ratings
```

---

## 6.4. View Seller Rating

### FE cần làm

Tại Seller Detail:

* Average rating.
* Tổng số lượt đánh giá.
* Danh sách rating.
* Pagination.
* Distribution 1–5 sao nếu API hỗ trợ.
* Loading, empty, error state.

### API dự kiến

```http
GET /sellers/{sellerId}/ratings
GET /sellers/{sellerId}/statistics
```

---

# 7. Giai đoạn 6 — Voucher và Wallet

## Use Case

* UC-80 — Delete Voucher in System
* UC-85 — View Wallet
* UC-87 — Create Voucher for My Shop
* UC-88 — Update Voucher for My Shop
* UC-89 — Delete Voucher for My Shop

## 7.1. Admin Delete Voucher

Tại:

```text
/admin/vouchers
```

* Thêm nút Delete.
* Confirmation dialog.
* Không cho xóa voucher đang được sử dụng nếu Backend cấm.
* Có thể fallback sang disable nếu voucher đã phát sinh giao dịch.

### API

```http
DELETE /admin/vouchers/{voucherId}
```

---

## 7.2. Seller Wallet

### Route đề xuất

```text
/seller/wallet
```

### Hiển thị

* Available balance.
* Pending balance.
* Withdrawn balance.
* Total revenue.
* Lịch sử giao dịch.
* Pagination.
* Filter theo transaction type.

### API

```http
GET /seller/wallet
GET /seller/wallet/transactions
```

### Lưu ý

FE chỉ hiển thị dữ liệu Backend. Không tự tính balance dựa trên order list.

---

## 7.3. Seller Voucher CRUD

### Route

```text
/seller/vouchers
```

### Danh sách

* Code.
* Name.
* Discount type.
* Discount value.
* Minimum order.
* Start date.
* End date.
* Usage limit.
* Status.
* Actions.

### Create

```http
POST /seller/vouchers
```

### Update

```http
PUT /seller/vouchers/{voucherId}
```

### Delete

```http
DELETE /seller/vouchers/{voucherId}
```

### Validation

* Code bắt buộc.
* Discount > 0.
* Percentage không vượt 100%.
* End date lớn hơn start date.
* Minimum order không âm.
* Usage limit phải là số nguyên dương.
* Không cho ngày kết thúc trong quá khứ khi tạo mới.

---

# 8. Giai đoạn 7 — Compare Product và Notification

## Use Case

* UC-28 — Compare Products
* UC-45 — Delete Notification

## 8.1. Compare Products

### FE scope ban đầu

Không nhất thiết cần Backend nếu dữ liệu product detail đã đủ.

### Flow đề xuất

* Buyer chọn tối đa 3–4 sản phẩm.
* Chỉ so sánh sản phẩm cùng category nếu cần.
* Lưu selection vào:

  * React state;
  * Context;
  * Redux;
  * hoặc localStorage.
* Mở trang:

```text
/compare
```

### Bảng so sánh

* Image.
* Name.
* Price.
* Rating.
* Brand.
* Stock.
* Category.
* Specifications.
* Add to cart.
* Remove from compare.

### Acceptance criteria

* Không cho thêm cùng sản phẩm hai lần.
* Giới hạn số lượng sản phẩm.
* Có empty state.
* Selection vẫn còn khi chuyển trang nếu dùng localStorage.

---

## 8.2. Delete Notification

### FE cần làm

* Thêm nút Delete ở notification item.
* Có thể dùng icon trash.
* Confirmation tùy mức độ quan trọng.
* Sau thành công:

  * remove item khỏi state;
  * cập nhật count;
  * không reload toàn trang.

### API

```http
DELETE /notifications/{notificationId}
```

---

# 9. Cấu trúc code đề xuất

```text
src/
├── api/
│   ├── orderApi.js
│   ├── returnRequestApi.js
│   ├── reviewApi.js
│   ├── sellerRatingApi.js
│   ├── voucherApi.js
│   └── walletApi.js
│
├── components/
│   ├── orders/
│   ├── returns/
│   ├── reviews/
│   ├── vouchers/
│   ├── wallet/
│   └── common/
│       ├── ConfirmDialog.jsx
│       ├── StatusBadge.jsx
│       └── LoadingButton.jsx
│
├── pages/
│   ├── Orders/
│   ├── Compare/
│   ├── Seller/
│   │   ├── Wallet/
│   │   └── Vouchers/
│   └── Admin/
│       ├── ReturnRequests/
│       └── ModerationHistory/
│
├── hooks/
│   ├── useOrderActions.js
│   ├── useReturnRequests.js
│   └── useVoucherActions.js
│
└── utils/
    ├── orderStatusRules.js
    ├── validation.js
    └── errorParser.js
```

---

# 10. Thứ tự triển khai đề xuất

## Sprint 1 — Order core

* UC-41
* UC-42
* UC-47

Mục tiêu: Buyer và Seller xử lý đơn hàng đúng trạng thái.

## Sprint 2 — Return/Refund

* UC-43
* UC-48
* UC-49
* UC-50
* UC-51
* UC-52

Mục tiêu: Luồng hoàn trả end-to-end.

## Sprint 3 — Admin security và moderation

* UC-73
* UC-74
* UC-19
* UC-20
* UC-21
* UC-25

Mục tiêu: Hoàn thiện thao tác Admin.

## Sprint 4 — Seller product và finance

* UC-15
* UC-17
* UC-85
* UC-87
* UC-88
* UC-89

Mục tiêu: Seller quản lý sản phẩm, tồn kho, ví và voucher.

## Sprint 5 — Review và social

* UC-61
* UC-62
* UC-63
* UC-64

Mục tiêu: Hoàn thiện đánh giá sản phẩm và Seller.

## Sprint 6 — Các chức năng bổ sung

* UC-28
* UC-45
* UC-80

Mục tiêu: Compare, notification và admin voucher deletion.

---

# 11. Phân loại phụ thuộc Backend

## FE có thể triển khai ngay vì API đã được ghi nhận

* UC-15 Delete Product
* UC-17 Inventory, nếu endpoint service hiện tại hoạt động
* UC-19 Approve Product
* UC-20 Reject Product
* UC-41 Cancel Order
* UC-42 Confirm Received
* UC-45 Delete Notification
* UC-47 Update Order Status
* UC-73 Lock User
* UC-74 Unlock User
* UC-85 View Wallet
* UC-87 Create Seller Voucher

## Cần kiểm tra hoặc bổ sung Backend contract

* UC-21 Moderation History
* UC-25 Activate/Disable Category
* UC-43 Return/Refund Request
* UC-48 đến UC-52 Admin Return Management
* UC-61 Update Review
* UC-62 Delete Review
* UC-63 Rate Seller
* UC-64 View Seller Rating
* UC-80 Delete Admin Voucher
* UC-88 Update Seller Voucher
* UC-89 Delete Seller Voucher

## Có thể làm chủ yếu ở FE

* UC-28 Compare Products

---

# 12. Definition of Done cho mỗi Use Case

Một UC chỉ được đánh dấu `COMPLETE` khi đạt đủ:

* Có route hoặc UI entry point.
* Có role guard đúng.
* Gọi API thật.
* Request và response mapping đúng.
* Có loading state.
* Có empty state nếu cần.
* Có error handling.
* Có validation.
* Có success feedback.
* Ngăn double submit.
* Refresh state đúng sau mutation.
* Reload trang vẫn giữ dữ liệu đúng.
* Responsive cơ bản.
* Không dùng mock/hard-code.
* Build thành công.
* Có ít nhất một test cho happy path và một test lỗi chính.

Kế hoạch này nên ưu tiên **UC-41 đến UC-52 trước**, vì đây là nhóm ảnh hưởng trực tiếp đến order state, hoàn tiền và dòng tiền của hệ thống.
