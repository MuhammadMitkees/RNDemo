import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { darkTheme, lightTheme } from "../../Themes/themes";
import GoogleSignInBtn from "../../components/GoogleSignInBtn/GoogleSignInBtn";
import auth from "@react-native-firebase/auth";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
const SignInBtn = styled.TouchableOpacity`
  align-items: "center";
  padding: 10px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.primary};
  width: 100%;
  margin-bottom: 5;
  align-items: center;
`;
const BtnTxt = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 16px;
`;
const Container = styled.View`
  flex: 1;
  /* justify-content: "center";
  align-items: "center"; */
  padding: 16px;
  background-color: ${(props) => props.theme.background};
`;
const ToggableTxt = styled.Text`
  color: ${(props) => props.theme.text};
`;
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const themeState = useSelector((state) => state.theme);
  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {})
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <Container themeState={themeState} style={styles.container}>
      <ThemeToggle />
      <View style={styles.marginDivider}></View>
      <ToggableTxt style={styles.title}>Sign In</ToggableTxt>
      <TextInput
        themeState={themeState}
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        themeState={themeState}
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <SignInBtn style={styles.SignInBtn} onPress={handleSignIn}>
        <BtnTxt themeState={themeState}>Sign In</BtnTxt>
      </SignInBtn>
      <SignInBtn onPress={navigateToSignUp}>
        <BtnTxt themeState={themeState}>Sign Up</BtnTxt>
      </SignInBtn>
      <ToggableTxt>OR</ToggableTxt>
      <GoogleSignInBtn />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: lightTheme.background,
  },
  SignInBtn: { marginVertical: 8 },
  marginDivider: {
    marginBottom: 150,
  },
});

export default SignIn;
