import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { globalColors } from "../../Themes/themes";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { FIRESTORE_AUTH } from "../../firebaseConfig";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const GoogleSignInBtn = () => {
  const signInFn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          "641978767131-ahonnn2ce82c6rqaekeauvlsc514rcdr.apps.googleusercontent.com",
        offlineAccess: false,
      });
      // Check if your device supports Google Play
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("error occured SIGN_IN_CANCELLED");
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("error occured IN_PROGRESS");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        console.log(error);
        console.log("error occured unknow error");
      }
    }
  };
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signInFn}
    />
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: globalColors.primary,
    padding: 10,
    width: "100%",
    borderRadius: 4,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default GoogleSignInBtn;
