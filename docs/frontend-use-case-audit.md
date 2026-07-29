# Frontend Use Case Audit — SECOM / AIRetail

Audit date: 2026-07-26  
Source use case document: `UseCase_List_AIRetail_v3.md`  
Frontend root: `secom.fe`  
Scope: React + Vite frontend only. Backend source was not modified.

## A. Tổng quan

Tài liệu Use Case có 89 UC. Đối chiếu strict theo route → page → component → service/API → state/update → loading/error/validation/role/test.

| Status | Count | Notes |
|---|---:|---|
| COMPLETE | 7 | Có route/UI/API tương đối đầy đủ, vẫn thiếu test tự động ở repo. |
| PARTIAL | 49 | Có UI hoặc service nhưng thiếu validation, guard, loading/error, state refresh, hoặc còn flow chưa đủ. |
| MISSING | 19 | Chưa thấy route/UI/action đáng tin cậy. |
| INCORRECT | 8 | Có UI nhưng sai route guard, sai field/API, dùng mock/hard-code, hoặc action bị comment. |
| BLOCKED_BY_BACKEND | 5 | FE có chuẩn bị một phần nhưng cần contract/API rõ hơn. |
| NOT_FRONTEND | 1 | System use case không cần thao tác trực tiếp. |
| NEED_CLARIFICATION | 0 | Không có UC nào không đọc được từ tài liệu. |

Tỷ lệ frontend đạt COMPLETE strict: **7/89 = 7.9%**.  
Nếu tính PARTIAL là có nền UI/API để hoàn thiện: **56/89 = 62.9%**.

## B. Bảng đối chiếu Use Case

| UC ID | Use Case | Actor | Status | Route/Page | API | Thiếu gì | Priority |
|---|---|---|---|---|---|---|---|
| UC-01 | Register Account | Guest | PARTIAL | `src/pages/Auth/index.jsx` via `/register` | `POST /auth/register` in `src/service/authService.js` | Validation/error chưa nhất quán; service throw raw object; no tests. | P1 |
| UC-02 | Login With Email / Password | Guest | PARTIAL | `src/pages/Auth/index.jsx` via `/login` | `POST /auth/login` | Token set, nhưng refresh token không persist; error handling weak; role depends response. | P0 |
| UC-03 | Login With Google | Guest | PARTIAL | Auth page / Google provider | `POST /auth/google-login` | Response mapping/logging chưa chuẩn; role/redirect cần verify. | P1 |
| UC-04 | Logout | Buyer/Seller/Admin | PARTIAL | Header/user dropdown | `POST /auth/logout` | `refreshToken` không được lưu ở login nhưng logout đọc localStorage; fallback logout local có. | P0 |
| UC-05 | Forget Password | Guest | PARTIAL | `/forgot-password` Auth page | `POST /auth/forgot-password` | Error swallowed in service; success/loading chưa kiểm chứng. | P1 |
| UC-06 | Change Password | Buyer/Seller | PARTIAL | `src/pages/Profile/ChangePwd` | `PATCH/PUT /auth/password` | UI exists, validation/error needs hardening. | P1 |
| UC-07 | View Profile | Buyer/Seller | PARTIAL | `/profile` `src/pages/Profile` | `GET /profile` in `userService` | Loading/error partial; no role-specific restrictions. | P1 |
| UC-08 | Update Profile | Buyer/Seller | PARTIAL | `/profile` | `PUT /profile`; Cloudinary avatar utility | Upload/profile update exists; validation and partial failure handling weak. | P1 |
| UC-09 | View Product List | Guest/Buyer | PARTIAL | `/products`, home cards | `GET /products`, discovery/homepage | UI exists; filtering/pagination/loading partially implemented; no test. | P1 |
| UC-10 | View Product Details | Guest/Buyer | COMPLETE | `/product-detail/:id` `src/pages/ProductDetail` | `GET /products/{id}`, reviews, related/similar | Main flow present; still improve not-found/error. | P2 |
| UC-11 | View Product Categories | Guest/Buyer | PARTIAL | Home category sidebar, products filter | `GET /categories` | Category UI exists; state/error/debounce incomplete. | P2 |
| UC-12 | Create Product | Seller | PARTIAL | `/seller/products` modal `FormAdd` | `POST /seller/products` | Create flow exists with Cloudinary images in JSON; seller route guard missing role enforcement. | P0 |
| UC-13 | Upload Image Product | Seller | PARTIAL | Product image manager | Cloudinary direct + product JSON `images` | Preview/validation exists; backend contract must accept `images`; retry semantics limited. | P0 |
| UC-14 | Update Product | Seller | PARTIAL | `/seller/products` modal `FormUpdate` | `PUT /seller/products/{id}` | Existing/new images handled; no page-level seller ownership check beyond backend. | P0 |
| UC-15 | Delete Product | Seller | INCORRECT | `/seller/products` | `DELETE /seller/products/{id}` service exists | Delete button is commented in `Products.jsx`; no confirmation active. | P1 |
| UC-16 | View My Products | Seller | PARTIAL | `/seller/products` | `GET /seller/products` | UI table exists; pagination/filter/status handling weak. | P1 |
| UC-17 | Manage Product Inventory | Seller | MISSING | No visible inventory UI | service/thunk `updateInventory` exists | No form/control for stock quantity in seller products. | P1 |
| UC-18 | View Product List (Admin) | Admin | PARTIAL | `/admin/products` | `GET /admin/products` | UI exists; admin guard bug weakens access; loading/error partial. | P0 |
| UC-19 | Approve Product | Admin | PARTIAL | `/admin/products` | `POST/PATCH /admin/products/{id}/approve` | Action exists in service/endpoints; confirmation/refresh needs verify. | P1 |
| UC-20 | Reject Product | Admin | PARTIAL | `/admin/products` | `/admin/products/{id}/reject` | Same as approve; reject reason/moderation history unclear. | P1 |
| UC-21 | View Moderation History | Admin | MISSING | No route found | None found | No moderation history page/table. | P2 |
| UC-22 | Create Category | Admin | PARTIAL | `/admin/categories` | `POST /admin/categories` | UI exists; validation/errors not comprehensive. | P1 |
| UC-23 | Update Category | Admin | PARTIAL | `/admin/categories` | `PUT /admin/categories/{id}` | UI exists; stale state/confirmation needs verify. | P1 |
| UC-24 | Delete Category | Admin | PARTIAL | `/admin/categories` | `DELETE /admin/categories/{id}` | Service exists; action handler may be unused per lint. | P1 |
| UC-25 | Activate / Disable Category | Admin | MISSING | No clear active toggle | None found | No verified active/disable category action. | P2 |
| UC-26 | Search Products | Guest/Buyer | PARTIAL | Header search/products page | `GET /products` query | UI exists; debounce and consistent server query need verify. | P2 |
| UC-27 | Filter & Sort Products | Guest/Buyer | PARTIAL | `/products` filter | `GET /products` query params | Filter UI exists; query mapping likely partial. | P2 |
| UC-28 | Compare Products | Buyer | MISSING | No route/page | None | Product comparison not implemented. | P2 |
| UC-29 | View Cart | Buyer | PARTIAL | `/cart` | `GET /cart` | UI/state exists; lint errors in cart components; stock/empty/error partial. | P0 |
| UC-30 | Add Product to Cart | Buyer | PARTIAL | Product card/detail | `POST /cart/items` | Action exists; auth/error/double click handling partial. | P1 |
| UC-31 | Remove Product from Cart | Buyer | PARTIAL | `/cart` | `DELETE /cart/items/{id}` | UI exists; lint issues and rollback/error handling need fix. | P1 |
| UC-32 | View Voucher | Buyer | PARTIAL | Cart/Profile voucher areas | `GET /vouchers`, checkout calculate | Public voucher listing exists; UX partial. | P2 |
| UC-33 | Apply Voucher | Buyer | PARTIAL | Cart voucher input | `PUT /cart/voucher` | UI/API exists; error handling present but needs edge tests. | P1 |
| UC-34 | Create Order | Buyer | PARTIAL | `/cart` checkout | `POST /orders` | Flow exists; ensure stock/payment not frontend-only. | P0 |
| UC-35 | Make Payment | Buyer | PARTIAL | payment return/cancel pages | `/payments/*`, `/orders/*/transaction`, PayOS verify | Payment callbacks exist; no secret found; state correctness depends backend. | P0 |
| UC-36 | View Wishlist | Buyer | PARTIAL | `/wishlist` | `GET /wishlist` | UI exists; loading/error/state consistency partial. | P1 |
| UC-37 | Add Product to Wishlist | Buyer | PARTIAL | Product card/detail | `POST /wishlist/{id}` | API wrapper exists; state sync partial. | P1 |
| UC-38 | Delete Product from Wishlist | Buyer | PARTIAL | `/wishlist` | `DELETE /wishlist/{id}` | API wrapper exists; confirm/error/refresh partial. | P1 |
| UC-39 | View Purchased Orders | Buyer | PARTIAL | `/orders` / profile order | `GET /orders/purchased*` | UI exists; duplicate order pages; pagination/status partial. | P1 |
| UC-40 | View Order Details | Buyer | PARTIAL | order detail components | `GET /orders/{id}` | UI exists; route clarity and loading/errors partial. | P1 |
| UC-41 | Cancel Order | Buyer | PARTIAL | order/profile order | `DELETE/PATCH /orders/{id}` service | Action exists in service; UI disable/confirmation needs verify. | P0 |
| UC-42 | Confirm Received | Buyer | PARTIAL | order/profile order | order confirmation service | UI mentions; double-submit and refresh wallet/status need verify. | P0 |
| UC-43 | Request Return / Refund | Buyer | MISSING | No buyer return form found | None | Return/refund request UI missing. | P0 |
| UC-44 | View Notifications | Buyer/Seller | PARTIAL | `/notifications`, popup | `GET /notifications` | UI/API exists; real-time/empty/error partial. | P2 |
| UC-45 | Delete Notification | Buyer/Seller | PARTIAL | notifications page/card | `DELETE /notifications/{id}` | API endpoint exists; UX/refresh partial. | P2 |
| UC-46 | View Order List | Seller | PARTIAL | `/seller/orders` | `GET /seller/orders` | UI exists; loading/error filters partial. | P1 |
| UC-47 | Update Order Status | Seller | PARTIAL | seller order detail/list | seller order service actions | Some actions exist; exact status transitions/disable unclear. | P0 |
| UC-48 | View Return Requests | Admin | MISSING | No admin return route | None | Return management missing. | P0 |
| UC-49 | View Return Request Details | Admin | MISSING | No admin return route | None | Missing. | P0 |
| UC-50 | Approve Return Request | Admin | MISSING | No admin return route | None | Missing. | P0 |
| UC-51 | Reject Return Request | Admin | MISSING | No admin return route | None | Missing. | P0 |
| UC-52 | Update Return Request Status | Admin | MISSING | No admin return route | None | Missing. | P0 |
| UC-53 | View Recommended Products | Buyer | PARTIAL | home/product suggestion | `GET /ai/recommendations/products` | API exists; UI fallback/loading partial. | P2 |
| UC-54 | View Similar Products | Buyer | COMPLETE | product detail suggestion | `GET /ai/recommendations/similar` | UI exists; fallback could improve. | P2 |
| UC-55 | Generate AI Price Recommendation | Seller | BLOCKED_BY_BACKEND | no verified seller product form integration | `GET /ai/product-price-predict` exists | Service exists but no seller UX verified in product form. | P1 |
| UC-56 | Use AI Shopping Assistant (Chatbot) | Buyer | COMPLETE | floating Chatbox AI tab | `POST /ai/chat` | Markdown/product link support added; structured products optional. | P1 |
| UC-57 | View Chat List | Buyer/Seller | COMPLETE | floating Chatbox sidebar | `GET /chats?page&pageSize` | Uses real API and selected chat sync. | P1 |
| UC-58 | Send Message | Buyer/Seller | COMPLETE | Chatbox content/input | `POST /chats/{chatId}/messages` | Basic flow complete; realtime/polling can improve. | P1 |
| UC-59 | View Product Reviews | Guest/Buyer | PARTIAL | product detail reviews | `GET /products/{id}/reviews` | UI/API exists; loading/error partial. | P2 |
| UC-60 | Add Product Review | Buyer | PARTIAL | product detail review | `POST /products/{id}/reviews` | API exists; eligibility/validation/refresh partial. | P1 |
| UC-61 | Update Product Review | Buyer | MISSING | No update review UI/API found | None | Missing. | P2 |
| UC-62 | Delete Product Review | Buyer | MISSING | No delete review UI/API found | None | Missing. | P2 |
| UC-63 | Rate Seller | Buyer | MISSING | No dedicated seller rating action | None | Missing. | P2 |
| UC-64 | View Seller Rating | Guest/Buyer | PARTIAL | product detail seller info/seller detail | seller stats/reviews unclear | Rating display partial; API mapping unclear. | P2 |
| UC-65 | Follow Seller | Buyer | COMPLETE | product/seller detail follow UI | `/sellers/{id}/follow` | API/cache mapping recently aligned. | P1 |
| UC-66 | Unfollow Seller | Buyer | COMPLETE | product/seller detail/follow list | `DELETE /sellers/{id}/follow` | API/cache mapping recently aligned. | P1 |
| UC-67 | View List Follow | Buyer | PARTIAL | profile follows | `/users/me/followed-sellers` | UI exists; pagination/error/cache partial. | P2 |
| UC-68 | AI Sentiment Analysis on Reviews | System | NOT_FRONTEND | n/a | n/a | System job/API only; FE may later show sentiment badges. | P3 |
| UC-69 | View Seller Dashboard | Seller | PARTIAL | `/seller/dashboard` | `/seller/dashboard` | Dashboard exists; charts/loading/error partial. | P1 |
| UC-70 | View Sales Reports | Seller | PARTIAL | `/seller/revenue` route component exists but not routed in current protected routes | service unclear | Route missing from nested seller routes. | P1 |
| UC-71 | View Customer Insights | Admin | BLOCKED_BY_BACKEND | admin dashboard maybe | service unclear | No dedicated customer insights UI/API integration. | P2 |
| UC-72 | View Account List | Admin | PARTIAL | `/admin/users` | `GET /admin/users` | UI exists; admin guard bug; loading/errors partial. | P0 |
| UC-73 | Lock User Account | Admin | PARTIAL | `/admin/users` | `/admin/users/{id}/lock` | API endpoint exists; confirmation/refresh needs verify. | P0 |
| UC-74 | Unlock User Account | Admin | PARTIAL | `/admin/users` | `/admin/users/{id}/unlock` | Same. | P0 |
| UC-75 | View Seller Registration Requests | Admin | PARTIAL | `/admin/seller` | `GET /admin/seller-shops/pending` | UI exists; detail route inconsistent. | P1 |
| UC-76 | Approve Seller Registration | Admin | PARTIAL | `/admin/seller` | `/admin/seller-shops/{id}/approve` | API exists; confirmation/error partial. | P1 |
| UC-77 | Reject Seller Registration | Admin | PARTIAL | `/admin/seller` | `/admin/seller-shops/{id}/reject` | API exists; reject reason UX unclear. | P1 |
| UC-78 | Create Voucher in System | Admin | PARTIAL | `/admin/vouchers` modal | `POST /admin/vouchers` | `isActive` fixed; no delete/edit modal verified; lint warning remains. | P0 |
| UC-79 | Update Voucher in System | Admin | PARTIAL | `/admin/vouchers` | `PUT /admin/vouchers/{id}` | API wrapper exists; edit UI not clearly implemented. | P1 |
| UC-80 | Delete Voucher in System | Admin | MISSING | No delete endpoint/action found in endpoint map | None | Missing. | P1 |
| UC-81 | Activate / Disable Voucher | Admin | PARTIAL | `/admin/vouchers` status | update API can carry `isActive` | Toggle/action unclear; create fixed. | P1 |
| UC-82 | View Payout Requests | Admin | PARTIAL | `/admin/finance` | `/admin/finance/money-flow` and approve/reject endpoints | Finance UI exists; request list semantics unclear. | P0 |
| UC-83 | Approve Payout | Admin | PARTIAL | `/admin/finance` | `/admin/finance/{id}/approve` | API exists; confirmation/error partial. | P0 |
| UC-84 | Reject Payout | Admin | PARTIAL | `/admin/finance` | `/admin/finance/{id}/reject` | API exists; reject reason UX unclear. | P0 |
| UC-85 | View Wallet | Seller | PARTIAL | seller wallet/settings/dashboard | `GET /seller/wallet` | Service exists; dedicated wallet route unclear. | P1 |
| UC-86 | Create Withdrawal Request | Seller | MISSING | No seller withdraw form found | None found | Missing seller withdrawal request UI. | P0 |
| UC-87 | Create Voucher for My Shop | Seller | PARTIAL | `/seller/vouchers` modal | `POST /seller/vouchers` | Create form exists; `isActive` fixed; list/update/delete unclear. | P1 |
| UC-88 | Update Voucher for My Shop | Seller | MISSING | No edit seller voucher UI found | None | Missing. | P1 |
| UC-89 | Delete Voucher for My Shop | Seller | MISSING | No delete seller voucher UI found | None | Missing. | P1 |

## C. Danh sách route hiện tại

| Route | Page | Actor | Guard | UC liên quan | Status |
|---|---|---|---|---|---|
| `/` | `src/pages/Home` | Guest/Buyer | Public | UC-09, UC-11, UC-53 | PARTIAL |
| `/login`, `/register`, `/forgot-password`, verify/reset routes | `src/pages/Auth` | Guest | Public | UC-01..UC-05 | PARTIAL |
| `/products` | `src/pages/Products` | Guest/Buyer | Public | UC-09, UC-26, UC-27 | PARTIAL |
| `/product-detail/:id` | `src/pages/ProductDetail` | Guest/Buyer | Public | UC-10, UC-54, UC-59, UC-65 | COMPLETE/PARTIAL |
| `/seller-detail/:id` | `src/pages/SellerDetail` | Guest/Buyer | Public | UC-64, UC-65 | PARTIAL |
| `/profile` | `src/pages/Profile` | Buyer/Seller | `ProtectedRoute` auth only | UC-06..UC-08 | PARTIAL |
| `/cart` | `src/pages/Cart/CartPage` | Buyer | `ProtectedRoute` auth only | UC-29..UC-35 | PARTIAL |
| `/wishlist` | `src/pages/WishList` | Buyer | `ProtectedRoute` auth only | UC-36..UC-38 | PARTIAL |
| `/orders` | `src/pages/OrderSelf` | Buyer | `ProtectedRoute` auth only | UC-39..UC-43 | PARTIAL |
| `/notifications` | `src/pages/Notifications` | Buyer/Seller | `ProtectedRoute` auth only | UC-44, UC-45 | PARTIAL |
| `/seller/register` | `src/pages/RegisterSeller` | Buyer | `ProtectedRoute` auth only | UC-75 (request side) | PARTIAL |
| `/seller/*` | `src/pages/Seller/SellerLayout` | Seller | **Auth only, no role guard** | UC-12..UC-17, UC-46, UC-69, UC-87 | INCORRECT guard |
| `/seller/dashboard` | Seller Dashboard | Seller | Auth only | UC-69 | PARTIAL |
| `/seller/products` | Seller Products | Seller | Auth only | UC-12..UC-17 | PARTIAL |
| `/seller/vouchers` | Seller Voucher | Seller | Auth only | UC-87..UC-89 | PARTIAL/MISSING |
| `/seller/orders` | Seller Orders | Seller | Auth only | UC-46, UC-47 | PARTIAL |
| `/seller/customers` | Seller Customers | Seller | Auth only | reporting only | PARTIAL |
| `/seller/settings` | Seller Settings | Seller | Auth only | UC-85/86 related | PARTIAL |
| `/admin/*` | `AdminLayout` | Admin | `PrivateRoute` | UC-18..UC-25, UC-71..UC-84 | **INCORRECT route key typo** |
| `/admin/users` | Admin Users | Admin | PrivateRoute | UC-72..UC-74 | PARTIAL |
| `/admin/products` | Admin Products | Admin | PrivateRoute | UC-18..UC-21 | PARTIAL |
| `/admin/categories` | Admin Categories | Admin | PrivateRoute | UC-22..UC-25 | PARTIAL |
| `/admin/seller` | Seller approvals | Admin | PrivateRoute | UC-75..UC-77 | PARTIAL |
| `/admin/vouchers` | Admin Voucher | Admin | PrivateRoute | UC-78..UC-81 | PARTIAL |
| `/admin/finance` | Admin Finance | Admin | PrivateRoute | UC-82..UC-84 | PARTIAL |
| `/payment-return`, `/payment-cancel` | Payment callback pages | Buyer | Public callback | UC-35 | PARTIAL |

Important route bug: `src/routes/private.routes.jsx` uses `elemnt: <PrivateRoute />` instead of `element`, so admin route guard may not wrap `/admin` as intended.

## D. Danh sách API frontend đang gọi

| Method | Endpoint | Service file | UC liên quan | Status |
|---|---|---|---|---|
| POST | `/auth/register` | `src/service/authService.js` | UC-01 | PARTIAL |
| POST | `/auth/login` | `src/service/authService.js` | UC-02 | PARTIAL |
| POST | `/auth/google-login` | `src/service/authService.js` | UC-03 | PARTIAL |
| POST | `/auth/logout` | `src/service/authService.js` | UC-04 | PARTIAL |
| POST | `/auth/forgot-password`, `/auth/reset-password` | `authService` | UC-05 | PARTIAL |
| GET/PUT | `/profile` | `src/service/userService.js` | UC-07, UC-08 | PARTIAL |
| GET | `/products`, `/products/{id}` | `src/api/productApi.js`, `productSlice` | UC-09, UC-10 | PARTIAL/COMPLETE |
| GET | `/categories` | `src/service/categoriesService.js` | UC-11 | PARTIAL |
| POST/PUT/DELETE | `/seller/products`, `/seller/products/{id}` | `src/service/sellerService.js` | UC-12, UC-14, UC-15 | PARTIAL/INCORRECT |
| Cloudinary POST | `https://api.cloudinary.com/v1_1/{cloud}/image/upload` | `src/services/cloudinaryService.js` | UC-13 | PARTIAL |
| GET/PATCH/DELETE | `/products/{id}/images*` | `src/api/productImageApi.js` | UC-13, UC-14 | PARTIAL |
| GET/POST/PUT/DELETE | `/cart`, `/cart/items`, `/cart/items/{id}` | `src/service/cartService.js` | UC-29..UC-31 | PARTIAL |
| GET/PUT | `/vouchers`, `/cart/voucher` | `src/api/voucherApi.js`, `voucherService` | UC-32, UC-33 | PARTIAL |
| POST/GET | `/orders`, `/orders/{id}`, `/orders/purchased*` | `src/api/orderApi.js`, `orderService` | UC-34, UC-39..UC-42 | PARTIAL |
| GET/POST | `/payments/*` | `src/api/paymentApi.js` | UC-35 | PARTIAL |
| POST/DELETE | `/wishlist/{productId}` | `src/api/wishlistApi.js` | UC-37, UC-38 | PARTIAL |
| GET | `/wishlist` | `userService` | UC-36 | PARTIAL |
| GET/DELETE | `/notifications`, `/notifications/{id}` | `notificationService` | UC-44, UC-45 | PARTIAL |
| GET/PATCH/POST | `/chats`, `/chats/{id}`, `/chats/{id}/messages`, read | `src/service/chatService.js` | UC-57, UC-58 | COMPLETE |
| POST | `/ai/chat` | `src/service/aiService.js` | UC-56 | COMPLETE |
| GET | `/ai/recommendations/similar` | `src/service/aiService.js` | UC-54 | COMPLETE |
| GET | `/ai/recommendations/products` | `src/service/aiService.js` | UC-53 | PARTIAL |
| GET | `/ai/product-price-predict` | `src/service/aiService.js` | UC-55 | BLOCKED/PARTIAL |
| GET/POST | `/products/{id}/reviews` | `src/service/reviewSevice.js` | UC-59, UC-60 | PARTIAL |
| POST/DELETE/GET | `/sellers/{id}/follow*`, `/users/me/followed-sellers` | `src/api/sellerFollowApi.js` | UC-65..UC-67 | COMPLETE/PARTIAL |
| GET | `/seller/dashboard`, `/seller/wallet` | seller dashboard/service | UC-69, UC-85 | PARTIAL |
| GET/POST | `/seller/orders`, status endpoints | `sellerService`, pages | UC-46, UC-47 | PARTIAL |
| GET/POST/PUT | `/admin/vouchers*` | `src/api/voucherApi.js` | UC-78..UC-81 | PARTIAL |
| GET/PATCH | `/admin/users*` | `src/service/adminService.js` | UC-72..UC-74 | PARTIAL |
| GET/POST | `/admin/seller-shops/*` | `adminService` | UC-75..UC-77 | PARTIAL |
| GET/POST | `/admin/finance/*` | `adminService` | UC-82..UC-84 | PARTIAL |

## E. UI đang dùng mock hoặc hard-code

- `src/utils/temporary.js` contains mock product/admin/wishlist/review data.
- `src/pages/Seller/index.jsx` contains hard-coded seller product-like content and is not routed for core seller dashboard.
- Some header/dropdown product search props use empty arrays or local derived data.
- Chat AI has static welcome text but real API for messages.
- Product examples for AI Markdown are not hard-coded in production component; UUID fallback is generic regex.

## F. Role và authorization issues

- `src/routes/private.routes.jsx` has typo `elemnt` instead of `element`, likely breaking admin guard wrapper.
- `src/guards/PrivateRoute.jsx` checks `isAdmin(role)` before checking token and reads token directly from localStorage; role is initially null after refresh unless restored from API/token.
- `src/guards/ProtectedRoute.jsx` only checks `isAuthenticated`; seller routes are not seller-role guarded.
- Client role can be stale because role is not persisted/rehydrated robustly after reload.
- `authService.login` swallows errors and returns undefined on catch; thunk then may fail inconsistently.
- `refreshToken` is stored in Redux but not consistently persisted to localStorage, while logout expects it in localStorage.

## G. File đã sửa / thay đổi đáng chú ý trong working tree

Audit report created:
- `docs/frontend-use-case-audit.md`

Existing uncommitted frontend changes already present before/during previous tasks include:
- Chat AI Markdown rendering: `src/components/common/Chatbox/*`, `src/service/aiService.js`, `package.json`, `package-lock.json`.
- Voucher `isActive` fix: `src/pages/Admin/Vouchers/Form/AddVoucher.jsx`, `src/api/voucherApi.js`, `src/pages/Admin/Vouchers/index.jsx`, `src/pages/Seller/Voucher/FormAdd/index.jsx`, `src/service/sellerService.js`.
- Product image/Cloudinary flow files from earlier tasks.

No backend file was modified.

## H. Kết quả lint, type-check, test, build

Commands run:

| Command | Result | Notes |
|---|---|---|
| `npm install react-markdown remark-gfm` | PASS | Added Markdown renderer deps; npm audit reports 9 vulnerabilities. |
| `npm run typecheck` | FAIL | Script missing in `package.json`. |
| `npm run type-check` | FAIL | Script missing in `package.json`. |
| `npm run test` | FAIL | Script missing in `package.json`. |
| targeted ESLint on changed Chatbox files | PASS | `AiMessageContent`, `ProductRecommendationCard`, `productLinkUtils`, `ChatMessage`, `index`, `aiService`. |
| targeted ESLint on voucher files | PASS with 1 warning | Warning in `Admin/Vouchers/index.jsx` existing memo dependency. |
| `npm run lint` | FAIL | 99 existing problems, mainly unused imports, setState-in-effect, service preserve-caught-error, `vite.config.js` `__dirname`. |
| `npm run build` | PASS | Vite build succeeds; large chunk warning. |

Docker:
- Dockerfile exists, but no frontend docker compose build was run in this audit because the active command set is npm and no specific frontend compose service name is declared in the prompt.

## I. Kế hoạch hoàn thiện

### P0 — bảo mật, thanh toán, order state, build/guard
1. Fix `src/routes/private.routes.jsx` typo `elemnt` → `element`; verify admin guard actually wraps admin routes.
2. Add seller role guard for `/seller/*`; don't rely only on backend rejection.
3. Fix auth token/refresh token lifecycle; persist/rehydrate role safely or fetch profile on app start.
4. Harden cart/checkout/order actions: stock validation, payment confirmation only after backend, disable duplicate cancel/confirm.
5. Implement buyer return/refund flow and admin return/refund management.
6. Implement seller withdrawal request UI.
7. Fix full `npm run lint` blocking issues.

### P1 — core UC gaps
1. Restore seller delete product button with confirmation and refresh.
2. Add seller inventory UI.
3. Complete seller voucher list/update/delete.
4. Complete admin voucher update/delete/activate-disable UI.
5. Complete seller revenue route in protected route tree.
6. Complete admin product moderation history.
7. Add seller AI price recommendation UI in product create/update.
8. Complete admin payout approve/reject UX with confirmation/reason.

### P2 — validation, error, responsive, tests
1. Add schema validation or consistent field validation to auth, voucher, product, checkout forms.
2. Add loading/empty/error/retry states screen-by-screen.
3. Add component/e2e tests for critical UC: login, cart checkout, payment callback, order confirm, seller product create/update, admin approve seller/product.
4. Normalize API wrappers and error parser; avoid services swallowing backend errors.
5. Remove production mock/hard-code sources from routed screens.

### P3 — UX improvements
1. Search debounce and persistent filters.
2. Better mobile layout for seller/admin tables.
3. Accessibility: labels, focus states, aria for dangerous actions.
4. Chat AI product cards should use backend structured `productReferences` for richer data.

## Kết luận

Frontend **chưa đủ theo tài liệu Use Case** ở mức production strict. Có nhiều nền UI/API đã được xây, nhưng còn thiếu role guard, một số UC lớn chưa có UI, nhiều flow chỉ partial, và lint toàn repo đang fail.

UC chưa có UI nổi bật:
- UC-21 Moderation History.
- UC-28 Compare Products.
- UC-43 Buyer Return/Refund Request.
- UC-48..UC-52 Admin Return/Refund Management.
- UC-61..UC-63 Review update/delete/rate seller.
- UC-80 Admin Delete Voucher.
- UC-86 Seller Withdrawal Request.
- UC-88..UC-89 Seller Voucher Update/Delete.

UC có UI nhưng chưa gọi API thật hoặc chưa đủ:
- UC-17 Inventory UI missing despite service presence.
- UC-55 AI price recommendation service exists but no verified seller UI.
- UC-70 Seller revenue component exists but not routed.
- UC-71 Customer insights lacks dedicated UI/API integration.

UC sai role/sai flow nổi bật:
- Admin guard likely broken by `elemnt` typo.
- Seller routes lack seller-role guard.
- Seller product delete action exists but UI button is commented.
- Auth refresh/logout lifecycle inconsistent.

Blocked by backend / contract unclear:
- Product image JSON contract must be supported by backend create/update product.
- Customer insights API/contract not clear in FE.
- AI price recommendation UI needs stable request/response contract.

Recommended next order:
1. Fix route guards and auth lifecycle.
2. Fix cart/checkout/order/payment state correctness.
3. Implement return/refund and withdrawal flows.
4. Complete seller product/voucher/inventory flows.
5. Complete admin moderation/voucher/payout/customer insight flows.
6. Add tests and fix lint debt.
