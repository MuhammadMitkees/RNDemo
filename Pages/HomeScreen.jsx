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
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalColors } from "@/Themes/themes";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.background};
`;
const Box = styled.View`
  width: 250px;
  height: 250px;
  justify-content: center;
  align-items: center;
  background-color: ${globalColors.primary};
  border-radius: 5px;
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
const MapButton = styled.TouchableOpacity`
  background-color: ${globalColors.primary};
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  align-items: center;
`;

const HomeScreen = () => {
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
  return (
    <Container>
      <Animated.View style={[animatedStyle, styles.container]}>
        <ThemeToggle />
        <Box>
          <Title>Welcome, {user.name}!</Title>
          <Text>Email: {user.email}</Text>
          <Text>Phone: {user.phone}</Text>
        </Box>
        <MapButton onPress={() => navigation.navigate("Map")}>
          <Text> Go to Map</Text>
        </MapButton>
      </Animated.View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
