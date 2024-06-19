import { StyleSheet, Text, View } from "react-native";
import LoginForm from "../../components/LoginForm/loginForm";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e9ecef",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
