import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import MeScreen from '../screens/MeScreen';
import { useCartStore } from '../stores/cartStore';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const cartCount = useCartStore((state) => state.getTotalCount());

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1D4ED8',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#DBEAFE',
          height: 60,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Cửa hàng',
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarLabel: 'Giỏ',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#EA580C', // Huy hiệu màu cam chuẩn theo ảnh
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="MeTab"
        component={MeScreen}
        options={{
          tabBarLabel: 'Tôi',
        }}
      />
    </Tab.Navigator>
  );
}