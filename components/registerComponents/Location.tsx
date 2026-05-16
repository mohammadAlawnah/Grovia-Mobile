import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View, Button } from "react-native";
import * as Location from 'expo-location'; 
export default function LocationField() {
  const { width } = useWindowDimensions();
  const [location, setLocation] = useState<any>(null); 
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(); 
    if (status !== 'granted') {
      console.log("Permission denied");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({}); 
    setLocation(loc); 
  };

  return (
    <View style={{ width: width * 0.8 }}>
      <Text style={[styles.textTitle]}>location</Text>
      <Button title="Get Location" onPress={getLocation} color="#53B175" />
      {location && (
        <Text style={styles.coordDisplay}>
          Lat: {location.coords.latitude.toFixed(5)}  |   Lng: {location.coords.longitude.toFixed(5)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  textTitle: {
    paddingVertical: 8,
    fontWeight: "500",
    fontSize: 16,
    
  },
  coordDisplay: {
    fontSize: 12,
    color: '#7C7C7C',
    marginTop: 5,
  }
});