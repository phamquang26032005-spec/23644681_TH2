// src/screens/CartScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCartStore } from '../stores/cartStore';
import { ROOM_LABEL, VARIANT } from '../constants/student';
import { useCampusLocation } from '../hooks/useCampusLocation';
import Watermark from '../components/Watermark';

export default function CartScreen() {
    const { items, removeFromCart } = useCartStore();
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const { fee } = useCampusLocation(); // Lấy phí từ hook đã tính[cite: 1]

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.title}</Text>
                <View style={styles.qtyRow}>
                    <Text style={styles.itemPrice}>x{item.quantity}  {(item.price * item.quantity).toLocaleString('vi-VN')} đ</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.delBtn} onPress={() => removeFromCart(item.id)}>
                <Text style={styles.delText}>🗑</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Watermark />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />

            <View style={styles.summaryCard}>
                <Text style={styles.roomText}>Giao đến {ROOM_LABEL}</Text>
                <Text style={styles.feeText}>
                    Phí ship: {fee ? fee.toLocaleString('vi-VN') + ` đ (công thức ${VARIANT.shipFormula})` : 'Chưa tính (Vào Tab Tôi để lấy vị trí)'}
                </Text>
            </View>

            <View style={styles.totalRow}>
                <Text style={styles.totalText}>Tổng hàng: {totalAmount.toLocaleString('vi-VN')} đ</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF' },
    header: { backgroundColor: '#1D4ED8', padding: 20, paddingTop: 40, alignItems: 'center' },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    itemRow: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
    itemName: { fontSize: 16, color: '#1E3A8A', fontWeight: 'bold' },
    qtyRow: { flexDirection: 'row', marginTop: 5 },
    itemPrice: { color: '#64748B' },
    delBtn: { backgroundColor: '#DC2626', padding: 10, borderRadius: 8 },
    delText: { color: '#FFFFFF' },
    summaryCard: { margin: 16, padding: 15, backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#F97316' },
    roomText: { fontSize: 16, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 5 },
    feeText: { color: '#F97316', fontWeight: 'bold' },
    totalRow: { alignItems: 'center', marginBottom: 80 },
    totalText: { fontSize: 18, fontWeight: 'bold', color: '#1D4ED8' }
});