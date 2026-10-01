// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { fetchProducts } from '../services/productApi';
import { STUDENT, DEBOUNCE_MS, STALE_TIME_MS, ROOM_LABEL, PRICE_MULTIPLIER, VARIANT } from '../constants/student';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useCartStore } from '../stores/cartStore';
import ProductCard from '../components/ProductCard';
import Watermark from '../components/Watermark';

export default function HomeScreen() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS); //[cite: 1]
    const addCart = useCartStore(state => state.add);

    const { data, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS, //[cite: 1]
    });

    const filteredData = data?.filter((item: any) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleAddToCart = (item: any) => {
        if (VARIANT.hapticOnAdd === 'impact') {
            ReactNativeHapticFeedback.trigger("impactMedium");
        } else {
            ReactNativeHapticFeedback.trigger("selection"); //[cite: 1]
        }
        const finalPrice = Math.round(item.price * PRICE_MULTIPLIER);
        addCart(item, finalPrice);
    };

    // Cảnh 1: Đang tải
    if (isLoading && !isRefetching) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#1D4ED8" />
                <Text style={styles.textLight}>Đang tải món...</Text>
            </View>
        );
    }

    // Cảnh 2: Lỗi mạng[cite: 1]
    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                <Text style={styles.textLight}>Không tải được dữ liệu món.</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
                    <Text style={styles.retryText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Cảnh 3: Có dữ liệu (Lưới 2 cột)[cite: 1]
    return (
        <View style={styles.container}>
            <Watermark />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>KTXGO</Text>
                <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                value={search}
                onChangeText={setSearch}
            />

            <FlashList
                data={filteredData}
                numColumns={2}
                estimatedItemSize={220}
                keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`} //[cite: 1]
                renderItem={({ item }) => <ProductCard item={item} onAdd={() => handleAddToCart(item)} />}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF' },
    center: { flex: 1, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' },
    header: { backgroundColor: '#1D4ED8', padding: 20, paddingTop: 40 },
    headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    headerSubtitle: { color: '#BFDBFE', fontSize: 14 },
    input: {
        backgroundColor: '#FFFFFF', margin: 16, padding: 12,
        borderRadius: 8, borderWidth: 1, borderColor: '#BFDBFE'
    },
    listContainer: { paddingBottom: 60, paddingHorizontal: 8 },
    textLight: { color: '#1E3A8A', marginTop: 10 },
    errorMssv: { color: '#DC2626', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    retryBtn: { backgroundColor: '#DC2626', padding: 12, borderRadius: 8, marginTop: 20 },
    retryText: { color: '#FFFFFF', fontWeight: 'bold' }
});