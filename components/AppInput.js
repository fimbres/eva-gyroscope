import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import Colors from '../constants/colors';

export default function AppInput({ onChange, value, placeHolder, ...props }) {
  return (
    <TextInput 
      style={styles.input}
      defaultValue={value}
      placeholder={placeHolder}
      onChangeText={onChange}
      {...props}
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