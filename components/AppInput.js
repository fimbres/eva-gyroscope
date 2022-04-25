import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import Colors from '../constants/colors';

export default function AppInput({ setEvaIpAddress, value }) {
  return (
    <TextInput 
      style={styles.input}
      defaultValue={value}
      placeholder="Enter the new IP Address of Eva"
      onChangeText={(text) => {setEvaIpAddress(text)}}
      keyboardType="decimal-pad"
    />
  )
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 43,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    color: Colors.primary,
    marginBottom: 10
  },
});