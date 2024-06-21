import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { setUser } from "../../Redux/userSlice";
import { useTheme } from "../../Themes/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import styled from "styled-components/native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
`;

const Input = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  margin-bottom: 15px;
  padding-horizontal: 10px;
  border-radius: 5px;
`;

const ErrorText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.error};
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.primary};
  padding-vertical: 15px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(setUser(values));
        navigation.navigate("Home");
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Container>
          <ThemeToggle />
          <Input
            placeholder="Name"
            placeholderTextColor={theme.text}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          {touched.name && errors.name && <ErrorText>{errors.name}</ErrorText>}

          <Input
            placeholder="Email"
            placeholderTextColor={theme.text}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && errors.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}

          <Input
            placeholder="Password"
            placeholderTextColor={theme.text}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}

          <Input
            placeholder="Confirm Password"
            placeholderTextColor={theme.text}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}

          <Input
            placeholder="Phone Number"
            placeholderTextColor={theme.text}
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            value={values.phone}
            keyboardType="phone-pad"
          />
          {touched.phone && errors.phone && (
            <ErrorText>{errors.phone}</ErrorText>
          )}

          <Button onPress={handleSubmit}>
            <ButtonText>Register</ButtonText>
          </Button>
        </Container>
      )}
    </Formik>
  );
};

export default LoginForm;
