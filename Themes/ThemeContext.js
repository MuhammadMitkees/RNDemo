import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./themes";
import { useDispatch } from "react-redux";
import { toggleThemeSlice } from "../Redux/themeSlice";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(
    scheme === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
    dispatch(toggleThemeSlice());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
