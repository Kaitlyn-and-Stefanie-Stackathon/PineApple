import React, { Component } from "react";
import { View, Text, TextInput, ImageBackground, Button } from "react-native";
import styles from "../../public/styles";
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
              title="Sign Up"
              onPress={() => navigate("SignUp", { name: "Jane" })}
            ></Button>
          </View>

          <View>
            <Button
              title="Login"
              onPress={() => navigate("Login", { name: "Jane" })}
              // onPress={signIn()}
            ></Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeScreen;
