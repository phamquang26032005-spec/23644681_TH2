import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useCartStore } from '../stores/cartStore';

// Danh sách món ăn/văn phòng phẩm ký túc xá theo đề bài
const FOOD_PRODUCTS = [
  {
    id: '1',
    name: 'Cơm nắm',
    price: 28500,
    bgColor: '#FEF3C7',
  },
  {
    id: '2',
    name: 'Trà sữa',
    price: 35000,
    bgColor: '#E0F2FE',
  },
  {
    id: '3',
    name: 'Bút bi',
    price: 12000,
    bgColor: '#DCFCE7',
  },
  {
    id: '4',
    name: 'Mì ly',
    price: 18000,
    bgColor: '#FFE4E6',
  },
];

export default function HomeScreen({ navigation }: any) {
  // Trạng thái hiển thị: 'data' (có dữ liệu) | 'loading' (đang tải) | 'error' (lỗi mạng)
  const [viewState, setViewState] = useState<'data' | 'loading' | 'error'>('data');
  const [keyword, setKeyword] = useState('');
  
  // Custom hook debounce từ khóa tìm kiếm
  const debouncedKeyword = useDebouncedValue(keyword, 300);

  // Zustand Store
  const addToCart = useCartStore((state) => state.addToCart);
  const cartCount = useCartStore((state) => state.getTotalCount());

  // Lọc sản phẩm theo từ khóa debounce
  const filteredProducts = useMemo(() => {
    if (!debouncedKeyword.trim()) return FOOD_PRODUCTS;
    return FOOD_PRODUCTS.filter((item) =>
      item.name.toLowerCase().includes(debouncedKeyword.toLowerCase())
    );
  }, [debouncedKeyword]);

  // Xử lý nút thử lại khi lỗi mạng
  const handleRetry = () => {
    setViewState('loading');
    setTimeout(() => {
      setViewState('data');
    }, 1000);
  };

  // 1. GIAO DIỆN ĐANG TẢI (Hình 3)
  if (viewState === 'loading') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#EFF6FF" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size={54} color="#1D4ED8" />
          <Text style={styles.loadingText}>Đang tải món...</Text>

          <TouchableOpacity
            style={styles.switchStateBtn}
            onPress={() => setViewState('error')}
          >
            <Text style={styles.switchStateText}>👉 Đổi sang trạng thái LỖI MẠNG</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 2. GIAO DIỆN LỖI MẠNG (Hình 3)
  if (viewState === 'error') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#EFF6FF" />
        <View style={styles.centerContainer}>
          <Text style={styles.errorMssv}>23644681</Text>
          <Text style={styles.errorText}>Không tải được{'\n'}dữ liệu món.</Text>

          <TouchableOpacity style={styles.retryBtn} activeOpacity={0.8} onPress={handleRetry}>
            <Text style={styles.retryBtnText}>Thử lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.switchStateBtn, { marginTop: 30 }]}
            onPress={() => setViewState('data')}
          >
            <Text style={styles.switchStateText}>👉 Đổi về CÓ DỮ LIỆU</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 3. GIAO DIỆN CÓ DỮ LIỆU LƯỚI 2 CỘT (Hình 2 & Hình 3)
  const renderProductItem = ({ item }: { item: typeof FOOD_PRODUCTS[0] }) => (
    <View style={styles.card}>
      {/* Chạm vào hình ảnh hoặc tên để chuyển sang màn hình Chi tiết (Detail) */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation?.navigate('Detail', { id: item.id })}
      >
        <View style={[styles.imagePlaceholderBox, { backgroundColor: item.bgColor }]}>
          <View style={styles.outerOval}>
            <View style={styles.innerBar} />
          </View>
        </View>

        <Text style={styles.productName}>{item.name}</Text>
      </TouchableOpacity>

      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() =>
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: 1,
            })
          }
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#DBEAFE" />

      {/* Header Watermark đúng chuẩn mã số sinh viên */}
      <View style={styles.watermarkHeader}>
        <Text style={styles.watermarkText}>
          TH2 · 23644681 · PHAM VAN QUANG · #1D4ED8
        </Text>
        <Text style={styles.watermarkCartCount}>({cartCount})</Text>
      </View>

      <View style={styles.container}>
        {/* Banner KTXGO */}
        <View style={styles.bannerBox}>
          <View style={styles.bannerRow}>
            <Text style={styles.bannerTitle}>KTXGO</Text>
            <Text style={styles.badgeTag}>(A)</Text>
          </View>
          <Text style={styles.bannerSubtitle}>Giao tận P.245</Text>
        </View>

        {/* Thanh tìm kiếm debounce */}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm món (debounce) — 23644681"
            placeholderTextColor="#94A3B8"
            value={keyword}
            onChangeText={setKeyword}
          />
          <Text style={styles.searchBadge}>(B)</Text>
        </View>

        {/* Nhãn FlashList x2 và nút chuyển trạng thái để chụp ảnh */}
        <View style={styles.debugRow}>
          <Text style={styles.flashListLabel}>(C) FlashList ×2</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <TouchableOpacity onPress={() => setViewState('loading')}>
              <Text style={styles.debugBadge}>[Tải]</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewState('error')}>
              <Text style={styles.debugBadge}>[Lỗi]</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danh sách lưới 2 cột */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 18,
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '700',
  },
  errorMssv: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: 6,
  },
  errorText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  retryBtn: {
    width: '60%',
    height: 44,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  switchStateBtn: {
    marginTop: 35,
    padding: 8,
  },
  switchStateText: {
    color: '#64748B',
    fontSize: 12,
    textDecorationLine: 'underline',
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
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  bannerBox: {
    backgroundColor: '#1D4ED8',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 12,
  },
  bannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  badgeTag: {
    color: '#BFDBFE',
    fontWeight: '700',
    fontSize: 12,
  },
  bannerSubtitle: {
    color: '#E0E7FF',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
  },
  searchBox: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 0,
  },
  searchBadge: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  debugRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 4,
  },
  flashListLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  debugBadge: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  imagePlaceholderBox: {
    height: 85,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  outerOval: {
    width: 90,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#93C5FD',
    opacity: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBar: {
    width: 60,
    height: 18,
    backgroundColor: '#1D4ED8',
    borderRadius: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
});