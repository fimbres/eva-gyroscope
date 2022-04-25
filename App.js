import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Gyroscope } from 'expo-sensors';

import AppButton from './components/AppButton';
import AppInput from './components/AppInput';
import Colors from './constants/colors';
import { EVA_IP_ADDRESS } from './constants/server-eva';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0, });
  const [subscription, setSubscription] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [evaIpAddress, setEvaIpAddress] = useState(EVA_IP_ADDRESS);
  const [formIpAddress, setFormIpAddress] = useState(evaIpAddress);

  const handleOnPress = () => {
    setEvaIpAddress(formIpAddress);
    setShowForm(false);
  };

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
    <SafeAreaView>
      {Gyroscope.isAvailableAsync() ? 
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Gyroscope Data</Text>
            <Text style={styles.text}>x: {x.toFixed(2)}</Text>
            <Text style={styles.text}>y: {y.toFixed(2)}</Text>
            <Text style={styles.text}>z: {z.toFixed(2)}</Text>
          </View>
          {subscription && <Text style={[styles.text, {marginTop: 15}]}>Sending data to {evaIpAddress}</Text>}
          <View style={styles.buttonContainer}>
            <AppButton onPress={subscription ? _unsubscribe : _subscribe} title={subscription ? 'Stop' : 'Start'} primary={true}/>
            <AppButton onPress={() => {setShowForm(!showForm)}} title="Set new Eva IP Address" primary={false}/>
          </View>
          {showForm && <View style={styles.evaForm}>
            <AppInput setEvaIpAddress={setFormIpAddress} value={formIpAddress}/>
            <AppButton title="Submit" primary={true} onPress={() => {handleOnPress()}}/>  
          </View>}
        </View> : 
        <View style={styles.container}>
          <Text style={styles.title}>You don't have a gyroscope sensor</Text>
        </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontWeight: "500",
    fontSize: 32,
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: 30
  },
  text: {
    fontSize: 18,
    color: Colors.fontPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20
  },
  evaForm: {
    width:'100%',
    marginTop: 10,
    padding: 15,
  }
});
