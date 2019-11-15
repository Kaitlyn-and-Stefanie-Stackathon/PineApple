import React, { Component } from "react";
import { Button, StyleSheet, View, ImageBackground } from "react-native";
import styles from "../../public/styles";

// import { AppRegistry, Text, View, TextInput } from "react-native";

class HomeScreen extends Component {
  // static navigationOptions = {
  //   title: "PineApple"
  // };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        style={styles.title}
        source={require("../../public/BackGround.jpg")}
      >
        <View>
          <Button
            title="Go to Jane's profile"
            onPress={() => navigate("Profile", { name: "Jane" })}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default HomeScreen;
