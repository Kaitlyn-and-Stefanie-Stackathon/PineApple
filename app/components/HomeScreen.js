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
import { firebaseApp } from "../../secrets";
const HEADER_HEIGHT = 100;

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: firebase.auth().currentUser,
      userData: null,
      safeWordList: [],
      word: ""
    };
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  componentDidMount() {
    this.getUserInfo();
  }

  addWord(word) {
    let wordObj = {
      word: word
    };
    this.state.safeWordList.push(wordObj);
    console.log("AFTER WORD OBJ IS PUSHED IN LIST", this.state.safeWordList);
  }
  getUserInfo() {
    let user = firebaseApp
      .firestore()
      .collection("users")
      .where("uid", "==", this.state.currentUser.uid)
      .get()
      .then(snapshot => {
        // snapshot.docs[0].data();
        this.setState({ userData: snapshot.docs[0].data() });
        return;
      });
  }

  render() {
    // console.log("I AM THE CURRENT USER BBBB>>>>", this.state.currentUser);

    // if (this.state.currentUser != null) {
    //   this.state.currentUser.providerData.forEach(function(profile) {
    //     console.log("Sign-in provider: " + profile.providerId);
    //     console.log("  Provider-specific UID: " + profile.uid);
    //     console.log("  Name: " + profile.displayName);
    //     console.log("  Email: " + profile.email);
    //     console.log("  Photo URL: " + profile.photoURL);
    //   });
    //   console.log("  Uid: " + this.state.currentUser.uid);
    // }
    console.log("STATE BABBYYYYY", this.state.userData);
    // const userData = await firebaseApp.firestore()
    //     .collection('users')
    //     .where('email', '==', newUser.email)
    //     .get();
    //   user = userData.docs[0].data();

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
          {/* <Image source={this.state.currentUser.}/> */}
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


https://firebase.google.com/docs/auth/web/manage-users
*/
