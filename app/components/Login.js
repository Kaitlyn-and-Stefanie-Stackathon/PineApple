import React, { Component } from "react";
import { View, Text, TextInput, ImageBackground, Button } from "react-native";
import styles from "../../public/styles";

class Login extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require("../../public/BackGround.jpg")}
      >
        <View>
          <Button title="Sumbit"></Button>
        </View>
      </ImageBackground>
    );
  }
}

export default Login;
