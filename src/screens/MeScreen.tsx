// src/screens/MeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { STUDENT, examStamp } from '../constants/student';
import { useCampusLocation } from '../hooks/useCampusLocation';
import Watermark from '../components/Watermark';

export default function MeScreen() {
    const logout = useAuthStore(state => state.logout);
    const { status, distance, fee, requestLocation, openSettings } = useCampusLocation();

    return (
        <View style={styles.container}>
            <Watermark />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.profile}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.mssv}>{STUDENT.mssv} · #{examStamp()}</Text>
            </View>

            <View style={styles.card}>
                <Text style={[styles.status, { color: status === 'granted' ? '#16A34A' : '#DC2626' }]}>
                    Quyền: {status}
                </Text>

                {distance !== null && (
                    <Text style={styles.text}>≈ {distance.toFixed(1)} km tới cổng KTX</Text>
                )}

                <Text style={styles.text}>Phí ship ước tính</Text>
                <Text style={styles.fee}>{fee ? fee.toLocaleString('vi-VN') + ' đ' : '---'}</Text>
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={requestLocation}>
                <Text style={styles.btnTextPrimary}>Lấy vị trí ước tính ship</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOutline} onPress={openSettings}>
                <Text style={styles.btnTextOutline}>Mở Cài đặt (blocked)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnDanger} onPress={logout}>
                <Text style={styles.btnTextPrimary}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF' },
    header: { backgroundColor: '#1D4ED8', padding: 20, paddingTop: 40, alignItems: 'center' },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    profile: { alignItems: 'center', marginVertical: 20 },
    name: { fontSize: 20, fontWeight: 'bold', color: '#1E3A8A' },
    mssv: { color: '#64748B', marginTop: 5 },
    card: { backgroundColor: '#FFFFFF', margin: 16, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#BFDBFE' },
    status: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    text: { color: '#64748B', marginBottom: 5 },
    fee: { fontSize: 24, fontWeight: 'bold', color: '#F97316' },
    btnPrimary: { backgroundColor: '#1D4ED8', marginHorizontal: 16, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    btnTextPrimary: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    btnOutline: { borderColor: '#1D4ED8', borderWidth: 1, marginHorizontal: 16, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
    btnTextOutline: { color: '#1D4ED8', fontWeight: 'bold', fontSize: 16 },
    btnDanger: { backgroundColor: '#DC2626', marginHorizontal: 16, padding: 15, borderRadius: 8, alignItems: 'center' }
});