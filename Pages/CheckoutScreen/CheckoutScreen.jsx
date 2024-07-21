import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import styled from "styled-components";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
const Container = styled.View`
  background-color: ${(props) => props.theme.background};
`;
const CheckoutText = styled.Text`
  color: ${(props) => props.theme.text};
`;
const Checkout = () => {
  const route = useRoute();
  const { totalAmount } = route.params;
  const total = parseFloat(totalAmount);
  const vat = (total * 0.05).toFixed(2);
  const totalWithVAT = (total + parseFloat(vat)).toFixed(2);

  return (
    <Container style={styles.container}>
      <ThemeToggle />
      <CheckoutText style={styles.summaryText}>Checkout Summary</CheckoutText>
      <View style={styles.summaryDetails}>
        <CheckoutText style={styles.label}>Total Amount: </CheckoutText>
        <CheckoutText style={styles.value}>${totalAmount}</CheckoutText>
      </View>
      <View style={styles.summaryDetails}>
        <CheckoutText style={styles.label}>VAT (5%): </CheckoutText>
        <CheckoutText style={styles.value}>${vat}</CheckoutText>
      </View>
      <View style={styles.summaryDetails}>
        <CheckoutText style={styles.label}>Total with VAT: </CheckoutText>
        <CheckoutText style={styles.value}>${totalWithVAT}</CheckoutText>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    // justifyContent: "center",
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
