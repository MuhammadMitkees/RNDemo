// HomeScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}!</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;
