import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const Checkout = () => {
  const route = useRoute();
  const { totalAmount } = route.params;
  const total = parseFloat(totalAmount);
  const vat = (total * 0.05).toFixed(2);
  const totalWithVAT = (total + parseFloat(vat)).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.summaryText}>Checkout Summary</Text>
      <View style={styles.summaryDetails}>
        <Text style={styles.label}>Total Amount: </Text>
        <Text style={styles.value}>${totalAmount}</Text>
      </View>
      <View style={styles.summaryDetails}>
        <Text style={styles.label}>VAT (5%): </Text>
        <Text style={styles.value}>${vat}</Text>
      </View>
      <View style={styles.summaryDetails}>
        <Text style={styles.label}>Total with VAT: </Text>
        <Text style={styles.value}>${totalWithVAT}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Checkout;
