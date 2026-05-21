export default function TopHeader() {
  return (
    <div className="bg-[#ee4d2d] text-sm text-white">
      <div className="container-custom flex h-8 items-center justify-between">
        <div className="flex gap-4">
          <span>Kênh Người Bán</span>
          <span>Tải ứng dụng</span>
        </div>

        <div className="flex gap-4">
          <span>Thông báo</span>
          <span>Hỗ trợ</span>
          <span>Đăng nhập</span>
        </div>
      </div>
    </div>
  );
}
