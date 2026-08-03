RONTEND IMPLEMENTATION PLAN
1. Mục tiêu
Rà soát và chỉnh sửa Frontend cho các chức năng:
•
•
•
•
•
•
•
•
•
•
•
•
•
•
Đăng ký Seller.
Danh sách và xóa sản phẩm.
Thêm số lượng sản phẩm.
Tạo, sửa và xóa Voucher của Seller.
Admin duyệt Voucher.
Admin duyệt sản phẩm.
Checkout và xóa Voucher đã áp dụng.
Order của Buyer, Seller và Admin.
Đánh giá sản phẩm từ Order.
Finance Admin.
Withdrawal Request.
Seller Profile.
Admin Dashboard.
Rà soát các nút không có chức năng hoặc không rõ mục đích.
Không thay đổi thiết kế tổng thể ngoài những khu vực được yêu cầu. Ưu tiên tái sử dụng component, hook,
API service, type và layout hiện có.
PHASE 1 — RÀ SOÁT CẤU TRÚC FRONTEND
Step 1.1 — Xác định framework và thư viện
Kiểm tra:
•
•
•
•
•
•
•
•
•
•
•
•
•
React hoặc Next.js.
TypeScript hoặc JavaScript.
React Router hoặc router tương ứng.
State management:
Context.
Redux.
Zustand.
React Query.
Form:
React Hook Form.
Formik.
Toast:
React Toastify.
1
•
•
•
•
•
•
•
•
•
•
•
Sonner.
React Hot Toast.
UI library:
Tailwind CSS.
Material UI.
Ant Design.
Shadcn.
API client:
Axios.
Fetch.
Generated Swagger client.
Không thêm thư viện mới nếu chức năng hiện tại có thể tái sử dụng thư viện đang có.
Step 1.2 — Rà soát các thư mục liên quan
Kiểm tra:
src/
├── api/
├── services/
├── hooks/
├── stores/
├── contexts/
├── types/
├── components/
├── layouts/
├── pages/
├── routes/
├── features/
└── utils/
Các module cần tìm:
seller-registration
seller-profile
seller-products
seller-vouchers
admin-products
admin-vouchers
cart
checkout
orders
reviews
finance
2
withdrawals
admin-dashboard
Step 1.3 — Lập bảng mapping
Với từng chức năng, xác định:
Page/Component
→ Hook hoặc Store
→ API Service
→ Endpoint
→ Request Type
→ Response Type
→ Loading State
→ Success State
→ Error State
Đánh dấu:
•
•
•
•
•
•
•
•
•
Đang dùng mock data.
Endpoint chưa được gọi.
Response mapping sai.
Trường dữ liệu có trong API nhưng UI chưa hiển thị.
Nút có giao diện nhưng chưa có handler.
Handler chỉ console.log.
Route chưa tồn tại.
State bị reset sai.
Cache không được invalidate sau mutation.
PHASE 2 — SỬA TOAST ĐĂNG KÝ SELLER
Vấn đề
User đăng ký Seller nhưng toast loading không được thay bằng thông báo thành công hoặc thất bại.
Step 2.1 — Kiểm tra submit handler
Tìm form đăng ký Seller và kiểm tra:
•
•
•
Có await API request không.
Promise có được return đúng không.
Có try/catch/finally không.
3
•
•
•
•
Toast loading ID có được lưu không.
Có redirect trước khi toast success chạy không.
API service có nuốt lỗi không.
Mutation hook có gọi onSuccess hoặc onError không.
Step 2.2 — Chuẩn hóa toast lifecycle
Luồng cần thực hiện:
User submit form
→ validate client
→ tạo loading toast
→ gọi API
→ success: đóng loading và hiện success
→ error: đóng loading và hiện error
→ finally: đảm bảo loading toast không bị treo
Ví dụ:
const handleSubmit = async (values: SellerRegistrationFormValues) => {
const toastId = toast.loading("Đang gửi yêu cầu đăng ký...");
try {
const response = await sellerService.register(values);
toast.success(
response.message ?? "Đăng ký người bán thành công.",
{ id: toastId }
);
navigate("/seller-registration/status");
} catch (error) {
toast.error(getApiErrorMessage(error), {
id: toastId,
});
}
};
Nếu thư viện toast không hỗ trợ thay thế bằng id :
const toastId = toast.loading(...);
try {
await request();
4
toast.dismiss(toastId);
toast.success(...);
} catch (error) {
toast.dismiss(toastId);
toast.error(...);
}
Step 2.3 — Chặn submit trùng
•
•
•
•
•
Disable nút submit khi request đang chạy.
Không cho click nhiều lần.
Hiển thị spinner trong nút.
Không reset form nếu API thất bại.
Chỉ redirect sau khi success toast đã được gọi.
Step 2.4 — Xử lý trạng thái đăng ký
Sau khi đăng ký thành công:
•
•
•
•
Hiển thị trạng thái Pending.
Không cho gửi request mới nếu đã có request đang chờ.
Nếu Backend trả 409 , hiển thị thông báo phù hợp.
Nếu User đã là Seller, điều hướng đến Seller Dashboard.
Acceptance Criteria
•
•
•
•
•
Không còn toast loading bị treo.
Thành công hiển thị success toast.
Thất bại hiển thị message từ API.
Không submit trùng.
Refresh trang vẫn xem được trạng thái đăng ký.
PHASE 3 — SỬA LỖI XÓA MỘT SẢN PHẨM NHƯNG
DANH SÁCH HIỂN THỊ EMPTY
Step 3.1 — Kiểm tra mutation xóa sản phẩm
Tìm chức năng:
Delete Product
5
Kiểm tra có đoạn code sai như:
setProducts([]);
hoặc:
setData(null);
sau khi xóa hay không.
Không được xóa toàn bộ state khi chỉ xóa một item.
Step 3.2 — Cập nhật state đúng
Có hai phương án.
Phương án A — Invalidate và gọi lại API
Nếu dùng React Query:
await deleteProduct(productId);
queryClient.invalidateQueries({
queryKey: ["seller-products"],
});
Ưu tiên phương án này nếu pagination, filter và tổng số bản ghi do Backend quản lý.
Phương án B — Xóa đúng item khỏi state
setProducts((current) =>
current.filter((product) => product.id !== productId)
);
Đồng thời cập nhật:
setTotalItems((total) => Math.max(total - 1, 0));
6
Step 3.3 — Xử lý pagination
Nếu xóa phần tử cuối cùng của trang hiện tại:
page > 1
AND items còn lại trên trang = 0
thì:
setPage((currentPage) => currentPage - 1);
Sau đó fetch lại dữ liệu.
Không hiển thị empty toàn hệ thống chỉ vì trang hiện tại không còn item.
Step 3.4 — Sửa điều kiện Empty State
Không dùng:
if (!data) {
return <Empty />;
}
Cần phân biệt:
Loading
Error
API chưa trả dữ liệu
Trang hiện tại rỗng
Toàn bộ danh sách rỗng
Logic đề xuất:
if (isLoading) return <LoadingState />;
if (isError) return <ErrorState />;
if (totalItems === 0) return <EmptyProductState />;
return <ProductList />;
7
Step 3.5 — Kiểm tra cache key
Nếu dùng React Query, query key cần chứa:
[
"seller-products",
page,
pageSize,
keyword,
status,
sortBy
]
Nếu thiếu filter hoặc page trong query key, dữ liệu có thể bị dùng cache sai.
Acceptance Criteria
•
•
•
•
•
Xóa một sản phẩm chỉ loại đúng sản phẩm đó.
Danh sách vẫn hiển thị các sản phẩm còn lại.
Tổng số sản phẩm cập nhật đúng.
Xóa item cuối trang thì chuyển về trang trước.
Empty state chỉ xuất hiện khi thật sự không còn sản phẩm.
PHASE 4 — THÊM THUỘC TÍNH SỐ LƯỢNG KHI
THÊM SẢN PHẨM
Step 4.1 — Cập nhật type và schema
Bổ sung:
stockQuantity: number;
vào:
•
•
•
•
•
•
Product type.
Create Product form type.
Edit Product form type.
Request payload.
API response type.
Validation schema.
8
Step 4.2 — Thêm input số lượng
Trong form tạo sản phẩm:
Label: Số lượng
Type: number
Min: 0
Step: 1
Required: true
Ví dụ:
<input
type="number"
min={0}
step={1}
{...register("stockQuantity", {
valueAsNumber: true,
})}
/>
Step 4.3 — Validation
Yêu cầu:
•
•
•
•
•
Không để trống.
Không nhận số âm.
Không nhận số thập phân.
Không gửi NaN .
Có message rõ ràng.
Ví dụ:
Số lượng là bắt buộc.
Số lượng không được nhỏ hơn 0.
Số lượng phải là số nguyên.
Step 4.4 — Chuẩn hóa payload
Kiểm tra trường hợp form trả về chuỗi:
9
stockQuantity: Number(values.stockQuantity)
Không gửi:
{
"stockQuantity": ""
}
hoặc:
{
"stockQuantity": null
}
trừ khi Backend cho phép.
Step 4.5 — Edit Product
Form chỉnh sửa sản phẩm cần:
•
•
•
•
Load số lượng hiện tại.
Không reset thành 0 nếu API chưa load xong.
Cho Seller cập nhật số lượng.
Hiển thị lỗi từ Backend nếu số lượng không hợp lệ.
Acceptance Criteria
•
•
•
•
•
Form tạo sản phẩm có trường số lượng.
Form chỉnh sửa hiển thị đúng số lượng cũ.
Payload gửi đúng kiểu số.
Không nhập được số âm hoặc số thập phân.
Sau tạo hoặc sửa, danh sách hiển thị đúng tồn kho.
10
PHASE 5 — LUỒNG TẠO SẢN PHẨM CHỜ ADMIN
DUYỆT
Yêu cầu
Seller tạo sản phẩm
→ Product Pending
→ Chưa xuất hiện trên website
→ Admin Approve
→ Product mới Active/Public
Step 5.1 — Sửa form tạo sản phẩm
Frontend không được gửi:
isApproved = true
isActive = true
isPublic = true
nếu các trạng thái này do Backend quản lý.
Sau khi tạo thành công:
•
•
•
•
•
Hiển thị toast:
“Sản phẩm đã được gửi và đang chờ quản trị viên phê duyệt.”
Không điều hướng đến public product page.
Điều hướng về danh sách sản phẩm Seller.
Hiển thị badge Pending.
Step 5.2 — Cập nhật Product Status Badge
Tạo component dùng chung:
<ProductApprovalBadge status={product.approvalStatus} />
Các trạng thái:
Pending
Approved
Rejected
11
Disabled
Draft
Mỗi trạng thái cần:
•
•
•
•
Label tiếng Việt.
Màu dễ đọc.
Tooltip hoặc mô tả.
Không chỉ dùng màu để truyền đạt trạng thái.
Step 5.3 — Hiển thị lý do từ chối
Nếu trạng thái Rejected :
•
•
•
•
Hiển thị lý do từ API.
Có thể đặt trong tooltip hoặc phần chi tiết.
Seller có thể mở form chỉnh sửa.
Sau khi sửa và submit lại, hiển thị trạng thái Pending.
Step 5.4 — Trang Admin duyệt sản phẩm
Kiểm tra hoặc xây dựng:
/admin/products
/admin/products/pending
/admin/products/:productId
Trang danh sách cần:
•
•
•
•
•
•
•
•
•
•
•
Filter theo trạng thái.
Tên sản phẩm.
Ảnh.
Seller.
Giá.
Số lượng.
Ngày gửi.
Trạng thái.
Nút xem chi tiết.
Nút Approve.
Nút Reject.
12
Step 5.5 — Approve Product
Khi Admin bấm Approve:
•
•
•
•
•
•
•
Hiển thị confirmation modal.
Disable nút khi đang request.
Gọi API approve.
Toast success hoặc error.
Invalidate danh sách pending.
Cập nhật Product Detail.
Không cho click nhiều lần.
Step 5.6 — Reject Product
Khi Admin bấm Reject:
•
•
•
•
•
•
Mở modal.
Bắt buộc nhập lý do.
Validate độ dài.
Gọi API reject.
Cập nhật danh sách và chi tiết.
Hiển thị toast rõ ràng.
Acceptance Criteria
•
•
•
•
•
Seller tạo sản phẩm xong thấy trạng thái Pending.
Sản phẩm chưa approve không xuất hiện ở public list.
Admin có thể approve hoặc reject.
Seller xem được lý do reject.
Sau approve, product xuất hiện theo response API mới.
PHASE 6 — KIỂM TRA TẠO, SỬA VÀ XÓA VOUCHER
CỦA SELLER
Step 6.1 — Rà soát Voucher Form
Kiểm tra các trường:
•
•
•
•
•
Voucher code.
Discount type.
Discount value.
Minimum order.
Maximum discount.
13
•
•
•
•
•
•
•
Start date.
End date.
Usage limit.
Usage per user.
Product scope.
Category scope.
Status.
Kiểm tra mapping giữa:
Tên field của form
→ Request DTO
→ Tên field Backend
Lỗi thường gặp:
•
•
•
•
•
•
discountType gửi sai enum.
Ngày gửi sai timezone.
productIds bị gửi thành chuỗi.
Giá trị số gửi dưới dạng string.
Field optional gửi "" thay vì null .
Seller ID được gửi sai hoặc không cần thiết.
Step 6.2 — Validation Create Voucher
Client-side validation cần phù hợp Backend:
•
•
•
•
•
•
•
•
Code bắt buộc.
Discount value lớn hơn 0.
Percentage không vượt 100.
Start date nhỏ hơn end date.
Minimum order không âm.
Maximum discount không âm.
Usage limit lớn hơn 0.
Có ít nhất một phạm vi áp dụng nếu nghiệp vụ yêu cầu.
Không chỉ dựa vào validation Frontend. Phải hiển thị lỗi trả về từ Backend.
Step 6.3 — Sửa Edit Voucher
Kiểm tra trang:
/seller/vouchers/:voucherId/edit
14
Yêu cầu:
•
•
•
•
•
•
•
•
•
•
Fetch đúng Voucher theo ID.
Chỉ render form sau khi data load.
Reset form đúng một lần sau khi nhận dữ liệu.
Không ghi đè dữ liệu User đang sửa khi query refetch.
Mapping đúng product/category đã chọn.
Không gửi các field chỉ dành cho Admin.
Sau update:
Toast success.
Invalidate list và detail.
Quay về trang danh sách hoặc giữ trang detail.
Step 6.4 — Kiểm tra nút Delete trong Edit Voucher
Nếu có nút xóa trong trang Edit:
•
•
•
•
•
•
•
•
•
•
•
•
Nút Delete phải gọi endpoint Delete.
Không gọi hàm Update với isDeleted .
Có confirmation modal.
Hiển thị rõ Voucher nào sẽ bị xóa.
Disable khi request đang chạy.
Sau xóa:
Toast success.
Invalidate cache.
Điều hướng về danh sách.
Nếu lỗi:
Không điều hướng.
Hiển thị message từ API.
Step 6.5 — Kiểm tra Delete trong Voucher List
Nút Delete tại danh sách phải dùng cùng mutation hoặc cùng service với trang Edit.
Không tạo hai cách xóa khác nhau gây hành vi không nhất quán.
Tạo hook dùng chung:
useDeleteSellerVoucher()
Step 6.6 — Xử lý soft-deleted Voucher
Sau khi xóa:
•
Voucher không còn trong danh sách mặc định.
15
•
•
•
Không hiển thị trong lựa chọn Checkout.
Nếu có tab Deleted, chỉ hiển thị khi User chủ động chọn.
Không giữ Voucher đã xóa trong cache.
Acceptance Criteria
•
•
•
•
•
•
Seller tạo Voucher thành công.
Form Edit load đúng dữ liệu.
Nút Delete trong Edit và List có hành vi giống nhau.
Xóa không làm rỗng toàn bộ danh sách sai.
Lỗi API được hiển thị rõ ràng.
Không gửi field duyệt của Admin từ Seller UI.
PHASE 7 — ADMIN APPROVE VOUCHER
Step 7.1 — Thêm route và menu
Kiểm tra hoặc bổ sung:
/admin/vouchers
/admin/vouchers/pending
/admin/vouchers/:voucherId
Menu Admin cần có mục rõ ràng:
Quản lý Voucher
Step 7.2 — Danh sách Voucher chờ duyệt
Hiển thị:
•
•
•
•
•
•
•
•
•
•
•
Voucher code.
Seller/Shop.
Discount type.
Discount value.
Minimum order.
Maximum discount.
Start date.
End date.
Phạm vi áp dụng.
Ngày tạo.
Trạng thái.
16
•
Actions.
Step 7.3 — Nút Approve
•
•
•
•
•
•
•
•
•
•
•
Có label hoặc tooltip.
Có confirmation.
Hiển thị loading.
Chống click trùng.
Thành công:
Toast success.
Xóa Voucher khỏi danh sách Pending.
Invalidate các query liên quan.
Thất bại:
Giữ nguyên item.
Hiển thị lỗi Backend.
Step 7.4 — Nút Reject
•
•
•
•
Mở modal nhập lý do.
Lý do bắt buộc.
Submit đúng request body.
Sau thành công cập nhật danh sách.
Step 7.5 — Seller Voucher Status
Trang Seller Voucher cần hiển thị:
Pending
Approved
Rejected
Expired
Disabled
Nếu rejected:
•
•
•
Hiển thị lý do.
Có thể cho chỉnh sửa.
Sau chỉnh sửa có thể trở lại Pending theo response API.
Acceptance Criteria
•
•
•
•
•
Admin xem được Voucher Pending.
Admin approve/reject thành công.
Seller thấy trạng thái mới.
Voucher chưa approve không xuất hiện trong Checkout.
Nút không bị click nhiều lần.
17
PHASE 8 — XÓA VOUCHER KHỎI THANH TOÁN
Step 8.1 — Xác định state Voucher hiện tại
Kiểm tra Voucher được lưu trong:
•
•
•
•
•
•
Local component state.
Cart context.
Redux/Zustand store.
React Query cache.
Local storage.
Checkout session từ Backend.
Phải có một nguồn dữ liệu chính, tránh tình trạng:
UI đã xóa Voucher
nhưng request Checkout vẫn còn voucherId
Step 8.2 — Thêm nút Xóa Voucher
Tại phần Voucher đã áp dụng:
•
•
•
•
•
Hiển thị code.
Hiển thị số tiền giảm.
Có nút:
“Xóa Voucher”
Hoặc icon X có tooltip rõ ràng.
Không dùng icon không có mô tả.
Step 8.3 — Xử lý remove
Nếu Backend lưu Voucher trong Cart:
await cartService.removeVoucher();
Nếu Voucher chỉ nằm ở Frontend:
setAppliedVoucher(null);
setVoucherCode("");
18
Sau đó:
•
•
•
•
•
•
•
Gọi lại API tính tổng nếu có.
Hoặc lấy response mới từ remove API.
Cập nhật:
Discount.
Shipping.
Fee.
Final total.
Step 8.4 — Request Checkout
Đảm bảo khi Voucher đã xóa:
voucherId: null
hoặc không gửi field Voucher.
Không giữ giá trị Voucher trong:
•
•
•
•
Hidden input.
Form default values.
Local storage.
Cached checkout payload.
Step 8.5 — Refresh và điều hướng
Kiểm tra:
•
•
•
•
Refresh trang có Voucher xuất hiện lại ngoài ý muốn không.
Quay lại từ trang thanh toán có giữ Voucher sai không.
Cart Store có reset đúng không.
Sau Order success có xóa applied Voucher khỏi state không.
Acceptance Criteria
•
•
•
•
•
User xóa được Voucher đã áp dụng.
Tổng tiền cập nhật ngay.
Request Checkout không còn Voucher.
Refresh không làm Voucher cũ xuất hiện lại sai.
Không tạo Order với discount đã bị xóa.
19
PHASE 9 — ĐÁNH GIÁ SẢN PHẨM TRONG ORDER
LIST
Step 9.1 — Bổ sung type Order Item
Order Item cần nhận:
type OrderItem = {
orderItemId: string;
productId: string;
productName: string;
productImageUrl?: string;
canReview: boolean;
hasReviewed: boolean;
reviewId?: string | null;
};
Step 9.2 — Hiển thị nút Đánh giá
Trong Buyer Order List hoặc Order Detail:
canReview = true
AND hasReviewed = false
thì hiển thị:
Đánh giá
Nếu đã đánh giá:
Đã đánh giá
Có thể bổ sung nút xem đánh giá nếu API hỗ trợ.
Step 9.3 — Review Modal
Review modal cần:
Tên sản phẩm. •
20
•
•
•
•
•
•
•
•
Ảnh sản phẩm.
Rating.
Comment.
Upload ảnh nếu Backend hỗ trợ.
Validation.
Submit loading.
Error message.
Success toast.
Step 9.4 — Cập nhật sau khi đánh giá
Sau success:
•
•
•
•
•
•
•
•
Đóng modal.
Cập nhật hasReviewed = true .
Cập nhật reviewId .
Invalidate:
Buyer orders.
Product reviews.
Product detail.
Không cần reload toàn trang.
Step 9.5 — Xử lý lỗi nghiệp vụ
Nếu API trả lỗi:
•
•
•
•
Order chưa giao.
Đã đánh giá.
Order không thuộc User.
Product không tồn tại.
Phải hiển thị message rõ ràng, không chỉ báo “Something went wrong”.
Acceptance Criteria
•
•
•
•
•
Order đủ điều kiện có nút Đánh giá.
Order chưa giao không có nút.
Không review trùng.
Sau submit, UI chuyển sang Đã đánh giá.
Rating và comment được validate.
21
PHASE 10 — THÊM ĐƯỜNG DẪN XEM SẢN PHẨM
ĐÃ MUA
Step 10.1 — Xác định route Product Detail
Ví dụ:
/products/:productId
hoặc:
/product/:slug
Dùng trường API thực tế:
•
•
productId.
productSlug.
Step 10.2 — Gắn link vào Order
Các vị trí nên có link:
•
•
•
Ảnh sản phẩm.
Tên sản phẩm.
Nút “Xem sản phẩm”.
Ví dụ:
<Link to={`/products/${item.productId}`}>
{item.productName}
</Link>
Step 10.3 — Product không còn khả dụng
Nếu Backend trả:
isProductAvailable = false
22
thì:
•
•
•
•
Không điều hướng đến route lỗi.
Hiển thị text:
“Sản phẩm không còn khả dụng.”
Có thể disable link.
Nếu không có trường này, xử lý lỗi 404 ở Product Detail bằng giao diện phù hợp.
Step 10.4 — Không gắn link sai
Không dùng:
•
•
•
•
Order Item ID thay cho Product ID.
Seller Product route cho Buyer.
Slug rỗng.
URL được nối từ tên sản phẩm chưa encode.
Acceptance Criteria
•
•
•
•
Buyer bấm tên hoặc ảnh để xem Product Detail.
Link dùng đúng Product ID hoặc Slug.
Product bị xóa không dẫn đến trang trắng.
Không ảnh hưởng nút Review hoặc Order Detail.
PHASE 11 — HIỂN THỊ HÌNH ẢNH Ở TẤT CẢ CÁC
LOẠI ORDER
Step 11.1 — Rà soát các màn Order
Kiểm tra toàn bộ:
Buyer Order List
Buyer Order Detail
Seller Order List
Seller Order Detail
Admin Order List
Admin Order Detail
Cancelled Orders
Completed Orders
Shipping Orders
23
Return Orders
Refund Orders
Step 11.2 — Tạo component dùng chung
Tạo hoặc tái sử dụng:
<OrderProductImage
src={item.productImageUrl}
alt={item.productName}
/>
Component cần:
•
•
•
•
•
•
Kích thước thống nhất.
object-fit: cover.
Border radius.
Placeholder.
Xử lý ảnh lỗi.
alt phù hợp.
Step 11.3 — Fallback ảnh
Thứ tự:
item.productImageUrl
→ item.imageUrl
→ item.thumbnailUrl
→ placeholder
Nên chuẩn hóa mapping tại API adapter thay vì mỗi component tự kiểm tra nhiều field khác nhau.
Ví dụ:
const mapOrderItem = (item: OrderItemApi): OrderItemViewModel => ({
...item,
productImageUrl:
item.productImageUrl ??
item.imageUrl ??
item.thumbnailUrl ??
DEFAULT_PRODUCT_IMAGE,
});
24
Step 11.4 — Không dùng index làm key
Dùng:
key={item.orderItemId}
Không dùng:
key={index}
để tránh hiển thị nhầm ảnh khi danh sách cập nhật.
Step 11.5 — Kiểm tra URL ảnh
Nếu Backend trả relative path:
/uploads/products/image.jpg
thì chuẩn hóa:
buildAssetUrl(path)
Không nối URL thủ công ở nhiều nơi.
Acceptance Criteria
•
•
•
•
•
Mọi Order đều hiển thị ảnh.
Ảnh lỗi có placeholder.
Không bị méo ảnh.
Không có component Order nào còn dùng field ảnh cũ sai.
Return/Refund Order cũng có ảnh.
PHASE 12 — HIỂN THỊ TÊN SẢN PHẨM TRONG
ADMIN ORDERS
Step 12.1 — Kiểm tra response mapping
Admin Order List cần đọc đúng:
25
items[].productName
Không chỉ hiển thị:
•
Order ID.
•
Seller ID.
•
•
Product ID.
Số lượng.
Step 12.2 — Cách hiển thị nhiều sản phẩm
Nếu Order có nhiều item, lựa chọn một trong các cách:
Cách 1
Tên sản phẩm đầu tiên
+2 sản phẩm khác
Cách 2
Hiển thị tối đa 2 sản phẩm, phần còn lại hiện:
Xem thêm
Cách 3
Dùng danh sách nhỏ trong cell.
Không làm bảng quá rộng hoặc vỡ responsive.
Step 12.3 — Admin Order Detail
Hiển thị đầy đủ:
•
•
•
•
•
•
•
Ảnh.
Tên sản phẩm.
Product ID.
Số lượng.
Giá.
Seller.
Tổng tiền.
26
Step 12.4 — Xử lý item thiếu dữ liệu
Nếu API thiếu tên:
Sản phẩm không xác định
nhưng đồng thời log warning ở development để phát hiện mapping sai.
Acceptance Criteria
•
•
•
•
Admin Order List có tên sản phẩm.
Admin Order Detail có đầy đủ tên và ảnh.
Order nhiều sản phẩm vẫn hiển thị gọn.
Không chỉ hiển thị ID.
PHASE 13 — FINANCE ADMIN CHƯA HIỂN THỊ PHÍ
Step 13.1 — Kiểm tra API response
Xác định các field Backend trả:
platformFee
paymentFee
transactionFee
shippingFee
refundAmount
grossAmount
sellerNetAmount
platformRevenue
Cập nhật:
•
•
•
•
TypeScript interface.
API adapter.
Finance store/hook.
Component hiển thị.
27
Step 13.2 — Thêm các card tổng quan
Có thể hiển thị:
•
•
•
•
•
•
•
Tổng doanh thu.
Phí nền tảng.
Phí giao dịch.
Phí thanh toán.
Tổng hoàn tiền.
Doanh thu ròng của Seller.
Doanh thu nền tảng.
Chỉ hiển thị các loại phí Backend thật sự cung cấp.
Step 13.3 — Bảng chi tiết
Trong từng transaction/order:
•
•
•
•
•
•
Gross amount.
Platform fee.
Payment fee.
Shipping fee.
Refund.
Net amount.
Step 13.4 — Format tiền
Tạo utility dùng chung:
formatCurrency(amount, "VND")
Xử lý:
•
•
•
•
•
null .
undefined .
NaN .
Số âm.
Số 0.
Không dùng:
amount.toLocaleString()
trực tiếp khi amount có thể undefined.
28
Step 13.5 — Không tự tính phí nếu API đã trả
Frontend chỉ format và hiển thị.
Không tự suy ra:
platformFee = total × percentage
vì phí lịch sử có thể khác cấu hình hiện tại.
Acceptance Criteria
•
•
•
•
•
Finance Admin hiển thị các loại phí.
Không còn ô trống do thiếu mapping.
Format VND đúng.
Filter ngày vẫn giữ đúng tổng phí.
Loading, error và empty state rõ ràng.
PHASE 14 — SỬA GIAO DIỆN WITHDRAWAL
REQUEST BỊ MÀU TRẮNG
Step 14.1 — Xác định khu vực lỗi
Kiểm tra:
•
•
•
•
•
•
•
•
•
•
Text trong table.
Table row.
Card background.
Dropdown.
Modal.
Input.
Badge.
Dark mode.
Hover.
Selected row.
Step 14.2 — Loại bỏ hard-coded color
Tìm:
29
color: white;
hoặc:
className="text-white"
ở khu vực nền sáng.
Thay bằng token/theme hiện tại:
text-foreground
text-primary
text-secondary
bg-card
bg-background
border-border
Step 14.3 — Đồng bộ bảng với Admin
Tái sử dụng component Admin nếu có:
<DataTable />
<StatusBadge />
<PageHeader />
<FilterBar />
Không tạo bảng mới có style khác nếu Admin đã có bảng chuẩn.
Step 14.4 — Trạng thái Withdrawal
Badge cần rõ ràng:
Pending
Approved
Rejected
Processing
Completed
30
Mỗi badge có:
•
•
•
•
Text.
Background.
Border.
Mức tương phản đủ đọc.
Step 14.5 — Kiểm tra light/dark theme
Nếu ứng dụng hỗ trợ dark mode:
•
•
•
Không fix màu chỉ cho light mode.
Dùng CSS variables hoặc theme tokens.
Kiểm tra cả modal và dropdown portal.
Acceptance Criteria
•
•
•
•
•
Không còn chữ trắng trên nền trắng.
Table đọc được ở mọi trạng thái.
Hover không làm mất chữ.
Modal và dropdown đồng bộ theme.
Không thay đổi layout hiện có.
PHASE 15 — CHỈNH SỬA SELLER PROFILE
Step 15.1 — Rà soát Seller Profile Page
Kiểm tra:
•
•
•
•
•
•
•
•
API GET profile.
API update profile.
Form default values.
Upload avatar/logo/banner.
Loading state.
Error state.
Save button.
Cache sau update.
Step 15.2 — Form initialization
Không render form với dữ liệu rỗng rồi ghi đè dữ liệu User.
Nếu dùng React Hook Form:
31
useEffect(() => {
if (profile) {
reset(mapProfileToForm(profile));
}
}, [profile, reset]);
Chỉ reset khi profile thay đổi có chủ đích.
Step 15.3 — Không mất dữ liệu optional
Khi submit:
•
•
•
•
Không gửi chuỗi rỗng để ghi đè field cũ nếu không cần.
Chuyển "" thành null theo contract Backend.
Không gửi Seller ID nếu Backend lấy từ token.
Không gửi approval status.
Step 15.4 — Upload ảnh
Yêu cầu:
•
•
•
•
•
•
Preview trước khi lưu.
Validate loại file.
Validate dung lượng.
Hiển thị upload progress nếu có.
Giữ ảnh cũ khi upload lỗi.
Có nút xóa hoặc đổi ảnh nếu Backend hỗ trợ.
Step 15.5 — Cập nhật dữ liệu toàn hệ thống
Sau update:
•
•
•
•
Invalidate seller profile query.
Cập nhật header/avatar.
Cập nhật Seller Dashboard.
Không yêu cầu logout/login lại.
Step 15.6 — Toast
•
•
•
•
Loading khi lưu.
Success khi cập nhật.
Error theo Backend.
Không reset form khi lỗi.
32
Acceptance Criteria
•
•
•
•
•
Profile load đúng.
Seller cập nhật thành công.
Dữ liệu không bị mất ngoài ý muốn.
Avatar/logo cập nhật ngay.
Refresh vẫn giữ dữ liệu.
PHASE 16 — RÀ SOÁT CÁC NÚT BẤM KHÔNG CÓ MÔ
TẢ HOẶC KHÔNG CÓ CHỨC NĂNG
Step 16.1 — Quét toàn bộ button
Tìm:
<button>
<Button>
<IconButton>
onClick
href
navigate
Link
DropdownMenuItem
Kiểm tra trong:
•
•
•
•
•
•
•
•
Buyer.
Seller.
Admin.
Modal.
Table action.
Card action.
Header.
Sidebar.
Step 16.2 — Phân loại
Nhóm A — Có chức năng và rõ ràng
Giữ nguyên.
33
Nhóm B — Có chức năng nhưng chỉ có icon
Thêm:
•
•
•
aria-label .
Tooltip.
title nếu chưa có tooltip component.
Ví dụ:
<Tooltip content="Xóa Voucher">
<IconButton aria-label="Xóa Voucher">
<TrashIcon />
</IconButton>
</Tooltip>
Nhóm C — Có nút nhưng không có handler
Nếu chức năng cần thiết:
•
•
•
Hoàn thiện handler.
Gọi API đúng.
Thêm loading và error.
Nếu không có yêu cầu nghiệp vụ:
•
Xóa nút.
Nhóm D — Handler rỗng hoặc placeholder
Tìm:
onClick={() => {}}
onClick={() => console.log(...)}
alert("Coming soon")
Xóa hoặc triển khai đầy đủ.
Nhóm E — Route không tồn tại
•
•
•
Sửa route.
Hoặc xóa nút.
Không để User bấm vào 404.
34
Step 16.3 — Nút bị disable
Nút disable cần lý do rõ ràng.
Ví dụ:
Voucher đang chờ duyệt nên chưa thể chỉnh sửa.
Không disable im lặng nếu User không hiểu lý do.
Step 16.4 — Kiểm tra accessibility
Mỗi button cần:
•
•
•
•
•
Tên có thể đọc bởi screen reader.
Trạng thái loading.
Disabled đúng.
Focus state.
Keyboard interaction.
Acceptance Criteria
•
•
•
•
•
Không còn nút chết.
Icon button đều có mô tả.
Không có route 404 do button cũ.
Nút loading không click lặp.
Nút disable có giải thích khi cần.
PHASE 17 — THÊM LOGOUT CHO ADMIN
DASHBOARD
Step 17.1 — Xác định Auth flow
Kiểm tra:
•
•
•
•
•
•
Access token lưu ở đâu.
Refresh token lưu ở đâu.
Auth context/store.
API logout.
User info cache.
Protected route.
35
Step 17.2 — Vị trí nút Logout
Thêm tại một hoặc cả hai:
•
•
Nút phải có:
Avatar dropdown trong Admin Header.
Cuối Admin Sidebar.
•
•
•
Icon.
Label “Đăng xuất”.
Không chỉ có icon không tooltip.
Step 17.3 — Logout handler
Luồng:
User click Logout
→ confirmation nếu hệ thống hiện tại có
→ gọi API revoke token nếu có
→ xóa token
→ xóa auth state
→ xóa cache nhạy cảm
→ redirect về login
Ví dụ:
const handleLogout = async () => {
try {
await authService.logout();
} catch {
// Vẫn tiếp tục local logout nếu API revoke thất bại.
} finally {
authStore.clear();
queryClient.clear();
navigate("/login", { replace: true });
}
};
Step 17.4 — Chặn quay lại bằng Back
•
•
•
Dùng replace: true.
Protected route phải kiểm tra auth state.
Cache Admin data cần được clear.
36
•
Không hiển thị dashboard cũ từ memory cache.
Step 17.5 — Loading state
•
•
•
Disable nút khi đang logout.
Không click nhiều lần.
Có thể hiển thị spinner nhỏ.
Acceptance Criteria
•
•
•
•
•
Admin thấy nút Đăng xuất.
Click logout xóa phiên đăng nhập.
Redirect về login.
Không quay lại Admin Dashboard bằng Back nếu chưa đăng nhập.
Không còn dữ liệu Admin trong cache.
PHASE 18 — CHUẨN HÓA API SERVICES VÀ TYPES
Step 18.1 — API service riêng theo module
Cấu trúc đề xuất:
services/
├── sellerRegistrationService.ts
├── sellerProductService.ts
├── sellerVoucherService.ts
├── adminProductService.ts
├── adminVoucherService.ts
├── orderService.ts
├── reviewService.ts
├── financeService.ts
├── withdrawalService.ts
└── authService.ts
Step 18.2 — Không gọi Axios trực tiếp trong component
Không nên:
axios.delete(...)
trong từng page.
37
Nên:
sellerVoucherService.deleteVoucher(voucherId)
Step 18.3 — Chuẩn hóa error helper
Tạo utility:
getApiErrorMessage(error)
Thứ tự lấy message:
response.data.message
response.data.errors[0].message
error.message
fallback message
Không hiển thị:
[object Object]
Step 18.4 — Chuẩn hóa pagination type
type PaginatedResponse<T> = {
items: T[];
page: number;
pageSize: number;
totalItems: number;
totalPages: number;
};
Step 18.5 — Adapter layer
Nếu Backend response chưa nhất quán, tạo mapper tại service:
mapOrderResponse
mapProductResponse
mapVoucherResponse
38
Không để mỗi page tự suy đoán tên field.
PHASE 19 — LOADING, ERROR VÀ EMPTY STATES
Mỗi trang phải phân biệt rõ:
Loading
Error
No data
No search results
No data on current page
Success
Loading
•
•
Skeleton hoặc spinner.
Không hiển thị Empty khi đang loading.
Error
•
•
•
Empty
Message rõ ràng.
Có nút Retry khi hợp lý.
Không giữ loading vô hạn.
Ví dụ Seller Product:
Bạn chưa có sản phẩm nào.
No Search Results
Không tìm thấy sản phẩm phù hợp với bộ lọc.
Không dùng cùng một Empty State cho mọi trường hợp.
39
PHASE 20 — TEST FRONTEND
Step 20.1 — Unit Test
Test:
•
•
•
•
•
•
•
API error helper.
Currency formatter.
Order item mapper.
Product image fallback.
Voucher validation.
Product quantity validation.
Status badge mapping.
Step 20.2 — Component Test
Test:
•
•
•
•
•
•
•
•
•
•
Seller Registration Form.
Delete Product Modal.
Product Quantity Input.
Voucher Form.
Delete Voucher Button.
Remove Voucher Button.
Review Modal.
Product Link trong Order.
Admin Approve/Reject buttons.
Logout button.
Step 20.3 — Integration Test
Seller Registration
Submit
→ loading
→ success toast
→ redirect
Submit
→ API error
→ error toast
→ form giữ nguyên
40
Product Delete
Danh sách có 3 sản phẩm
→ xóa 1
→ còn 2
→ không hiển thị Empty
Product Approval
Seller tạo
→ thấy Pending
→ Admin Approve
→ Product chuyển Approved
Voucher
Create
Edit
Delete từ List
Delete từ Edit
Admin Approve
Checkout
Áp Voucher
→ có discount
→ remove Voucher
→ discount = 0
→ checkout payload không còn voucherId
Order
Tất cả loại Order có ảnh
Admin Order có tên sản phẩm
Buyer có link xem Product
Order completed có nút Review
Admin Logout
Admin logout
→ token bị xóa
41
→ redirect login
→ back không mở lại Dashboard
Step 20.4 — Responsive Test
Kiểm tra:
•
•
•
Desktop.
Tablet.
Mobile.
Đặc biệt:
•
•
•
•
•
•
Admin Order table.
Voucher table.
Finance cards.
Withdrawal table.
Review modal.
Product form.
PHASE 21 — THỨ TỰ ƯU TIÊN TRIỂN KHAI
Priority 1 — Lỗi ảnh hưởng trực tiếp User
1.
2.
3.
4.
5.
6.
Sửa toast đăng ký Seller.
Sửa xóa một Product nhưng hiển thị Empty.
Kiểm tra Create/Edit/Delete Voucher Seller.
Thêm Stock Quantity vào Product Form.
Thêm Remove Voucher khỏi Checkout.
Thêm Logout Admin.
Priority 2 — Luồng phê duyệt
1.
2.
3.
Product Pending → Admin Approve/Reject.
Voucher Pending → Admin Approve/Reject.
Hiển thị status và rejection reason cho Seller.
Priority 3 — Order và Review
1.
2.
3.
4.
Hiển thị ảnh ở tất cả Order.
Hiển thị tên Product trong Admin Order.
Thêm link Product trong Buyer Order.
Thêm Review trong Order List.
42
Priority 4 — Finance và Profile
1.
2.
3.
Hiển thị phí Finance Admin.
Sửa Seller Profile.
Sửa màu Withdrawal Request.
Priority 5 — Dọn dẹp UI
1.
2.
3.
4.
Rà soát button không chức năng.
Thêm tooltip và aria-label.
Chuẩn hóa loading/error/empty.
Refactor API service và types.
PHASE 22 — PHÂN CHIA COMMIT
fix(seller): resolve registration toast lifecycle
fix(product): preserve product list after delete
feat(product): add stock quantity field
feat(product): support pending approval status
feat(admin): add product approval actions
fix(voucher): repair seller create and edit flows
fix(voucher): unify delete behavior across list and edit
feat(admin): add voucher approval actions
feat(checkout): allow removing applied voucher
feat(order): display product images across order views
feat(order): show product names in admin orders
feat(order): add product detail links
feat(review): add product review action to order list
feat(finance): display admin fee breakdown
fix(withdrawal): correct unreadable list colors
feat(seller): improve seller profile editing
feat(admin): add dashboard logout
chore(ui): remove inactive buttons and add tooltips
refactor(api): normalize frontend service and response types
test(frontend): cover seller product voucher and order flows
Không gom toàn bộ thay đổi vào một commit lớn.
43
PHASE 23 — CHECKLIST HOÀN THÀNH
Seller Registration
•
•
•
•
•
[ ] Loading toast được đóng.
[ ] Có success toast.
[ ] Có error toast.
[ ] Không submit trùng.
[ ] Hiển thị trạng thái Pending.
Product
•
•
•
•
•
•
•
[ ] Xóa một Product không làm rỗng danh sách.
[ ] Pagination đúng sau delete.
[ ] Form có Stock Quantity.
[ ] Edit Product có Stock Quantity.
[ ] Product mới hiển thị Pending.
[ ] Admin approve/reject được.
[ ] Seller xem được rejection reason.
Voucher
•
•
•
•
•
•
•
•
[ ] Create Voucher hoạt động.
[ ] Edit Voucher load đúng dữ liệu.
[ ] Delete trong List hoạt động.
[ ] Delete trong Edit hoạt động.
[ ] Hai nơi dùng chung mutation.
[ ] Admin approve/reject được.
[ ] Seller thấy trạng thái Voucher.
[ ] Voucher chưa approve không xuất hiện ở Checkout.
Checkout
•
•
•
•
•
[ ] Có nút Xóa Voucher.
[ ] Tổng tiền được cập nhật.
[ ] Discount về 0.
[ ] Payload không còn voucherId.
[ ] Voucher cũ không xuất hiện lại sau refresh sai.
Orders
•
•
•
•
•
[ ] Buyer Order có ảnh.
[ ] Seller Order có ảnh.
[ ] Admin Order có ảnh.
[ ] Return/Refund Order có ảnh.
[ ] Admin Order có tên sản phẩm.
44
•
•
•
Finance
•
•
•
•
•
Withdrawal
•
•
•
•
[ ] Buyer Order có link xem Product.
[ ] Có nút Review đúng điều kiện.
[ ] Review success cập nhật ngay UI.
[ ] Hiển thị Platform Fee.
[ ] Hiển thị Payment/Transaction Fee nếu có.
[ ] Hiển thị Gross và Net.
[ ] Format tiền đúng.
[ ] Không tự tính phí sai ở Frontend.
[ ] Không còn chữ trắng trên nền trắng.
[ ] Badge trạng thái dễ đọc.
[ ] Hover và selected state đúng.
[ ] Light/dark mode đúng nếu có.
Seller Profile
•
•
•
•
•
[ ] Load đúng profile.
[ ] Update thành công.
[ ] Không mất dữ liệu optional.
[ ] Avatar/logo cập nhật ngay.
[ ] Có loading và error state.
Admin
•
•
•
•
•
[ ] Có nút Logout.
[ ] Token và cache bị xóa.
[ ] Redirect về login.
[ ] Back không mở lại Dashboard.
[ ] Các button Admin có label hoặc tooltip.
UI Cleanup
•
•
•
•
•
[ ] Không còn button không handler.
[ ] Không còn console.log placeholder.
[ ] Không còn route 404 từ button.
[ ] Icon button có aria-label.
[ ] Loading, error và empty state được phân biệt.
45
DEFINITION OF DONE
Một hạng mục Frontend chỉ được xem là hoàn thành khi:
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
UI gọi đúng endpoint.
Request payload đúng contract.
Response được map đúng type.
Có loading state.
Có success state.
Có error state.
Không có toast loading bị treo.
Cache được invalidate đúng.
Refresh trang không làm sai dữ liệu.
Không có lỗi console.
Không có unhandled promise rejection.
Không có nút chết.
Không có route lỗi.
Giao diện hoạt động trên desktop và mobile.
Có kiểm thử cho luồng thành công và thất bại.
Không làm hỏng các chức năng đang hoạt động.