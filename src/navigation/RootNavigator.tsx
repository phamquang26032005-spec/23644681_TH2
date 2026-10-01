// src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../stores/authStore';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <AuthStack />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. Màn hình chứa Bottom Tabs chính */}
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* 2. Màn hình Chi tiết món (nhận params { id }) */}
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}