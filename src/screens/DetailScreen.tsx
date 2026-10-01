import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Vibration,
  Platform,
} from 'react-native';
import { useCartStore } from '../stores/cartStore';

// Dữ liệu chi tiết tham chiếu theo id
const PRODUCT_DETAILS: Record<string, any> = {
  '1': {
    name: 'Cơm nắm rong biển',
    price: 28500,
    desc: 'Mô tả ngắn từ API (tối đa 3 dòng).\nGiữ nguyên id từ route.params.',
    bgColor: '#FEF3C7',
  },
  '2': {
    name: 'Trà sữa trân châu',
    price: 35000,
    desc: 'Trà sữa thơm ngon, ngọt thanh đậm vị trà ô long, kèm trân châu hoàng kim dai giòn.',
    bgColor: '#E0F2FE',
  },
  '3': {
    name: 'Bút bi gel xanh',
    price: 12000,
    desc: 'Bút bi ngòi 0.5mm nét mảnh, mực ra đều, thích hợp cho sinh viên ghi chép bài giảng.',
    bgColor: '#DCFCE7',
  },
  '4': {
    name: 'Mì ly thịt bằm',
    price: 18000,
    desc: 'Mì ly ăn liền nóng hổi, tiện lợi cho các buổi học khuya tại ký túc xá.',
    bgColor: '#FFE4E6',
  },
};

export default function DetailScreen({ route, navigation }: any) {
  // Lấy id từ route.params (mặc định '1' nếu chưa truyền)
  const productId = route?.params?.id || '1';
  const product = PRODUCT_DETAILS[productId] || PRODUCT_DETAILS['1'];

  const addToCart = useCartStore((state) => state.addToCart);
  const cartCount = useCartStore((state) => state.getTotalCount());

  const handleAddToCart = () => {
    // 1. Thêm vào Zustand store
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    // 2. Giả lập hiệu ứng Haptic / Rung máy
    if (Platform.OS === 'android') {
      Vibration.vibrate(50);
    }

    // 3. Hiển thị Alert có chứa MSSV theo đúng yêu cầu đề thi
    Alert.alert(
      'Thêm vào giỏ thành công',
      `Đã thêm ${product.name} vào giỏ hàng!\nMSSV: 23644681 - TH2`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#DBEAFE" />

      {/* Thanh Watermark Header */}
      <View style={styles.watermarkHeader}>
        <Text style={styles.watermarkText}>
          TH2 · 23644681 · PHAM VAN QUANG · #1D4ED8
        </Text>
        <Text style={styles.watermarkCartCount}>({cartCount})</Text>
      </View>

      {/* Thanh Header điều hướng Chi tiết món */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Chi tiết món</Text>
        </TouchableOpacity>
        <Text style={styles.stackLabel}>Stack</Text>
      </View>

      <View style={styles.container}>
        {/* Khung mô phỏng ảnh sản phẩm lớn */}
        <View style={[styles.imagePlaceholderBox, { backgroundColor: product.bgColor }]}>
          <View style={styles.outerOval}>
            <View style={styles.innerBar} />
          </View>
        </View>

        {/* Tên và giá */}
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          {product.price.toLocaleString('vi-VN')} đ
        </Text>
        <Text style={styles.subNote}>Giao nội khu · nhận tận phòng</Text>

        {/* Mô tả ngắn */}
        <Text style={styles.descriptionText}>{product.desc}</Text>

        <View style={{ flex: 1 }} />

        {/* Nút Thêm vào giỏ - Haptic */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartBtnText}>Thêm vào giỏ · Haptic</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  watermarkHeader: {
    height: 38,
    backgroundColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#BFDBFE',
  },
  watermarkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  watermarkCartCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  navBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#EFF6FF',
  },
  backButton: {
    paddingVertical: 6,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  stackLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EA580C', // Màu cam của nhãn Stack
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
    alignItems: 'center',
  },
  imagePlaceholderBox: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  outerOval: {
    width: 170,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#93C5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBar: {
    width: 140,
    height: 70,
    backgroundColor: '#1D4ED8',
    borderRadius: 6,
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D4ED8',
    marginBottom: 6,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D4ED8',
    marginBottom: 6,
  },
  subNote: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'left',
    width: '100%',
    lineHeight: 18,
  },
  addToCartBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#1D4ED8',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});