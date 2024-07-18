import React, { useEffect } from "react";
import { StyleSheet, Switch, View, useColorScheme } from "react-native";
import { useTheme } from "../../Themes/ThemeContext";
import { darkTheme } from "../../Themes/themes";
import { lightTheme } from "../../Themes/themes";
import styled from "styled-components/native";
import { useSelector } from "react-redux";

const SwitchText = styled.Text`
  color: ${(props) =>
    props.themeState === "dark" ? darkTheme.text : lightTheme.text};
`;
const ThemeToggle = (props) => {
  const themeState = useSelector((state) => state.theme);
  const { theme, toggleTheme } = useTheme();
  const scheme = useColorScheme();

  return (
    <View style={styles.container}>
      <SwitchText themeState={themeState}>
        {themeState === "dark" ? "dark mode" : "light mode"}
      </SwitchText>
      <Switch value={theme === darkTheme} onValueChange={toggleTheme} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
export default ThemeToggle;
