import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  return (
      <View style={styles.container}>
          
          <Text style={styles.title}>YOUR COORDINATES:</Text>

          <Text style={styles.subtitle}>Latitude:</Text>
          
          <Text style={styles.paragraph}>{location?.coords.latitude ?? "Waiting..."}</Text>

          <Text style={styles.subtitle}>Longitude:</Text>
          
          <Text style={styles.paragraph}>{location?.coords.longitude ?? "Waiting..."}</Text>

          <Text style={styles.subtitle}>Altitude:</Text>
          
          <Text style={styles.paragraph}>{location?.coords.altitude ?? "Waiting..."}</Text>

          <Text style={styles.subtitle}>Accuracy:</Text>
          
          <Text style={styles.paragraph}>{location?.coords.accuracy ?? "Waiting..."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
        padding: 20,
    backgroundColor: '#FAFAFA'
    },
title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#343434',
    },
subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#343434',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
      marginBottom: 10,
    color: '#676666',
  },
});
