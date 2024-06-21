import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import LoginForm from "../../components/LoginForm/loginForm";
import HomeScreen from "../../Pages/HomeScreen";
import { ThemeProvider, useTheme } from "../../Themes/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import "react-native-gesture-handler";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
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
