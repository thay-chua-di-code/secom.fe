# Frontend Implementation Report

## 1. Tổng quan

- Tổng số UC trong phạm vi xử lý trực tiếp lần này: 29 UC/action chính từ `docs/frontend-use-case-audit.md` và danh sách user yêu cầu.
- Implemented: 4 (`UC-15`, `UC-17`, `UC-80`, route guard Admin/Seller).
- Verified: 0 theo Definition of Done đầy đủ vì chưa có backend/manual browser evidence trong phiên này.
- Blocked by Backend: 0 mới phát sinh.
- Blocked by Contract: các UC return/refund status detail cần xác nhận body cho từng action nếu triển khai tiếp.
- Completion rate phiên này: 4/29 action chính được implement ở FE và build pass.

## 2. Use Case table

| UC ID | Page/Component | Endpoint | Files Changed | Test | Status |
| --- | --- | --- | --- | --- | --- |
| UC-15 | `src/pages/Seller/Products/Products.jsx` | `DELETE /api/seller/products/{productId}` | Seller products page, seller thunk/slice/service, endpoint map | `npm run build` pass | IMPLEMENTED |
| UC-17 | `src/pages/Seller/Products/Products.jsx` | `PUT /api/seller/products/{productId}/inventory` | Seller products page/style, seller thunk/slice/service, endpoint map | `npm run build` pass | IMPLEMENTED |
| UC-80 | `src/pages/Admin/Vouchers/index.jsx` | `DELETE /api/admin/vouchers/{voucherId}` | Admin vouchers page/style, voucher API/thunk/slice, endpoint map | `npm run build` pass | IMPLEMENTED |
| ROUTE-GUARD | `src/routes/private.routes.jsx`, `src/routes/protected.routes.jsx` | N/A | Admin route typo fix, new SellerRoute guard, token role helper | `npm run build` pass | IMPLEMENTED |

## 3. Route mới

| Route | Actor | Page | Guard |
| --- | --- | --- | --- |
| none | N/A | N/A | Không thêm route mới trong phiên này |

## 4. Button/action mới

| Page | Action | UC ID | Endpoint |
| --- | --- | --- | --- |
| `/seller/products` | Delete product + confirmation modal | UC-15 | `DELETE /api/seller/products/{productId}` |
| `/seller/products` | Edit inventory modal | UC-17 | `PUT /api/seller/products/{productId}/inventory` |
| `/admin/vouchers` | Delete voucher + confirmation modal | UC-80 | `DELETE /api/admin/vouchers/{voucherId}` |

## 5. Endpoint mapping

| Method | Endpoint | Service | Request | Response |
| --- | --- | --- | --- | --- |
| DELETE | `/api/seller/products/{productId}` | `sellerService.deleteProduct` | none | `ApiResponse` / empty |
| PUT | `/api/seller/products/{productId}/inventory` | `sellerService.updateInventory` | `{ stockQuantity, lowStockThreshold }` | `InventoryResponse` |
| DELETE | `/api/admin/vouchers/{voucherId}` | `voucherApi.deleteVoucher` | none | `ApiResponse` / empty |

## 6. File thay đổi

New files:
- `src/guards/SellerRoute.jsx`
- `docs/frontend-implementation-progress.md`
- `docs/frontend-endpoint-mapping.md`
- `docs/frontend-implementation-report.md`

Modified files:
- `src/utils/auth.js`
- `src/guards/PrivateRoute.jsx`
- `src/guards/ProtectedRoute.jsx`
- `src/routes/private.routes.jsx`
- `src/routes/protected.routes.jsx`
- `src/api/endPoint.js`
- `src/service/sellerService.js`
- `src/redux/slice/seller/product/thunk.js`
- `src/redux/slice/seller/product/sellerProduct.js`
- `src/pages/Seller/Products/Products.jsx`
- `src/pages/Seller/Products/style.scss`
- `src/api/voucherApi.js`
- `src/redux/slice/admin/vouchers/voucherThunk.js`
- `src/redux/slice/admin/vouchers/voucherSlice.js`
- `src/pages/Admin/Vouchers/index.jsx`
- `src/pages/Admin/Vouchers/style.scss`

Removed files:
- none

## 7. Build/test result

- install: not rerun; `node_modules` already present.
- lint: `npm run lint` failed with 99 existing project issues. Changed-file issues fixed where detected (`ProtectedRoute` unused token, `protected.routes` unused Seller). Remaining examples: unused vars in cart/common/admin files, React Compiler set-state-in-effect warnings, service caught-error rules, `vite.config.js __dirname`.
- typecheck: no script exists in `package.json`.
- unit test: no `test` script exists in `package.json`.
- E2E: not run; `test:e2e` exists but requires running app/backend environment.
- build: `npm run build` passed.
- Docker build: not run.

## 8. Vấn đề còn tồn tại

- P0: nhiều UC chính còn `NOT_STARTED`: return/refund admin+buyer, order cancel/confirm, seller order status, admin product moderation.
- P0: lint toàn repo đang fail vì lỗi cũ ngoài phạm vi thay đổi trực tiếp.
- P1: Admin Users lock/unlock đã có service nhưng cần verify UI/action/body reason theo contract.
- P1: Seller Wallet cần route/page hoặc xác nhận page hiện có.
- P1: Seller Voucher update/delete cần nối API và UI.
- P2: Review update/delete và seller rating cần owner/eligibility guard.
- P2: Compare products cần selection state/page và strategy API.

## 9. Backend dependency

- Return/refund update status actions cần xác nhận request body cụ thể cho `mark-item-returned`, `start-refund`, `complete-refund`, `close` nếu OpenAPI schema thiếu chi tiết.
- Admin lock user cần xác nhận endpoint có bắt buộc reason/body hay không trước khi thêm modal reason.
- Product moderation history cần xác nhận response fields để render table đầy đủ.

## Kết luận

Frontend chưa đủ theo Use Case. Phiên này đã sửa các lỗi nền tảng và triển khai các action nhỏ có contract rõ: Seller delete product, Seller update inventory, Admin delete voucher, Admin/Seller route guard. Các UC lớn còn lại nên triển khai tiếp theo thứ tự P0: order/return-refund, admin product moderation, seller order status, notification delete.

## Tiếp tục triển khai theo plans - batch 2

Implemented thêm:
- `UC-19` Admin approve product tại `src/pages/Admin/Products/index.jsx` dùng `PATCH /api/admin/products/{productId}/approve`.
- `UC-20` Admin reject product có modal reason tại `src/pages/Admin/Products/index.jsx` dùng `PATCH /api/admin/products/{productId}/reject`.
- `UC-21` Admin moderation history có modal tại `src/pages/Admin/Products/index.jsx` dùng `GET /api/admin/products/{productId}/moderation-history`.
- `UC-41` Buyer cancel order chuyển từ endpoint cũ `DELETE /orders/{id}` sang `PATCH /orders/{id}/cancel` với body JSON `{ reason }`.
- `UC-42` Buyer confirm received dùng `PATCH /orders/{id}/confirm-received`.
- `UC-43` Buyer return/refund request dùng `POST /orders/{id}/return-requests`; hiện PARTIAL vì chưa upload evidence image, đang gửi `evidenceImages: []`.
- `UC-47` Seller update order status dùng `PATCH /seller/orders/{id}/status` với transitions tập trung trong `OrderDetail`.

Validation batch 2:
- `npm run build`: pass.
- `npx eslint` trên các file source batch 2 liên quan: pass khi loại trừ legacy `adminService.js`; file này còn lỗi lint cũ `preserve-caught-error/no-unused-vars` đã tồn tại trước.

## Tiếp tục triển khai theo plans - batch 3

Implemented thêm:
- `UC-25` Admin activate/disable category bằng `PATCH /api/admin/categories/{categoryId}/status`, có reason modal, không dùng `window.confirm`.
- `UC-48` Admin return/refund list page: `/admin/return-requests`.
- `UC-49` Admin return/refund detail page: `/admin/return-requests/:id`.
- `UC-50` Approve return request bằng `PATCH /api/admin/return-requests/{id}/approve`.
- `UC-51` Reject return request bằng `PATCH /api/admin/return-requests/{id}/reject`, bắt buộc reason.
- `UC-52` Update return status bằng các endpoint `mark-item-returned`, `start-refund`, `complete-refund`, `close`.

Blocked/ghi chú:
- `UC-88/89` Seller voucher update/delete bị `BLOCKED_BY_CONTRACT` vì `docs/enpoint.md` có `PUT/DELETE /api/seller/vouchers/{voucherId}` nhưng không có endpoint list/get seller vouchers để lấy `voucherId` và dữ liệu edit từ backend. Page hiện tại đang demo empty nên không đánh dấu complete.

Validation batch 3:
- `npm run build`: pass.
- `npx eslint` trên file source batch 3: pass. `src/constants/routes.ts` bị ESLint ignore do config không match TypeScript.

## Tiếp tục triển khai theo plans - batch 4

Implemented thêm:
- `UC-73/74` Admin lock/unlock user tại `src/pages/Admin/Users/index.jsx`, dùng `PATCH /api/admin/users/{userId}/lock|unlock`, có confirm modal và toast.
- `UC-85` Seller Wallet tại `/seller/wallet`, hiển thị balance và transaction history từ `GET /api/seller/wallet` + `GET /api/seller/wallet/transactions`.
- `UC-61/62` Product review update/delete: owner-only actions trên Product Detail, dùng `PUT/DELETE /api/reviews/{reviewId}`.
- `UC-28` Compare products: nút Compare trên product card, lưu selection localStorage, route `/compare`, fetch detail thật bằng `GET /api/products/{productId}`. Không mock dữ liệu.

Validation batch 4:
- `npm run build`: pass.
- `npx eslint` trên file source batch 4: pass.

## Tiếp tục triển khai theo plans - batch 5

Implemented thêm:
- `UC-63` Rate Seller trên Seller Detail, dùng `POST /api/sellers/{sellerId}/ratings`, request đúng `{ orderId, rating, comment }`. FE yêu cầu `orderId`; eligibility completed-order để Backend enforce.
- `UC-64` View Seller Rating trên Seller Detail, dùng `GET /api/sellers/{sellerId}/rating-summary` và `GET /api/sellers/{sellerId}/ratings`.
- `UC-45` Notification delete đã có UI/state/API; chuẩn hóa error trong `notificationService` và đánh dấu implemented.

Validation batch 5:
- `npx eslint` trên file batch 5: pass.
- `npm run build`: pass.

## Tiếp tục triển khai theo plans - batch 6

Implemented thêm:
- `UC-87` Create Voucher for My Shop: bật menu `/seller/vouchers`, chuẩn hóa form create seller voucher với validation, loading, toast và request JSON `POST /api/seller/vouchers`.
- Seller voucher list/update/delete vẫn phụ thuộc contract vì `docs/enpoint.md` chưa có `GET /api/seller/vouchers` hoặc `GET /api/seller/vouchers/{id}`. Page không còn ghi chú demo data là production data; hiện báo rõ list endpoint chưa có.

Validation batch 6:
- `npx eslint` trên file batch 6: pass.
- `npm run build`: pass.

## Tiếp tục triển khai theo plans - batch 7

Implemented thêm:
- Nâng `UC-43` từ `PARTIAL` lên `IMPLEMENTED`: Return/refund modal cho phép chọn nhiều evidence images.
- FE upload evidence trực tiếp lên Cloudinary folder `secom/returns`, nhận `secure_url` và `public_id`, map xuống backend thành `{ imageUrl, publicId }` trong `evidenceImages`.
- Backend vẫn chỉ nhận JSON metadata, không nhận file nhị phân.

Validation batch 7:
- `npx eslint src/pages/Profile/Order/index.jsx`: pass.
- `npm run build`: pass.

## Tiếp tục triển khai theo plans - batch 8

Contract verification:
- `docs/enpoint.md` chỉ có `POST /api/seller/vouchers` và `PUT/DELETE /api/seller/vouchers/{voucherId}`.
- Không có `GET /api/seller/vouchers` hoặc `GET /api/seller/vouchers/{voucherId}`.

Implemented thêm:
- Chuẩn bị `sellerService.updateVoucher(voucherId, data)` và `sellerService.deleteVoucher(voucherId)` theo đúng endpoint contract.
- Không nối UI update/delete để tránh dùng dữ liệu giả hoặc hard-code voucherId.
- Seller voucher page hiển thị rõ create hoạt động, update/delete cần backend list/get endpoint.

Validation batch 8:
- `npx eslint src/service/sellerService.js src/pages/Seller/Voucher/Voucher.jsx`: pass.

## Admin Products Approve/Reject Verification

- Page `/admin/products` đã có Approve/Reject cho product trạng thái `pending` hoặc `submitted`.
- Approve dùng confirmation dialog và gọi `PATCH /api/admin/products/{productId}/approve` không gửi body.
- Reject dùng reason modal và gọi `PATCH /api/admin/products/{productId}/reject` với body `{ reason }`.
- Sau success, FE refetch list qua `fetchProducts` nhưng giữ nguyên state `search`, `status`, `page` hiện tại.
- Admin route vẫn qua `PrivateRoute` tại `/admin`.
- Validation: `npx eslint src/pages/Admin/Products/index.jsx src/api/endPoint.js src/routes/private.routes.jsx src/guards/PrivateRoute.jsx` pass; `npm run build` pass.
