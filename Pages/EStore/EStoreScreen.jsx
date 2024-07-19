import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Button,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/cartSlice";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Ionicons"; // Importing icons

const EStoreScreen = () => {
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

  const renderItem = ({ item }) => {
    const inCart = cart.find((cartItem) => cartItem.id === item.id);

    return (
      <View style={styles.productContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.cartControls}>
          {inCart ? (
            <>
              <TouchableOpacity
                onPress={() => dispatch(decrementQuantity(item))}
              >
                <Icon name="remove-circle-outline" size={30} color="red" />
              </TouchableOpacity>
              <Text>{inCart.quantity}</Text>
              <TouchableOpacity
                onPress={() => dispatch(incrementQuantity(item))}
              >
                <Icon name="add-circle-outline" size={30} color="green" />
              </TouchableOpacity>
            </>
          ) : (
            <Button
              title="Add to Cart"
              onPress={() => dispatch(addItem(item))}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to E-Store</Text>
      <DropDownPicker
        open={open}
        value={category}
        items={categories}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setCategories}
        style={styles.dropdown}
        placeholder="Select a category"
      />
      <View style={styles.switchContainer}>
        <Text>Best Seller</Text>
        <Switch
          value={bestSeller}
          onValueChange={(value) => setBestSeller(value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Free Shipment</Text>
        <Switch
          value={freeShipment}
          onValueChange={(value) => setFreeShipment(value)}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Icon name="cart-outline" size={20} color="white" />
          <Text style={styles.cartButtonText}>Go to Cart ({cart.length})</Text>
        </TouchableOpacity>
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
    marginVertical: 20,
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
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  cartButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
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
});

export default EStoreScreen;
