// src/hooks/useCampusLocation.ts
import { useState, useCallback } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform, Linking } from 'react-native';
import { BASE_SHIP_FEE, VARIANT } from '../constants/student';

// Tọa độ giả định cổng KTX IUH
const CAMPUS_LAT = 10.8221;
const CAMPUS_LNG = 106.6868;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function useCampusLocation() {
    const [status, setStatus] = useState<'undetermined' | 'granted' | 'denied' | 'blocked'>('undetermined');
    const [distance, setDistance] = useState<number | null>(null);
    const [fee, setFee] = useState<number | null>(null);

    const requestLocation = useCallback(async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setStatus('granted');
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                setStatus('blocked');
                return;
            } else {
                setStatus('denied');
                return;
            }
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const km = haversine(position.coords.latitude, position.coords.longitude, CAMPUS_LAT, CAMPUS_LNG);
                setDistance(km);

                // Công thức B[cite: 1]
                let calculatedFee = 0;
                if (VARIANT.shipFormula === 'A') {
                    calculatedFee = BASE_SHIP_FEE + Math.round(km * 2000);
                } else {
                    calculatedFee = BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
                }
                setFee(calculatedFee);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) setStatus('blocked');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    const openSettings = () => Linking.openSettings(); //[cite: 1]

    return { status, distance, fee, requestLocation, openSettings };
}