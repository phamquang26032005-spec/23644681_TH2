// src/navigation/ShopStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { VARIANT } from '../constants/student';

const Stack = createNativeStackNavigator();

export default function ShopStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: VARIANT.detailPresentation // Sẽ là 'card' theo biến thể
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    );
}