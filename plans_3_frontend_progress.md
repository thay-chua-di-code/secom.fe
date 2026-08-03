# plans_3 Frontend Progress

## Stack Audit
- [COMPLETED] Frontend project: Vite React app in repository root.
- [COMPLETED] Package manager: npm is active via `package-lock.json`; `pnpm-lock.yaml` also exists.
- [COMPLETED] Framework: React 19.2.6 with Vite 8.0.12/8.0.13 build output.
- [COMPLETED] Language: JavaScript JSX, no TypeScript source beyond Vite env type stub.
- [COMPLETED] Router: `react-router-dom` 7.15.1 via `src/routes`.
- [COMPLETED] State management: Redux Toolkit plus redux-persist patterns.
- [COMPLETED] Data fetching: Redux async thunks and Axios service layer; no React Query.
- [COMPLETED] Form library: controlled React forms; no React Hook Form/Formik found.
- [COMPLETED] Toast: `react-hot-toast`.
- [COMPLETED] UI/CSS: custom SCSS, Tailwind CSS dependency, lucide/react-icons.
- [COMPLETED] API client: `src/api/axiosClient.js` and service modules.
- [COMPLETED] Auth flow: token in localStorage, Redux auth slice, protected/private routes.
- [COMPLETED] Tests: Playwright e2e configured; no unit/component test runner configured.

## Seller Registration Toast
- [COMPLETED] Root cause: submit flow relied on a wrong success check (`success === 200`), duplicated loading toast id, validation was commented, service logged debug data, and status loading action was not dispatched.
- [COMPLETED] Solution: restored client validation, guarded duplicate submit, awaited upload/API, reused toast id for loading/success/error, preserved form on failure, dismissed stuck loading, and fixed status slice reject reason mapping.
- Changed files: `src/pages/RegisterSeller/Form/Step1/StoreInformation.jsx`, `src/pages/RegisterSeller/Form/Steps/StoreInformation.jsx`, `src/service/sellerService.js`, `src/redux/slice/sellerStatusSlice.js`.
- Endpoint: `POST ${API_ENDPOINTS.SELLER.REGISTER}`, `GET /seller/shop/status`.
- Tests: no unit test infra available; production build passed.

## Seller Products Delete, Quantity, Approval
- [PARTIAL] Root cause: seller create form sent `isPublic: true`, stock quantity was not part of create payload, delete reducer removed correct item but total count was not updated and current page could remain past last page.
- [COMPLETED] Solution: added `stockQuantity` number input and integer validation, sends `stockQuantity` as number, removed seller-managed `isPublic` from create/update payloads, changed create success toast to pending approval message, and updates pagination total after delete.
- [COMPLETED] Delete behavior: reducer filters only matching product id; no `setProducts([])` behavior found.
- Changed files: `src/pages/Seller/Products/FormAdd/index.jsx`, `src/pages/Seller/Products/FormUpdate/index.jsx`, `src/pages/Seller/Products/Products.jsx`, `src/redux/slice/seller/product/sellerProduct.js`.
- Endpoint: `POST /seller/products`, `PUT ${API_ENDPOINTS.SELLER.PRODUCT(productId)}`, `DELETE ${API_ENDPOINTS.SELLER.PRODUCT(productId)}`, `PUT ${API_ENDPOINTS.SELLER.PRODUCT_INVENTORY(productId)}`.
- [BLOCKED] Full admin product approval UI verification needs stable backend response contract for pending products and approval/reject endpoints in this FE repo.

## Checkout Voucher Remove
- [COMPLETED] Root cause: UI could apply a voucher but had no remove action, so checkout payload could keep `voucherCode` through local Redux/form state.
- [COMPLETED] Solution: added remove voucher button with accessible label/title, clears local selected voucher and Redux `voucherCode`, and checkout payload now resolves to `null` after removal.
- Changed files: `src/pages/Cart/CartPage.jsx`.
- Endpoint: uses existing `PUT ${API_ENDPOINTS.CART.APPLY_VOUCHER}` for apply; no remove voucher endpoint found in Frontend contract, so removal is local-only.
- [BLOCKED] Backend cart-session voucher removal endpoint is missing from FE contract; cannot call remove API without an endpoint.

## Admin Orders Product Names and Images
- [COMPLETED] Root cause: Admin order detail displayed mock fallback `Samsung Galaxy S24 Ultra` and list did not expose product names.
- [COMPLETED] Solution: added shared order item adapter and image component, maps `orderItems/items/orderDetails`, shows product summary in list, shows image/name/product id/quantity/seller/price in detail, and uses placeholder image fallback.
- Changed files: `src/components/order/orderItemAdapter.js`, `src/components/order/OrderProductImage.jsx`, `src/pages/Admin/Orders/index.jsx`, `src/pages/Admin/Orders/Detail/index.jsx`, `src/pages/Admin/Orders/Detail/style.scss`.
- Endpoint: Admin orders via existing `fetchOrders` thunk.
- [PARTIAL] Buyer/Seller/Return/Refund order pages still need the same shared adapter wired in; build safety confirmed for Admin path only.

## Admin Dashboard Logout and Button Accessibility
- [COMPLETED] Root cause: Admin header had notification icon button without accessible name and no logout action.
- [COMPLETED] Solution: added labeled logout button, dispatches local auth logout, clears token through auth slice, redirects to `/auth` with replace, and added notification aria-label/title.
- Changed files: `src/components/common/Admin/AdminHeader/index.jsx`.
- Endpoint: no logout API call wired because existing `authService.logout` requires dispatch and throws on API failure; local safe logout implemented per requirement.

## Voucher, Finance, Withdrawal, Seller Profile, Reviews
- [PARTIAL] Seller voucher delete now calls `sellerService.deleteVoucher`, disables duplicate delete, updates only the removed item, refetches current page, and shows toast success/error.
- Changed files: `src/pages/Seller/Voucher/Voucher.jsx`, `src/pages/Seller/Voucher/FormAdd/index.jsx`.
- Endpoint: `DELETE /seller/vouchers/{voucherId}`.
- [PARTIAL] Admin voucher approval routes/endpoints are not fully represented in the FE contract; admin voucher module currently supports create/delete/list patterns rather than approve/reject workflow.
- [BLOCKED] Checkout remove voucher backend endpoint missing from FE contract.
- [PARTIAL] Finance/withdrawal/profile/review modules were audited by search but not fully modified due breadth and existing lint debt.
- Backend fields to confirm: finance fee fields `grossAmount`, `platformFee`, `transactionFee`, `paymentFee`, `shippingFee`, `refundAmount`, `sellerNetAmount`, `platformRevenue`; order item fields `productImageUrl`, `canReview`, `hasReviewed`, `reviewId`; voucher approval reject reason fields.

## Validation Commands
- [COMPLETED] `npm run build`: passed.
- [PARTIAL] `npm run lint`: failed due 88 existing lint errors and 6 warnings across unrelated files, including unused imports, React compiler set-state-in-effect warnings, preserve-caught-error rules, and `vite.config.js` `__dirname` no-undef. New fast-refresh export error from order component was fixed before build.
- [NOT STARTED] E2E tests: not run because no app server/test data contract was prepared and lint has existing repository-wide failures.

## Remaining Items
- [PARTIAL] Wire shared order image adapter into Buyer/Seller/Return/Refund order pages.
- [PARTIAL] Implement full admin product approval and admin voucher approval only after confirming endpoint names and response shape.
- [PARTIAL] Refactor seller voucher create/edit/delete with shared delete mutation and approval status mapping.
- [PARTIAL] Finance fee display requires verified backend response fields.
- [PARTIAL] Withdrawal text contrast and dead-button sweep require a dedicated UI pass across all pages.

## Final Verification Update
- [COMPLETED] `npx eslint` on changed Frontend files: passed.
- [COMPLETED] `npm run build`: passed after voucher changes.
- [PARTIAL] Repository-wide `npm run lint`: still fails on pre-existing unrelated errors outside changed files; changed files pass targeted lint.
- [COMPLETED] No Backend source, database migration, or Backend deploy config was modified.

## Continuation Update After Added APIs
- [COMPLETED] Checkout remove voucher now calls backend with `DELETE /cart/voucher` through `cartService.removeVoucher`, Redux `removeCartVoucher`, and `useCart.removeVoucher`; local voucher state is cleared only on successful API response.
- Changed files: `src/service/cartService.js`, `src/redux/slice/cartSlice.js`, `src/hooks/useCart.js`, `src/pages/Cart/CartPage.jsx`.
- Endpoint: `DELETE /cart/voucher` using existing `API_ENDPOINTS.CART.APPLY_VOUCHER` path.
- [COMPLETED] Finance Admin withdrawal table now displays fee breakdown fields from API data: gross amount, platform fee, payment/transaction fee, shipping fee, refund amount, and seller net amount. Values use API fields with safe 0 fallback and VND formatting.
- Changed files: `src/pages/Admin/Finance/index.jsx`, `src/service/adminService.js`.
- Endpoint: `GET /admin/finance/money-flow`, `GET /admin/payouts`, `POST /admin/payouts/{id}/approve`, `POST /admin/payouts/{id}/reject`.
- [COMPLETED] Removed payout approve/reject debug console logs from `adminService`.
- [COMPLETED] Targeted lint on changed files except legacy `adminService.js` debt: passed.
- [COMPLETED] `npm run build`: passed.
- [PARTIAL] `adminService.js` remains excluded from targeted lint because it contains pre-existing lint debt unrelated to this continuation: unused dashboard imports, preserve-caught-error violations, no-useless-catch wrappers.
- [BLOCKED] Admin voucher approve/reject endpoints still are not present in `src/api/endPoint.js`; existing admin voucher API only exposes list/create/update/delete paths under `/admin/vouchers`.

## Cart Item Delete Bug Fix
- [COMPLETED] Root cause: `removeCartItem` thunk returned the `DELETE /cart/items/{id}` response directly, but that response is not a full cart payload. The fulfilled reducer called `mapCartState` on it, so `items` became `[]` and the UI showed an empty cart until reload.
- [COMPLETED] Solution: after delete succeeds, `removeCartItem` now refetches `GET /cart` and maps the fresh cart payload. It no longer logs delete responses.
- [COMPLETED] Cart list buttons now respect disabled/action loading and expose accessible remove labels. Mobile `CartItem` remove button is no longer a disabled dead button.
- [COMPLETED] Checkout selected item IDs are derived from currently available cart items, so stale deleted IDs are not sent in apply voucher or checkout payloads.
- Changed files: `src/redux/slice/cartSlice.js`, `src/pages/Cart/List/index.jsx`, `src/pages/Cart/CartPage.jsx`, `src/components/cart/CartItem.jsx`.
- Endpoints: `DELETE /cart/items/{cartItemId}`, then `GET /cart`.
- Validation: `npx eslint src/redux/slice/cartSlice.js src/pages/Cart/List/index.jsx src/pages/Cart/CartPage.jsx src/components/cart/CartItem.jsx src/service/cartService.js src/hooks/useCart.js` passed; `npm run build` passed.

## Buyer/Admin Order Detail Product Image and Name Fix
- [COMPLETED] Root cause: Buyer order detail used local item helpers that only checked `productImageUrl/imageUrl` and rendered no image in the detail item row. Admin order detail used partial field guesses and did not normalize nested `product` shapes.
- [COMPLETED] Solution: expanded shared `orderItemAdapter` to support `orderItems/items/orderDetails/products`, nested `product` objects, primary product images, product title/name variants, product id, quantity, unit price, and total price.
- [COMPLETED] Buyer order detail now renders `OrderProductImage`, normalized product name, product id, status, quantity, unit price, and total price. Return item selection also uses the shared image/name adapter.
- [COMPLETED] Admin order detail now uses normalized item id/product id/quantity/total price and fixed text contrast inside product rows.
- Changed files: `src/components/order/orderItemAdapter.js`, `src/pages/Profile/Order/index.jsx`, `src/pages/Profile/Order/style.scss`, `src/pages/Admin/Orders/Detail/index.jsx`, `src/pages/Admin/Orders/Detail/style.scss`.
- Validation: `npx eslint` on changed JS/JSX files passed; SCSS files are ignored by ESLint config with warnings only. `npm run build` passed.

## Product Links From Order Detail
- [COMPLETED] Added product detail links for product image and product name in Buyer and Admin order detail views.
- [COMPLETED] Route used: `/product-detail/{productSlug || productId}` from existing `ROUTES.PRODUCT.PRODUCT_DETAIL`.
- [COMPLETED] Shared adapter now exposes `getOrderItemProductSlug` and `getOrderItemProductPath`, using `productSlug/slug/product.slug` first and falling back to `productId/product.id`.
- Changed files: `src/components/order/orderItemAdapter.js`, `src/pages/Profile/Order/index.jsx`, `src/pages/Profile/Order/style.scss`, `src/pages/Admin/Orders/Detail/index.jsx`, `src/pages/Admin/Orders/Detail/style.scss`.
- Validation: `npx eslint src/components/order/orderItemAdapter.js src/pages/Profile/Order/index.jsx src/pages/Admin/Orders/Detail/index.jsx` passed; `npm run build` passed.

## Admin Product/Voucher Action Scope Update
- [COMPLETED] Admin product list no longer exposes edit action; only moderation-related actions remain: view moderation history, approve, and reject.
- [COMPLETED] Admin voucher page no longer exposes create, edit, or delete UI/actions. The visible row actions are now approve/reject for pending vouchers only.
- [COMPLETED] Added admin voucher moderation endpoints and thunks: `POST /admin/vouchers/{voucherId}/approve` and `POST /admin/vouchers/{voucherId}/reject` with required reject reason.
- Changed files: `src/pages/Admin/Products/index.jsx`, `src/pages/Admin/Vouchers/index.jsx`, `src/pages/Admin/Vouchers/style.scss`, `src/api/endPoint.js`, `src/api/voucherApi.js`, `src/redux/slice/admin/vouchers/voucherThunk.js`, `src/redux/slice/admin/vouchers/voucherSlice.js`.
- Validation: `npx eslint src/pages/Admin/Products/index.jsx src/pages/Admin/Vouchers/index.jsx src/api/endPoint.js src/api/voucherApi.js src/redux/slice/admin/vouchers/voucherThunk.js src/redux/slice/admin/vouchers/voucherSlice.js` passed; `npm run build` passed.

## Seller Detail Products From This Shop
- [COMPLETED] Replaced hard-coded mock products in `Products from this shop` with real data from `GET /products/search`.
- [COMPLETED] Request sends `SellerId`, `Page`, and `PageSize`; UI also filters returned items by seller id when the field exists to avoid cross-shop products.
- [COMPLETED] Added loading, error, and empty states for shop products.
- [COMPLETED] Product cards use real id/name/price/image fields with fallbacks and navigate to `/product-detail/{productId}` from image or View button.
- Changed files: `src/pages/SellerDetail/index.jsx`, `src/pages/SellerDetail/style.scss`, `src/api/productApi.js`, `src/api/endPoint.js`.
- Validation: `npx eslint src/pages/SellerDetail/index.jsx src/api/productApi.js src/api/endPoint.js` passed; `npm run build` passed.

## Related Products API Mapping
- [COMPLETED] Verified `Related Products` was already reading `productDetail.relatedProducts` from product detail API, but had no API fallback and weak field mapping.
- [COMPLETED] Added fallback fetch from `GET /ai/recommendations/similar` via `aiService.similarProduct(productId)` when product detail does not include `relatedProducts`.
- [COMPLETED] Normalized related product fields across detail API and AI API shapes: `id/productId`, `name/productName`, `thumbnailUrl/imageUrl/primaryImageUrl/images`, `category/categoryName`, condition, location, price.
- [COMPLETED] Removed remote placeholder mock image URL and uses local `/favicon.svg` fallback only when API has no image.
- [COMPLETED] Added loading, error, and empty states for Related Products.
- Changed files: `src/pages/ProductDetail/RelatedProduct/index.jsx`, `src/pages/ProductDetail/RelatedProduct/style.scss`, `src/pages/ProductDetail/index.jsx`, `src/service/aiService.js`.
- Validation: `npx eslint src/pages/ProductDetail/RelatedProduct/index.jsx src/pages/ProductDetail/index.jsx src/service/aiService.js` passed; `npm run build` passed.

## Admin Logout Placement Update
- [COMPLETED] Moved Admin logout out of the header and into the sidebar Settings button.
- [COMPLETED] Settings button now toggles a small menu with `Đăng xuất`; logout still clears auth state and redirects with `replace`.
- Changed files: `src/components/common/Admin/AdminHeader/index.jsx`, `src/components/common/Admin/Sidebar/index.jsx`, `src/components/common/Admin/Sidebar/style.scss`.
- Validation: `npx eslint src/components/common/Admin/AdminHeader/index.jsx src/components/common/Admin/Sidebar/index.jsx` passed; `npm run build` passed.

## Admin Header Search Notification Cleanup
- [COMPLETED] Removed the blue `AD` admin avatar from the Admin header; header actions now only contain Search and Notification.
- [COMPLETED] Search is now a real form: clickable/focusable input, submit by Enter or search icon, updates `q` query param, calls optional `onSearch`, and emits `secom:admin-search` for page-level reuse.
- [COMPLETED] Notification icon now opens/closes a dropdown, loads notifications from existing Redux thunk, displays loading/error/empty/list states, preserves unread dot, and closes on outside click.
- [COMPLETED] Removed notification service debug logging.
- Changed files: `src/components/common/Admin/AdminHeader/index.jsx`, `src/components/common/Admin/AdminHeader/style.scss`, `src/service/notificationService.js`.
- Validation: `npx eslint src/components/common/Admin/AdminHeader/index.jsx src/service/notificationService.js` passed; `npm run build` passed.

## Admin Header Home Pattern Update
- [COMPLETED] Updated Admin header search to reuse Home header pattern: `Input` with search icon, `SearchDropdown`, product search thunk, click-outside close, clearable input.
- [COMPLETED] Updated Admin notification to reuse existing Home notification dropdown component instead of custom Admin popover.
- [COMPLETED] Kept Admin header scoped styles so Home components fit the dark Admin dashboard header.
- Changed files: `src/components/common/Admin/AdminHeader/index.jsx`, `src/components/common/Admin/AdminHeader/style.scss`.
- Validation: `npx eslint src/components/common/Admin/AdminHeader/index.jsx` passed; `npm run build` passed.

## Admin Header Dropdown Dark Theme
- [COMPLETED] Updated Admin header Search dropdown colors to match the dark Admin dashboard theme: dark background, slate borders, light text, blue hover states, red price accents.
- [COMPLETED] Updated Admin header Notification dropdown colors to match the dark Admin dashboard theme: dark panel/list/footer, light title text, muted empty text, blue view-all link.
- Changed file: `src/components/common/Admin/AdminHeader/style.scss`.
- Validation: `npx eslint src/components/common/Admin/AdminHeader/index.jsx` passed; `npm run build` passed.

## Admin Search Dropdown Content Update
- [COMPLETED] Replaced shopper-oriented Search dropdown content in Admin header with Admin-specific content.
- [COMPLETED] Removed categories/trending/product-card content from Admin dropdown.
- [COMPLETED] Admin dropdown now shows quick admin navigation and keyword-aware module links for Products, Orders, Users, Vouchers, Return / Refund, Finance, Categories, and Seller Shops.
- [COMPLETED] Pressing Enter searches within the current Admin module by navigating with `?q={keyword}`.
- Changed files: `src/components/common/Admin/AdminHeader/index.jsx`, `src/components/common/Admin/AdminHeader/style.scss`.
- Validation: `npx eslint src/components/common/Admin/AdminHeader/index.jsx` passed; `npm run build` passed.

## Seller Registration Toast Completion Redirect
- [COMPLETED] Root cause: success toast was dismissed from `finally`, so both success and error paths shared the same dismissal behavior and the form never moved to the existing submitted-status screen until data was refetched.
- [COMPLETED] Solution: parent registration form now passes `onSubmitted` to the seller form; after successful API submission, the success toast remains visible briefly, then dismisses and switches to the `PENDING` status screen.
- [COMPLETED] Error path keeps the error toast and does not reset the form or navigate to the submitted screen.
- [COMPLETED] Updated seller registration success copy to match the seller application flow instead of product approval copy.
- Changed files: `src/pages/RegisterSeller/Form/index.jsx`, `src/pages/RegisterSeller/Form/Step1/StoreInformation.jsx`, `src/pages/RegisterSeller/Form/Steps/StoreInformation.jsx`.
- Endpoint: `POST /seller/become-seller` via `sellerService.becomeSeller`.
- Validation: `npx eslint src/pages/RegisterSeller/Form/index.jsx src/pages/RegisterSeller/Form/Step1/StoreInformation.jsx src/pages/RegisterSeller/Form/Steps/StoreInformation.jsx` passed; `npm run build` passed.

## Home Product Compare Button
- [COMPLETED] Added compare action to Home product cards using the existing `useCompare` hook and local compare storage flow.
- [COMPLETED] Added a Home floating compare button and reused the shared `CompareModal` so selected Home products can be compared directly.
- [COMPLETED] Compare card action has active state, accessible label, tooltip title, success/error toast, and max-product validation from existing compare utility.
- Changed files: `src/pages/Home/index.jsx`, `src/pages/Home/style.scss`, `src/pages/Home/Products/Card/index.jsx`.
- Validation: `npx eslint src/pages/Home/index.jsx src/pages/Home/Products/Card/index.jsx` passed; `npm run build` passed.

## Home Compare Floating Position Fix
- [COMPLETED] Root cause: Home compare floating button used the same bottom-right position as the global chat button.
- [COMPLETED] Moved Home compare button above chat with higher local stacking so both buttons remain clickable.
- Changed file: `src/pages/Home/style.scss`.
- Validation: `npm run build` passed.
