import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../Themes/ThemeContext";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import styled from "styled-components/native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  color: white;
  font-size: 20;
`;

const HomeScreen = () => {
  const user = useSelector((state) => state.user);
  const { theme } = useTheme();
  const opacity = useSharedValue(0);

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
  return (
    <Container>
      <ThemeToggle />
      <Animated.View style={[styles.box, animatedStyle]}>
        <Title>Welcome, {user.name}!</Title>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phone}</Text>
      </Animated.View>
    </Container>
  );
};
const styles = StyleSheet.create({
  box: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b5998",
    borderRadius: 5,
  },
});
export default HomeScreen;
