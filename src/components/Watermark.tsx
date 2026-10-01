import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Watermark() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Text style={styles.text}>PHẠM VĂN QUANG - 23644681 - TH2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 999,
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0369a1',
  },
});