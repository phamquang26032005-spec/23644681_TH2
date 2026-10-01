// src/components/ProductCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PRICE_MULTIPLIER } from '../constants/student';

export default function ProductCard({ item, onAdd }: { item: any, onAdd: () => void }) {
    const navigation = useNavigation<any>();
    // Giá = Math.round(price * PRICE_MULTIPLIER) + ' đ'
    const finalPrice = Math.round(item.price * PRICE_MULTIPLIER);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { id: item.id })} // Vào detail truyền id[cite: 1]
        >
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.price}>{finalPrice.toLocaleString('vi-VN')} đ</Text>

            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 8,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        position: 'relative',
        height: 220
    },
    image: { width: '100%', height: 100, marginBottom: 10 },
    title: { fontSize: 14, color: '#1E3A8A', fontWeight: 'bold' },
    price: { fontSize: 14, color: '#1D4ED8', marginTop: 4 },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#1D4ED8',
        width: 30,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});