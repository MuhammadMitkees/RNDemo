import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../../Redux/cartSlice";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Ionicons"; // Importing icons
import Animated, {
  SlideInLeft,
  FadeIn,
  FadeOut,
} from "react-native-reanimated"; // Importing Reanimated
import { useTheme } from "../../Themes/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import styled from "styled-components";
import { lightTheme } from "../../Themes/themes";
const AddToCartBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.primary};
`;
const ProductName = styled.Text`
  color: ${(props) => props.theme.text};
`;
const EStoreScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [bestSeller, setBestSeller] = useState(false);
  const [freeShipment, setFreeShipment] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: "All Products", value: "all" },
    { label: "Fresh", value: "Fresh" },
    { label: "Electronics", value: "Electronics" },
    { label: "Mobile phone", value: "Mobile phone" },
    { label: "Fashion", value: "Fashion" },
    { label: "Beauty", value: "Beauty" },
    { label: "Video games", value: "Video games" },
  ]);
  const [loading, setLoading] = useState(true);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = [];
        const snapshot = await firestore().collection("products").get();
        snapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [category, bestSeller, freeShipment, products]);

  const filterProducts = () => {
    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (bestSeller) {
      filtered = filtered.filter((product) => product.bestSeller);
    }

    if (freeShipment) {
      filtered = filtered.filter((product) => product.freeShipment);
    }

    setFilteredProducts(filtered);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item));
    } else {
      dispatch(removeItem(item));
    }
  };

  const renderItem = ({ item }) => {
    const inCart = cart.find((cartItem) => cartItem.id === item.id);

    return (
      <Animated.View entering={SlideInLeft} style={styles.productContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <ProductName style={styles.productName}>{item.name}</ProductName>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.cartControls}>
          {inCart ? (
            <>
              <TouchableOpacity onPress={() => handleDecrement(inCart)}>
                <Icon name="remove-circle-outline" size={30} color="red" />
              </TouchableOpacity>
              <Text style={{ color: theme.text }}>{inCart.quantity}</Text>
              <TouchableOpacity
                onPress={() => dispatch(incrementQuantity(item))}
              >
                <Icon name="add-circle-outline" size={30} color="green" />
              </TouchableOpacity>
            </>
          ) : (
            <AddToCartBtn
              style={styles.addToCartBtn}
              onPress={() => dispatch(addItem(item))}
            >
              <Text style={styles.addToCartTxt}>Add to Cart</Text>
            </AddToCartBtn>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.toggleContan}>
        <ThemeToggle toggleTheme={toggleTheme} />
      </View>
      <Text style={[styles.title, { color: theme.secondary }]}>
        Welcome to E-Store
      </Text>
      <DropDownPicker
        open={open}
        value={category}
        items={categories}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setCategories}
        style={[styles.dropdown, { borderColor: theme.primary }]}
        placeholder="Select a category"
      />
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.secondary }}>Best Seller</Text>
        <Switch
          value={bestSeller}
          onValueChange={(value) => setBestSeller(value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.secondary }}>Free Shipment</Text>
        <Switch
          value={freeShipment}
          onValueChange={(value) => setFreeShipment(value)}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {cart.length > 0 && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.cartButtonContainer}
        >
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <Icon name="cart-outline" size={20} color="white" />
            <Text style={styles.cartButtonText}>
              Go to Cart ({cart.length})
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "green",
  },
  productCategory: {
    fontSize: 12,
    color: "gray",
  },
  cartControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  cartButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  cartButton: {
    backgroundColor: lightTheme.primary,
    padding: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  cartButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  addToCartBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartTxt: {
    color: "white",
  },
  themeToggle: {
    alignItems: "center",
    marginVertical: 20,
  },
  toggleContan: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
});

export default EStoreScreen;
