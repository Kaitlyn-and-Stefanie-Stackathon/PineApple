import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from "react-navigation";
import ProfileScreen from "./app/components/ProfileScreen";
import WelcomeScreen from "./app/components/WelcomeScreen";
import Login from "./app/components/Login";
import SignUp from "./app/components/SignUp";

import * as firebase from "firebase";
//THIS GUY IS OUR SAVIOUR
//https://www.youtube.com/watch?v=KnwfK807Mgc&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=1
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCNFYABpAGemHb26SufVb8U3wc1bDQE_mM",
  authDomain: "pineappleproject-b05f4.firebaseapp.com",
  databaseURL: "https://pineappleproject-b05f4.firebaseio.com",
  projectId: "pineappleproject-b05f4",
  storageBucket: "pineappleproject-b05f4.appspot.com",
  messagingSenderId: "1092741347333",
  appId: "1:1092741347333:web:6868d63bf9e7d6c0e5046c",
  measurementId: "G-RMYN67EE0K"
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

const MainNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Profile: { screen: ProfileScreen },
  Login: { screen: Login },
  SignUp: { screen: SignUp }
});

const AppNavigator = createAppContainer(MainNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// // to add more styles, add more objects into the `sytle` variable. An example of this is 37:13 https://www.youtube.com/watch?v=mkualZPRZCs

// AppRegistry.registerComponent("pineapple", () => pineapple);
