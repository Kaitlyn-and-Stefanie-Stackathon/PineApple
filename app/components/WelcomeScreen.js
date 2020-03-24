import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import styles from "../../public/styles";
import { Button } from "native-base";
import firebase from "firebase";
import LottieView from "lottie-react-native";

// import console = require("console");

// function signIn() {
//   // Sign into Firebase using popup auth & Google as the identity provider.
//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider);
// }

class WelcomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, backgroundColor: "#93d1b8" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../public/Logo.png")} />
        </View>

        <LottieView
          source={require("../../public/People.json")}
          autoPlay
          loop
        />

        <View style={styles.logSignBtn}>
          <View>
            <Button
              style={styles.inputBox}
              full
              onPress={() => navigate("SignUp")}
            >
              <Text style={styles.sumbitBtnText}> Sign Up</Text>
            </Button>
          </View>

          <View>
            <Button
              style={styles.inputBox}
              full
              onPress={() => navigate("Login")}
            >
              <Text style={styles.sumbitBtnText}> Login</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;
