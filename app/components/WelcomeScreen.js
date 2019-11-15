import React, { Component } from "react";
import { View, Text, TextInput, ImageBackground, Button } from "react-native";
import styles from "../../public/styles";

class WelcomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        style={styles.title}
        source={require("../../public/WelcomePhoto.jpg")}
      >
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
          ></Button>
        </View>
      </ImageBackground>
    );
  }
}

export default WelcomeScreen;
