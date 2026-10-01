import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useAuthStore } from '../stores/authStore';

export default function LoginScreen() {
  const [inputVal, setInputVal] = useState('');
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      Alert.alert('Thông báo', 'Vui lòng nhập email hoặc số điện thoại');
      return;
    }

    // Token giả lập theo đúng yêu cầu đề bài: ktxgo-{mssv}-{stamp}
    const stamp = Date.now();
    const fakeToken = `ktxgo-23644681-${stamp}`;
    
    // Lưu token vào Zustand Store -> Chuyển vào Main Tabs
    setToken(fakeToken);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Watermark đúng chuẩn giao diện đề thi */}
      <View style={styles.watermarkHeader}>
        <Text style={styles.watermarkText}>
          TH2 · 23644681 · PHAM VAN QUANG · #1D4ED8
        </Text>
        <Text style={styles.watermarkCartCount}>(0)</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Logo / Tiêu đề */}
          <Text style={styles.title}>KTXGO</Text>
          <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

          {/* Ô nhập Email / Phone */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email — 23644681@iuh.edu.vn"
              placeholderTextColor="#94a3b8"
              value={inputVal}
              onChangeText={setInputVal}
              autoCapitalize="none"
            />
            <Text style={styles.badgeLetter}>(A)</Text>
          </View>

          {/* Nút bấm Vào cửa hàng */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>Vào cửa hàng</Text>
          </TouchableOpacity>

          {/* Dòng trạng thái nhỏ bên dưới */}
          <Text style={styles.footerNote}>Auth Stack · chưa có token</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFF6FF', // Nền chuẩn #EFF6FF
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  watermarkHeader: {
    height: 38,
    backgroundColor: '#BFDBFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#93C5FD',
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#1D4ED8',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 36,
  },
  inputContainer: {
    width: '100%',
    height: 52,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
  },
  badgeLetter: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
    marginLeft: 8,
  },
  loginBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#1D4ED8', // Nút primary #1D4ED8
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footerNote: {
    fontSize: 12,
    color: '#94a3b8',
  },
});