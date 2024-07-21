import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../../Redux/cartSlice";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Importing icons
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { useTheme } from "@/Themes/ThemeContext";
import styled from "styled-components";

const Container = styled.View`
  background-color: ${(props) => props.theme.background};
`;
const CartItem = styled.View`
  border-bottom-color: ${(props) => props.theme.secondary};
`;
const ItemName = styled.Text`
  color: ${(props) => props.theme.secondary};
`;
const EmptyCart = styled.Text`
  color: ${(props) => props.theme.secondary};
`;
const CartSummary = styled.View`
  border-top-color: ${(props) => props.theme.secondary};
`;
const TotalAmount = styled.Text`
  color: ${(props) => props.theme.secondary};
`;
const CheckoutButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.primary};
`;
const NormalText = styled.Text`
  color: ${(props) => props.theme.text};
`;
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { toggleTheme } = useTheme();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const renderItem = ({ item }) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    return (
      <CartItem style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <ItemName style={styles.itemName}>{item.name}</ItemName>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => dispatch(decrementQuantity(item))}>
              <Icon name="remove-circle-outline" size={30} color="red" />
            </TouchableOpacity>
            <NormalText style={styles.quantityText}>{item.quantity}</NormalText>
            <TouchableOpacity onPress={() => dispatch(incrementQuantity(item))}>
              <Icon name="add-circle-outline" size={30} color="green" />
            </TouchableOpacity>
          </View>
          <NormalText style={styles.itemTotal}>Total: ${itemTotal}</NormalText>
          <TouchableOpacity onPress={() => dispatch(removeItem(item))}>
            <Icon name="trash-outline" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </CartItem>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.toggleContan}>
        <ThemeToggle toggleTheme={toggleTheme} />
      </View>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyCart style={styles.emptyCart}>Your cart is empty</EmptyCart>
        }
      />
      {cart.length > 0 && (
        <CartSummary style={styles.cartSummary}>
          <TotalAmount style={styles.totalAmount}>
            Total Amount: ${calculateTotal()}
          </TotalAmount>
          <CheckoutButton
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate("Checkout", { totalAmount: calculateTotal() })
            }
          >
            <Icon
              name="cart-outline"
              size={20}
              color="white"
              style={styles.checkoutIcon}
            />
            <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
          </CheckoutButton>
        </CartSummary>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "green",
  },
  itemCategory: {
    fontSize: 12,
    color: "gray",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyCart: {
    textAlign: "center",
    margin: 20,
    fontSize: 18,
  },
  cartSummary: {
    padding: 20,
    borderTopWidth: 1,
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  checkoutIcon: {
    marginRight: 5,
  },
  toggleContan: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
});

export default Cart;
