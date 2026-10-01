// src/screens/DetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useRoute, useNavigation } from '@react-navigation/native';
import { apiClient } from '../services/apiClient';
import { useCartStore } from '../stores/cartStore';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '../constants/student';
import Watermark from '../components/Watermark';

export default function DetailScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { id } = route.params; //
    const addCart = useCartStore(state => state.add);

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get(`/products/${id}`).then(res => {
            setProduct(res.data);
            setLoading(false);
        });
    }, [id]);

    const handleAddToCart = () => {
        if (VARIANT.hapticOnAdd === 'impact') {
            ReactNativeHapticFeedback.trigger("impactMedium");
        } else {
            ReactNativeHapticFeedback.trigger("selection"); //[cite: 1]
        }

        const finalPrice = Math.round(product.price * PRICE_MULTIPLIER);
        addCart(product, finalPrice);
        Alert.alert(`MSSV: ${STUDENT.mssv}`, "Đã thêm món vào giỏ hàng!"); //[cite: 1]
    };

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#1D4ED8" /></View>;

    return (
        <View style={styles.container}>
            <Watermark />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Chi tiết món</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Stack</Text>
            </View>

            <View style={styles.card}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{(Math.round(product.price * PRICE_MULTIPLIER)).toLocaleString('vi-VN')} đ</Text>
                <Text style={styles.subtitle}>Giao nội khu · nhận tận phòng</Text>

                <Text style={styles.desc} numberOfLines={3}>{product.description}</Text>
                <Text style={styles.idText}>ID: {id}</Text>

                <TouchableOpacity style={styles.btn} onPress={handleAddToCart}>
                    <Text style={styles.btnText}>Thêm vào giỏ · Haptic</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 40, backgroundColor: '#FFFFFF' },
    backText: { color: '#1D4ED8', fontSize: 16, fontWeight: 'bold' },
    headerTitle: { color: '#F97316', fontSize: 16, fontWeight: 'bold' },
    card: { margin: 16, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    image: { width: '100%', height: 200, marginBottom: 20 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center' },
    price: { fontSize: 22, color: '#1D4ED8', fontWeight: 'bold', marginVertical: 10 },
    subtitle: { color: '#64748B', marginBottom: 20 },
    desc: { color: '#64748B', textAlign: 'center', marginBottom: 10 },
    idText: { color: '#64748B', marginBottom: 20, fontStyle: 'italic' },
    btn: { backgroundColor: '#1D4ED8', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
    btnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }
});