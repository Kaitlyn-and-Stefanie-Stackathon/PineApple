import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../../public/styles";
import * as firebase from "firebase";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.props.navigation.navigate("Profile");
        } else {
          this.props.navigation.navigate("Login");
        }
      }.bind(this)
    );
  }
  render() {
    <View style={styles.loginPage}>
      <ActivityIndicator size="large" />;
    </View>;
  }
}

export default LoadingScreen;
