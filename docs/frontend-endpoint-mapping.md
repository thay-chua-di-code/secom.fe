# Frontend Endpoint Mapping

| UC ID | UI Action | Method | Endpoint | Request Type | Response Type | Service File | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UC-15 | Seller deletes product | DELETE | `/api/seller/products/{productId}` | none | `ApiResponse` / empty | `src/service/sellerService.js` | IMPLEMENTED |
| UC-17 | Seller updates inventory | PUT | `/api/seller/products/{productId}/inventory` | `{ stockQuantity: number; lowStockThreshold?: number }` | `InventoryResponse` | `src/service/sellerService.js` | IMPLEMENTED |
| UC-19 | Admin approves product | PATCH | `/api/admin/products/{productId}/approve` | none | `ApiResponse` | `src/service/adminService.js` | IMPLEMENTED |
| UC-20 | Admin rejects product | PATCH | `/api/admin/products/{productId}/reject` | `{ reason: string }` | `ApiResponse` | `src/service/adminService.js` | IMPLEMENTED |
| UC-21 | Admin views moderation history | GET | `/api/admin/products/{productId}/moderation-history` | none | `ProductModerationHistoryResponse[]` | `src/service/adminService.js` | IMPLEMENTED |
| UC-25 | Admin toggles category status | PATCH | `/api/admin/categories/{categoryId}/status` | `{ isActive: boolean; reason?: string | null }` | `CategoryDto` | `src/service/adminService.js` | IMPLEMENTED |
| UC-41 | Buyer cancels order | PATCH | `/api/orders/{orderId}/cancel` | `{ reason?: string | null }` | `OrderStatusChangeResponse` | `src/api/orderApi.js` | IMPLEMENTED |
| UC-42 | Buyer confirms received | PATCH | `/api/orders/{orderId}/confirm-received` | none | `OrderStatusChangeResponse` | `src/api/orderApi.js` | IMPLEMENTED |
| UC-43 | Buyer creates return request | POST | `/api/orders/{orderId}/return-requests` | `{ reasonCode, description, items, evidenceImages: { imageUrl, publicId }[] }` | `ReturnRequestResponse` | `src/api/orderApi.js` | IMPLEMENTED |
| UC-45 | User deletes notification | DELETE | `/api/notifications/{notificationId}` | none | `ApiResponse` | `src/service/notificationService.js` | IMPLEMENTED |
| UC-47 | Seller updates order status | PATCH | `/api/seller/orders/{orderId}/status` | `{ status: string }` | `ApiResponse` | `src/service/sellerService.js` | IMPLEMENTED |
| UC-48 | Admin lists return requests | GET | `/api/admin/return-requests` | `{ page, pageSize, status? }` | `PagedResult<ReturnRequestResponse>` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-49 | Admin views return request | GET | `/api/admin/return-requests/{id}` | none | `ReturnRequestResponse` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-50 | Admin approves return request | PATCH | `/api/admin/return-requests/{id}/approve` | `{ note?: string | null; reason?: string | null }` | `ReturnRequestResponse` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-51 | Admin rejects return request | PATCH | `/api/admin/return-requests/{id}/reject` | `{ note?: string | null; reason: string }` | `ReturnRequestResponse` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-52 | Admin marks return item returned | PATCH | `/api/admin/return-requests/{id}/mark-item-returned` | `{ note?: string | null; reason?: string | null }` | `ReturnRequestResponse` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-52 | Admin starts refund | PATCH | `/api/admin/return-requests/{id}/start-refund` | `{ note?: string | null; reason?: string | null }` | `ReturnRequestResponse` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-52 | Admin completes refund | PATCH | `/api/admin/return-requests/{id}/complete-refund` | `{ note?: string | null; reason?: string | null }` | `ReturnRequestResponse` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-52 | Admin closes return request | PATCH | `/api/admin/return-requests/{id}/close` | `{ note?: string | null; reason?: string | null }` | `ReturnRequestResponse` | `src/api/adminReturnRequestApi.js` | IMPLEMENTED |
| UC-61 | Buyer updates product review | PUT | `/api/reviews/{reviewId}` | `{ rating: number; comment: string }` | review response | `src/service/reviewSevice.js` | IMPLEMENTED |
| UC-62 | Buyer deletes product review | DELETE | `/api/reviews/{reviewId}` | none | `ApiResponse` | `src/service/reviewSevice.js` | IMPLEMENTED |
| UC-63 | Buyer rates seller | POST | `/api/sellers/{sellerId}/ratings` | `{ orderId: string; rating: number; comment?: string | null }` | seller rating response | `src/api/sellerRatingApi.js` | IMPLEMENTED |
| UC-64 | User views seller rating summary | GET | `/api/sellers/{sellerId}/rating-summary` | none | `SellerRatingSummaryResponse` | `src/api/sellerRatingApi.js` | IMPLEMENTED |
| UC-73 | Admin locks user | PATCH | `/api/admin/users/{userId}/lock` | none | `ApiResponse` | `src/service/adminService.js` | IMPLEMENTED |
| UC-74 | Admin unlocks user | PATCH | `/api/admin/users/{userId}/unlock` | none | `ApiResponse` | `src/service/adminService.js` | IMPLEMENTED |
| UC-80 | Admin deletes system voucher | DELETE | `/api/admin/vouchers/{voucherId}` | none | `ApiResponse` / empty | `src/api/voucherApi.js` | IMPLEMENTED |
| UC-85 | Seller views wallet | GET | `/api/seller/wallet` | none | `SellerWalletResponse` | `src/service/sellerService.js` | IMPLEMENTED |
| UC-85 | Seller views wallet transactions | GET | `/api/seller/wallet/transactions` | `{ page, pageSize }` | `PagedResult<WalletTransactionResponse>` | `src/service/sellerService.js` | IMPLEMENTED |
| UC-87 | Seller creates shop voucher | POST | `/api/seller/vouchers` | `CreateSellerVoucherRequest` | voucher response | `src/service/sellerService.js` | IMPLEMENTED |
| UC-88 | Seller updates shop voucher | PUT | `/api/seller/vouchers/{voucherId}` | `UpdateSellerVoucherRequest` | voucher response | `src/service/sellerService.js` | BLOCKED_BY_CONTRACT |
| UC-89 | Seller deletes shop voucher | DELETE | `/api/seller/vouchers/{voucherId}` | none | `ApiResponse` | `src/service/sellerService.js` | BLOCKED_BY_CONTRACT |

| UC-28 | Buyer compares products | GET | `/api/products/{productId}` | selected IDs from localStorage | product detail | `src/api/productApi.js` | IMPLEMENTED |
| UC-64 | User views seller ratings | GET | `/api/sellers/{sellerId}/ratings` | `{ pageNumber, pageSize }` | `SellerRatingsResponse` | `src/api/sellerRatingApi.js` | IMPLEMENTED |
