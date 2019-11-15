import React, { Component } from "react";
import { Button, StyleSheet, View, ImageBackground } from "react-native";
import { BackGround } from "../../public/BackGround.jpg";

// import { AppRegistry, Text, View, TextInput } from "react-native";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "PineApple"
  };
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

const styles = StyleSheet.create({
  title: {
    // backgroundColor: "#F9EBA5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
  // button: {
  //   backgroundColor: "#2D898B",
  //   fontSize: 40,
  //   fontWeight: "bold"
  // },
});

export default HomeScreen;
