import React, { Component } from "react";
import { View, Text, Image, ImageBackground, Button } from "react-native";
import Animated from "react-native-reanimated";
import firebase from "firebase";
import styles from "../../public/styles";

const HEADER_HEIGHT = 100;

class Profile extends Component {
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert("SIGN-OUT SUCCESS!!");
      })
      .catch(function(error) {
        alert("ERROR SIGNING OUT!");
      });
  }
  render() {
    const scrollY = new Animated.Value(0);
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
    const headerY = Animated.interpolate(diffClampScrollY, {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT]
    });
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            height: HEADER_HEIGHT,
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: "#F0F0F0",
            zIndex: 1000,
            transform: [{ translateY: headerY }],
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 40
          }}
        >
          <Image
            source={require("../../public/small.png")}
            style={{ height: 50, width: 50 }}
          />
        </Animated.View>
        <ImageBackground
          source={require("../../public/PineAppleBackGround.jpg")}
          style={{ flex: 1 }}
        >
          <Animated.ScrollView
            bounces={false}
            scrollEventThrottle={16}
            style={{ paddingTop: HEADER_HEIGHT }}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { y: scrollY } }
              }
            ])}
          >
            {/* INSERT INFO ABOUT USER HERE */}
            <Text>hi</Text>
            <Button
              title="SIGN OUT"
              onPress={() => (
                this.signOut(), this.props.navigation.navigate("Welcome")
              )}
            ></Button>
          </Animated.ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default Profile;
