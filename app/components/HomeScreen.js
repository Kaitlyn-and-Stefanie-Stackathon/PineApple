import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ImageBackground
} from "react-native";
import Animated from "react-native-reanimated";
import * as firebase from "firebase";
import styles from "../../public/styles";
const HEADER_HEIGHT = 100;

function ItemList({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: firebase.auth().currentUser,
      safeWordList: [],
      word: ""
    };
  }

  addWord(word) {
    let wordObj = {
      word: word
    };
    this.state.safeWordList.push(wordObj);
    console.log("AFTER WORD OBJ IS PUSHED IN LIST", this.state.safeWordList);
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
            {/* INSERT THE LIST OF WORDS AND ACTIONS HERE */}
            <Text>hi</Text>
          </Animated.ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default HomeScreen;

/* REFERENCES
HEADER:
https://www.youtube.com/watch?v=JPx8IlfYQ-c
*/
