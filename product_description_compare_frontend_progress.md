# Product Description Compare Frontend Progress

## Status
- [COMPLETED] Integrated `Compare with AI` into the existing product compare modal.
- [COMPLETED] Uses real Backend endpoint `POST /products/compare-descriptions` through the existing Axios client base URL.
- [COMPLETED] Does not send product descriptions from Frontend; request body contains only `productIds`.

## Button Location
- `Compare with AI` is rendered in the shared compare modal header at `src/components/common/CompareModal/index.jsx`.
- The modal is currently opened from Product listing compare flow and Home compare flow.
- Product selection reuses existing `useCompare` and local compare selection state.

## Selection Flow
- User selects products with existing compare actions on product cards.
- Modal computes unique selected IDs from selected products.
- Button is disabled when fewer than 2 valid product IDs are available or while request is loading.
- Duplicate, empty, undefined product IDs are removed before request.

## API Service
- Added endpoint constant: `API_ENDPOINTS.PRODUCT.COMPARE_DESCRIPTIONS`.
- Added service: `src/api/productComparisonApi.js`.
- Endpoint called: `POST /products/compare-descriptions`.
- Request body: `{ "productIds": ["id-1", "id-2"] }`.
- No `description` or other client-side comparison data is sent.

## Response Mapping
- Mapper handles response wrappers: `response.data.data`, `response.data.Data`, or direct payload.
- Mapper normalizes camelCase/PascalCase response fields.
- Normalized sections: `products`, `comparison`, `similarityScore`, `sameAttributes`, `differentAttributes`, `missingAttributes`, `commonContent`, `uniqueContentByProduct`.

## Result UI
- Component: `src/components/common/CompareModal/index.jsx`.
- Shows overview with product count, `similarityScore`, and score label.
- Shows product image, name, description fallback, warnings, and extracted attributes.
- Shows same attributes, different attributes with dynamic product columns, missing attributes, common content, and unique content per product.
- Uses image placeholder fallback for missing/broken images.
- Mobile and long table content use scrollable responsive layout.

## Loading, Error, Empty State
- Loading state disables button and displays spinner with `Đang so sánh...`.
- API errors show Backend message when available and toast fallback messages for 400/401/403/404/network errors.
- Result is reset before a new request so stale successful data is not shown after failed compare.
- Empty arrays render clear fallback text instead of blank sections.

## Files Changed
- `src/api/endPoint.js`
- `src/api/productComparisonApi.js`
- `src/components/common/CompareModal/index.jsx`
- `src/components/common/CompareModal/style.scss`

## Validation
- Targeted lint passed: `npx eslint src/components/common/CompareModal/index.jsx src/api/productComparisonApi.js src/api/endPoint.js`.
- Production build passed: `npm run build`.
- Full lint `npm run lint` failed because of existing unrelated errors outside this change, including unused variables and React hook lint errors in cart/auth/admin/seller/service files.
- No TypeScript check script exists in `package.json`.
- No unit/component test script exists in `package.json`; only `test:e2e` is configured.

## Blocked / Missing
- No Backend contract blocker found for `POST /api/products/compare-descriptions`.
- Endpoint path is configured as `/products/compare-descriptions` because existing Axios base URL already targets the API prefix used by all current services.

## Structured AI Result Rendering Fix
- [COMPLETED] Root cause: FE mapper and modal only understood the older `similarityScore/sameAttributes/differentAttributes` shape. If Backend returned structured AI result fields like `summary`, `criteria`, `similarities`, `differences`, and `recommendations`, the API request succeeded but UI had little or no result content to render.
- [COMPLETED] Updated `productComparisonApi` to normalize both response contracts: wrapper/no-wrapper, camelCase/PascalCase, `products`, `comparison`, `summary`, `criteria`, `similarities`, `differences`, `recommendations`, `disclaimer`, and legacy description-attribute fields.
- [COMPLETED] Updated `CompareModal` to render summary, dynamic criteria table, similarities/common content, differences, recommendations, disclaimer, empty result state, and development-only API response debug logging.
- [COMPLETED] Selection changes no longer display stale AI results because the stored result is tied to a stable selected-product key.
- Changed files: `src/api/productComparisonApi.js`, `src/components/common/CompareModal/index.jsx`, `src/components/common/CompareModal/style.scss`.
- Validation: targeted `npx eslint src/api/productComparisonApi.js src/components/common/CompareModal/index.jsx src/pages/Home/index.jsx src/pages/Home/Products/Card/index.jsx` passed; `npm run build` passed. Full `npm run lint` still fails on pre-existing unrelated lint errors; `npm test` fails because no `test` script exists.
