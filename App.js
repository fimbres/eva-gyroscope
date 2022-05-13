import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

import AppButton from './components/AppButton';
import AppInput from './components/AppInput';
import MovementRecognizer from './components/MovementRecognizer';
import Colors from './constants/colors';
import { EVA_IP_ADDRESS } from './constants/server-eva';
import { getMovement } from './server/services';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0, });
  const [subscription, setSubscription] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [evaIpAddress, setEvaIpAddress] = useState(EVA_IP_ADDRESS);
  const [formIpAddress, setFormIpAddress] = useState(evaIpAddress);
  const [movementCode, setMovementCode] = useState("");

  const handleSubmit = () => {
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
    if(movementCode !== ""){
      return async () => {
        try{
            const response = await getMovement(evaIpAddress, movementCode);
            if(response.statusCode) throw "TimeOut! Request failed.";
        }
        catch(err) {
          Toast.show('Timeout: Data failed to send.', {
            duration: Toast.durations.SHORT,
            containerStyle: {backgroundColor: "red"}
          });
        }
      }
    }
  }, [movementCode]);

  const center = async () => {
    try{
      const response = await getMovement(evaIpAddress, "c");
      if(response.statusCode) throw "TimeOut! Request failed.";
    }
    catch(err) {
      Toast.show('Timeout: Data failed to send.', {
        duration: Toast.durations.SHORT,
        containerStyle: {backgroundColor: "red"}
      });
    }
  };

  const { x, y, z } = data;
  return (
    <RootSiblingParent>
      <SafeAreaView style={styles.page}>
        {Gyroscope.isAvailableAsync() ? 
          <View style={styles.container}>
            <View>
              <Text style={[styles.title, {marginBottom: 30}]}>Gyroscope Data</Text>
              <Text style={styles.text}>x: {x.toFixed(2)}  y: {y.toFixed(2)}  z: {z.toFixed(2)}</Text>
            </View>
            {subscription && <View>
              <Text style={[styles.text, {marginTop: 15}]}>Sending data to {evaIpAddress}</Text>
              <Text style={[styles.subtitle, {marginTop: 10}]} >Your movement is <MovementRecognizer x={x} y={y} movementCode={movementCode} setMovementCode={setMovementCode}/></Text>
            </View>}
            <View style={styles.buttonContainer}>
              <AppButton onPress={subscription ? _unsubscribe : _subscribe} title={subscription ? "Stop" : "Start"} primary={true}/>
              {subscription && <AppButton onPress={center} title="Center" primary={false}/>}
              {!subscription && <AppButton onPress={() => {setShowForm(!showForm)}} title="Set new Eva IP Address" primary={false}/>}
            </View>
            {(!subscription && showForm) && (<View style={styles.evaForm}>
              <AppInput onChange={(text) => setFormIpAddress(text)} value={formIpAddress} placeHolder="Enter the new IP Address of Eva" keyboardType="decimal-pad"/>
              <AppButton title="Submit" primary={true} onPress={() => handleSubmit()}/>  
            </View>)}
          </View> : 
          <View style={styles.container}>
            <Text style={styles.title}>You don't have a gyroscope sensor</Text>
          </View>}
      </SafeAreaView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    backgroundColor: Colors.font
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontWeight: "500",
    fontSize: 36,
    color: Colors.secondary,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 22,
    color: Colors.tertiary,
    textAlign: 'center',
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
