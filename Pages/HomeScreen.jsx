import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../Themes/ThemeContext";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import styled from "styled-components/native";

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
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.text};
`;

const HomeScreen = () => {
  const user = useSelector((state) => state.user);
  const { theme } = useTheme();

  return (
    <Container>
      <ThemeToggle />
      <Title>Welcome, {user.name}!</Title>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
    </Container>
  );
};

export default HomeScreen;
