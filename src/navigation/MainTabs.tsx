// src/navigation/MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import CartScreen from '../screens/CartScreen';
import MeScreen from '../screens/MeScreen';
import { useCartStore } from '../stores/cartStore';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    const totalQuantity = useCartStore((state) => state.totalQuantity());

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1D4ED8' }}>
            <Tab.Screen name="ShopTab" component={ShopStack} options={{ title: 'Cửa hàng' }} />
            <Tab.Screen
                name="CartTab"
                component={CartScreen}
                options={{
                    title: 'Giỏ',
                    tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
                    tabBarBadgeStyle: { backgroundColor: '#F97316' }
                }}
            />
            <Tab.Screen name="MeTab" component={MeScreen} options={{ title: 'Tôi' }} />
        </Tab.Navigator>
    );
}