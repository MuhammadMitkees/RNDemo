import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import LoginForm from "../../components/LoginForm/loginForm";
import HomeScreen from "../../Pages/HomeScreen";
import EStoreScreen from "../../Pages/EStore/EStoreScreen";
import MapScreen from "../../Pages/MapScreen/MapScreen";
import { ThemeProvider, useTheme } from "../../Themes/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import "react-native-gesture-handler";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import SignIn from "../../Pages/SignIn/SignIn";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";

import { setUser } from "../../Redux/userSlice";
import CartScreen from "../../Pages/CartScreen/CartScreen";
import Checkout from "../../Pages/CheckoutScreen/CheckoutScreen";
const Stack = createStackNavigator();
const InLayoutStack = createStackNavigator();
const AppNavigator = () => {
  const { theme } = useTheme();
  const [indexUser, setIndexUser] = useState(null);
  const dispatch = useDispatch();
  function onAuthStateChanged(user) {
    setIndexUser(user?._user);
    dispatch(setUser(user?._user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  // if (initializing) return null;
  return (
    <StyledThemeProvider theme={theme}>
      {indexUser ? (
        <InLayoutStack.Navigator initialRouteName="Home">
          <InLayoutStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <InLayoutStack.Screen
            name="EStore"
            component={EStoreScreen}
            options={{ headerShown: false }}
          />
          <InLayoutStack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <InLayoutStack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <InLayoutStack.Screen name="Map" component={MapScreen} />
        </InLayoutStack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignUp"
            component={LoginForm}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </StyledThemeProvider>
  );
};

const AppWithoutAnimation = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};
const App = gestureHandlerRootHOC(() => <AppWithoutAnimation />);

export default App;
