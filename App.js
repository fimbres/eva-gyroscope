import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

import { useFonts, Roboto_500Medium, Roboto_300Light } from '@expo-google-fonts/roboto';

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  let {fontsLoaded, errors} = useFonts({
    Roboto_300Light,
    Roboto_500Medium
  });

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      }),
      Gyroscope.setUpdateInterval(400)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  return (
    Gyroscope.isAvailableAsync() ? 
      <View style={styles.container}>
        <Text style={{fontFamily: "Roboto_500Medium", fontSize: 24}}>Gyroscope Data:</Text>
        <Text>x: {x}</Text>
        <Text>y: {y}</Text>
        <Text>z: {z}</Text>
        <View>
          <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} >
            <Text>{subscription ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
        </View>
      </View> : 
      <View style={styles.container}>
        <Text>You don't have a Gyroscope sensor</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
