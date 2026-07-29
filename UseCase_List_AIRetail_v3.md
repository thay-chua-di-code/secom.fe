**DANH SÁCH USE CASES — AIRetail (SE_11)**

| **ID**                                    | **Use Case Name**                   | **Actor(s)**           | **Trạng thái** | **Ghi chú**                                                                             |
|-------------------------------------------|-------------------------------------|------------------------|----------------|-----------------------------------------------------------------------------------------|
| **FE-01: Authentication & Authorization** |                                     |                        |                |                                                                                         |
| **UC-01**                                 | Register Account                    | Guest                  | **✅ Giữ lại** | UC cũ — Authentication_SECOM diagram                                                    |
| **UC-02**                                 | Login With Email / Password         | Guest                  | **✅ Giữ lại** | UC cũ — Authentication_SECOM diagram                                                    |
| **UC-03**                                 | Login With Google                   | Guest                  | **✅ Giữ lại** | UC cũ — Authentication_SECOM diagram                                                    |
| **UC-04**                                 | Logout                              | Buyer / Seller / Admin | **✅ Giữ lại** | UC cũ — Authentication_SECOM diagram                                                    |
| **UC-05**                                 | Forget Password                     | Guest                  | **✅ Giữ lại** | UC cũ — Authentication_SECOM diagram                                                    |
| **UC-06**                                 | Change Password                     | Buyer / Seller         | **✅ Giữ lại** | UC cũ — Authentication_SECOM diagram                                                    |
| **UC-07**                                 | View Profile                        | Buyer / Seller         | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-08**                                 | Update Profile                      | Buyer / Seller         | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Profile                                                  |
| **FE-02: Product Management**             |                                     |                        |                |                                                                                         |
| **UC-09**                                 | View Product List                   | Guest / Buyer          | **✅ Giữ lại** | UC cũ — Guest_SECOM & Buyer_SECOM diagram                                               |
| **UC-10**                                 | View Product Details                | Guest / Buyer          | **✅ Giữ lại** | UC cũ — Guest_SECOM diagram                                                             |
| **UC-11**                                 | View Product Categories             | Guest / Buyer          | **✏️ Đổi tên** | UC cũ — đổi từ 'View Categories' cho rõ nghĩa hơn                                       |
| **UC-12**                                 | Create Product                      | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-13**                                 | Upload Image Product                | Seller                 | **✅ Giữ lại** | UC cũ — \<\<Include\>\> khi Create Product                                              |
| **UC-14**                                 | Update Product                      | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-15**                                 | Delete Product                      | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-16**                                 | View My Products                    | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-17**                                 | Manage Product Inventory            | Seller                 | **🆕 Mới**     | Theo FE-02 report 'Inventory management' — chưa có trong diagram cũ, cần vẽ thêm        |
| **UC-18**                                 | View Product List (Admin)           | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-19**                                 | Approve Product                     | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Product List (Admin)                                     |
| **UC-20**                                 | Reject Product                      | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Product List (Admin)                                     |
| **UC-21**                                 | View Moderation History             | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-22**                                 | Create Category                     | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-23**                                 | Update Category                     | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-24**                                 | Delete Category                     | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-25**                                 | Activate / Disable Category         | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram (Active category + Disable category gộp lại)                |
| **FE-03: Product Search & Comparison**    |                                     |                        |                |                                                                                         |
| **UC-26**                                 | Search Products                     | Guest / Buyer          | **✅ Giữ lại** | UC cũ — Guest_SECOM diagram                                                             |
| **UC-27**                                 | Filter & Sort Products              | Guest / Buyer          | **✏️ Đổi tên** | UC cũ — gộp filter/sort, đổi tên cho rõ nghĩa hơn                                       |
| **UC-28**                                 | Compare Products                    | Buyer                  | **🆕 Mới**     | Theo FE-03 report 'Product comparison' — chưa có trong diagram cũ, cần vẽ thêm          |
| **FE-04: Shopping & Order Management**    |                                     |                        |                |                                                                                         |
| **UC-29**                                 | View Cart                           | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-30**                                 | Add Product to Cart                 | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-31**                                 | Remove Product from Cart            | Buyer                  | **✏️ Đổi tên** | UC cũ — đổi từ 'Delete Product to Cart' cho đúng nghĩa                                  |
| **UC-32**                                 | View Voucher                        | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-33**                                 | Apply Voucher                       | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-34**                                 | Create Order                        | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-35**                                 | Make Payment                        | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-36**                                 | View Wishlist                       | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram. Gộp vào FE-04 thay vì tách module riêng                    |
| **UC-37**                                 | Add Product to Wishlist             | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-38**                                 | Delete Product from Wishlist        | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-39**                                 | View Purchased Orders               | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-40**                                 | View Order Details                  | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-41**                                 | Cancel Order                        | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-42**                                 | Confirm Received                    | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-43**                                 | Request Return / Refund             | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram, xử lý manual theo LI-01                                    |
| **UC-44**                                 | View Notifications                  | Buyer / Seller         | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram. Gộp vào FE-04 vì chủ yếu là thông báo đơn hàng             |
| **UC-45**                                 | Delete Notification                 | Buyer / Seller         | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-46**                                 | View Order List                     | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-47**                                 | Update Order Status                 | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-48**                                 | View Return Requests                | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-49**                                 | View Return Request Details         | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-50**                                 | Approve Return Request              | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Return Requests                                          |
| **UC-51**                                 | Reject Return Request               | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Return Requests                                          |
| **UC-52**                                 | Update Return Request Status        | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **FE-05: AI Recommendation System**       |                                     |                        |                |                                                                                         |
| **UC-53**                                 | View Recommended Products           | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-54**                                 | View Similar Products               | Buyer                  | **🆕 Mới**     | Theo FE-05 report 'Similar product suggestions' — chưa có trong diagram cũ, cần vẽ thêm |
| **UC-55**                                 | Generate AI Price Recommendation    | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram, phù hợp đề tài AIRetail                                   |
| **FE-06: AI Chatbot & Messaging**         |                                     |                        |                |                                                                                         |
| **UC-56**                                 | Use AI Shopping Assistant (Chatbot) | Buyer                  | **✏️ Đổi tên** | UC cũ — đổi từ 'Use AI Shopping Assistant' để đồng bộ tên với FE-06 report              |
| **UC-57**                                 | View Chat List                      | Buyer / Seller         | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram. Gộp vào FE-06 (Communication module)                       |
| **UC-58**                                 | Send Message                        | Buyer / Seller         | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **FE-07: Review, Rating & Social**        |                                     |                        |                |                                                                                         |
| **UC-59**                                 | View Product Reviews                | Guest / Buyer          | **✏️ Đổi tên** | UC cũ — đổi từ 'View Feedback Product'                                                  |
| **UC-60**                                 | Add Product Review                  | Buyer                  | **✏️ Đổi tên** | UC cũ — đổi từ 'Add Feedback Product'                                                   |
| **UC-61**                                 | Update Product Review               | Buyer                  | **✏️ Đổi tên** | UC cũ — đổi từ 'Update Feedback Product'                                                |
| **UC-62**                                 | Delete Product Review               | Buyer                  | **✏️ Đổi tên** | UC cũ — đổi từ 'Delete Feedback Product'                                                |
| **UC-63**                                 | Rate Seller                         | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-64**                                 | View Seller Rating                  | Guest / Buyer          | **✅ Giữ lại** | UC cũ — Guest_SECOM diagram                                                             |
| **UC-65**                                 | Follow Seller                       | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram. Gộp vào FE-07 (Social/Rating)                              |
| **UC-66**                                 | Unfollow Seller                     | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-67**                                 | View List Follow                    | Buyer                  | **✅ Giữ lại** | UC cũ — Buyer_SECOM diagram                                                             |
| **UC-68**                                 | AI Sentiment Analysis on Reviews    | System                 | **🆕 Mới**     | Theo FE-07 report 'AI-based sentiment analysis' — System UC, chưa có trong diagram cũ   |
| **FE-08: Analytics & Reporting**          |                                     |                        |                |                                                                                         |
| **UC-69**                                 | View Seller Dashboard               | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-70**                                 | View Sales Reports                  | Seller                 | **✏️ Đổi tên** | UC cũ — đổi từ 'View list report' cho rõ nghĩa hơn                                      |
| **UC-71**                                 | View Customer Insights              | Admin                  | **🆕 Mới**     | Theo FE-08 report 'Customer insights' — chưa có trong diagram cũ, cần vẽ thêm           |
| **FE-09: Administration**                 |                                     |                        |                |                                                                                         |
| **UC-72**                                 | View Account List                   | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-73**                                 | Lock User Account                   | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Account List                                             |
| **UC-74**                                 | Unlock User Account                 | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Account List                                             |
| **UC-75**                                 | View Seller Registration Requests   | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin 'View List Register Account Seller'                                 |
| **UC-76**                                 | Approve Seller Registration         | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Seller Registration Requests                             |
| **UC-77**                                 | Reject Seller Registration          | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Seller Registration Requests                             |
| **UC-78**                                 | Create Voucher in System            | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-79**                                 | Update Voucher in System            | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-80**                                 | Delete Voucher in System            | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram                                                             |
| **UC-81**                                 | Activate / Disable Voucher          | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin diagram (Active + Disable Voucher gộp lại)                          |
| **UC-82**                                 | View Payout Requests                | Admin                  | **✅ Giữ lại** | UC cũ — SECOM_Admin 'View List Payout'                                                  |
| **UC-83**                                 | Approve Payout                      | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Payout Requests                                          |
| **UC-84**                                 | Reject Payout                       | Admin                  | **✅ Giữ lại** | UC cũ — \<\<extend\>\> từ View Payout Requests                                          |
| **UC-85**                                 | View Wallet                         | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram. Gộp vào FE-09 vì liên quan payout Admin                   |
| **UC-86**                                 | Create Withdrawal Request           | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller 'Create a withdrawal request'                                      |
| **UC-87**                                 | Create Voucher for My Shop          | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller 'Create Vouchers my Shop'. Gộp vào FE-09 (Voucher management)      |
| **UC-88**                                 | Update Voucher for My Shop          | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |
| **UC-89**                                 | Delete Voucher for My Shop          | Seller                 | **✅ Giữ lại** | UC cũ — SECOM_Seller diagram                                                            |

**Ghi chú:**

• FE-01 → FE-09: Theo đúng cấu trúc 6.2 Report 1. Các FE được mở rộng
scope (FE-04, FE-06, FE-07, FE-09) cần cập nhật mô tả trong report cho
khớp.

• UC ✏️ Đổi tên: cập nhật lại tên trong diagram mới, logic không thay
đổi.

• UC 🆕 Mới: chưa có trong diagram cũ — cần vẽ thêm vào diagram của
actor tương ứng.

• UC-68 'AI Sentiment Analysis on Reviews': System Use Case — hệ thống
tự chạy, không phải user thao tác trực tiếp.

• Flow rút tiền đầy đủ 2 chiều: Seller (UC-86 Create Withdrawal Request)
→ Admin (UC-82 View Payout Requests → UC-83 Approve / UC-84 Reject
Payout).

Chuyeenr tieenf vao admin. Buyer sẽ có nút xác nhận đã nhận hang, hoặc
huỷ hàng. -\> khi nhấn nút tiền chuyển qua cho seller,

Them một crons job (bat) để bắt trường hợp

Tự tìm hiểu tài khoản gửi key đây

Khi mua hàng -\> Khách nhận hàng nhưng mà chưa nhấn nút đã nhận hàng -\>
thì tự động sau 3 ngày nó sẽ chuyển trạng thái thành là đã nhận -\> và
admin sẽ chuyển tiền vào tài khoản VNpay
