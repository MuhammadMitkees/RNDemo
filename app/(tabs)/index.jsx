import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import LoginForm from "../../components/LoginForm/loginForm";
import HomeScreen from "../../Pages/HomeScreen";
import MapScreen from "../../Pages/MapScreen/MapScreen";
import { ThemeProvider, useTheme } from "../../Themes/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import "react-native-gesture-handler";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import SignIn from "../../Pages/SignIn/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { FIRESTORE_AUTH } from "@/firebaseConfig";
import "expo-dev-client";
const Stack = createStackNavigator();
const InLayoutStack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();
  const [user, setuser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIRESTORE_AUTH, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
  }, []);
  return (
    <StyledThemeProvider theme={theme}>
      {user ? (
        <InLayoutStack.Navigator initialRouteName="Home">
          <InLayoutStack.Screen
            name="Home"
            component={HomeScreen}
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
