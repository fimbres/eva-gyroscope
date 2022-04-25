import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import Colors from '../constants/colors';

export default function AppButton({ onPress, title, primary }) {
  return (
    <TouchableOpacity
        style={primary ? styles.primaryButton : styles.secondaryButton}
        onPress={onPress}
    >
     <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  primaryButton: {
    width: '100%',
    height: 43,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryButton: {
    width: '100%',
    height: 43,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  text: {
    color: Colors.font,
    fontSize: 17
  },
});