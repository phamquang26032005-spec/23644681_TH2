// src/components/Watermark.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT, examStamp, VARIANT } from '../constants/student';

export default function Watermark() {
    return (
        <View style={[styles.container, VARIANT.watermarkAtTop ? styles.top : styles.bottom]}>
            <Text style={styles.text}>
                TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BFDBFE',
        paddingVertical: 4,
        alignItems: 'center',
        width: '100%',
    },
    top: { position: 'absolute', top: 0, zIndex: 999 },
    bottom: { position: 'absolute', bottom: 0, zIndex: 999 },
    text: { fontSize: 12, color: '#1E3A8A', fontWeight: 'bold' }
});