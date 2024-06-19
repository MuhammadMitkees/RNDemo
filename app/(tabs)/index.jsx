// App.js
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import LoginForm from "../../components/LoginForm/loginForm";
import HomeScreen from "../../Pages/HomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

export default App;
