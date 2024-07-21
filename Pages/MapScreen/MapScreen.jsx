import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { globalColors } from "../../Themes/themes";
const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLocation(currentLocation.coords);
    })();
  }, []);

  const sendLocation = () => {
    if (location) {
      Alert.alert(
        "Location Sent",
        `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
      );
    } else {
      Alert.alert("Location not available");
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker coordinate={region} />
        </MapView>
      )}
      <TouchableOpacity style={styles.sendBtn} onPress={sendLocation}>
        <Text style={styles.sendBtnTxt}>Send Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sendBtn: {
    backgroundColor: globalColors.primary,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
    color: "white",
  },
  sendBtnTxt: {
    color: "white",
  },
});

export default MapScreen;
