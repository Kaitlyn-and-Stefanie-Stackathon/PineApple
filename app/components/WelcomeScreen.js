import React, { Component } from "react";
import { View, Text, TextInput, ImageBackground } from "react-native";
import styles from "../../public/styles";
import { Button } from "native-base";
import firebase from "firebase";

// function signIn() {
//   // Sign into Firebase using popup auth & Google as the identity provider.
//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider);
// }

class WelcomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        style={styles.title}
        source={require("../../public/WelcomePhoto.jpg")}
      >
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
      </ImageBackground>
    );
  }
}

export default WelcomeScreen;
