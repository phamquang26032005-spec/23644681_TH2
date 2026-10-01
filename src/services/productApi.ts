import apiClient from './apiClient';

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  desc?: string;
  image?: string;
}

export const getProducts = async (): Promise<ProductItem[]> => {
  try {
    return await apiClient.get('/products');
  } catch (error) {
    console.warn('Lỗi gọi API, dùng fallback dữ liệu cục bộ:', error);
    // Trả về dữ liệu mặc định để ứng dụng không bị trắng màn hình nếu mất mạng
    return [
      { id: '1', name: 'Phòng KTX Tiêu chuẩn 4 người', price: 650000, desc: 'Máy lạnh, tủ đồ cá nhân, WC riêng' },
      { id: '2', name: 'Phòng KTX Dịch vụ 2 người', price: 1200000, desc: 'Ban công thoáng mát, tủ lạnh mini' },
      { id: '3', name: 'Suất cơm tháng KTX (Bữa trưa)', price: 750000, desc: 'Đảm bảo dinh dưỡng, đổi món mỗi ngày' },
      { id: '4', name: 'Gói giặt ủi sinh viên / tháng', price: 180000, desc: 'Giặt sấy thơm tho, lấy ngay trong ngày' },
      { id: '5', name: 'Thẻ gửi xe KTX cả học kỳ', price: 250000, desc: 'Giữ xe 24/7 có bảo vệ và camera an ninh' },
    ];
  }
};