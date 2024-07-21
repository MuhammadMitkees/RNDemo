import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import styled from "styled-components/native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useTheme } from "../Themes/ThemeContext";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.background};
`;
const Box = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 120;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.secondary};
  margin-bottom: 20px;
`;
const EmailTxt = styled.Text`
  color: ${(props) => props.theme.secondary};
  font-size: 16px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 20px;
`;
const Btn = styled.TouchableOpacity`
  padding: 12px 20px;
  margin-top: 20px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.primary};
`;
const Img = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin-top: 20px;
`;

const HomeScreen = () => {
  const { toggleTheme } = useTheme();
  const user = useSelector((state) => state.user);
  const opacity = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const signOutFn = () => {
    auth()
      .signOut()
      .then()
      .catch((err) => {
        console.log("error from signOut :", err);
      });
  };

  return (
    <Container>
      <Animated.View style={[animatedStyle, styles.container]}>
        <ThemeToggle toggleTheme={toggleTheme} />
        <Box>
          <Title>Welcome, User!</Title>
          <EmailTxt>Email: {user.email}</EmailTxt>
        </Box>
        {user?.photoURL && <Img source={{ uri: user?.photoURL }} />}
        <Btn onPress={() => navigation.navigate("EStore")}>
          <Text>E-commerce store</Text>
        </Btn>
        <Btn onPress={signOutFn}>
          <Text>Sign out</Text>
        </Btn>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default HomeScreen;
