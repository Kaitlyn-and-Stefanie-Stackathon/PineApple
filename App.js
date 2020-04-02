import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
// import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import store from "./store";

import HomeScreen from "./app/components/HomeScreen";
import WelcomeScreen from "./app/components/WelcomeScreen";
import Login from "./app/components/Login";
import SignUp from "./app/components/SignUp";
import BottomNavWrapper from "./app/components/BottomNavWrapper";

//THIS GUY IS OUR SAVIOUR
//https://www.youtube.com/watch?v=KnwfK807Mgc&list=PLy9JCsy2u97m-xWAxGwHZ2vITtj4qBKDm&index=1
// Initialize Firebase

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const MainNavigator = createSwitchNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    SignUp: { screen: SignUp },
    Login: { screen: Login },
    BottomNavWrapper: { screen: BottomNavWrapper }
  },
  {
    backBehavior: "none"
  }
);

const AppNavigator = createAppContainer(MainNavigator);

// // to add more styles, add more objects into the `sytle` variable. An example of this is 37:13 https://www.youtube.com/watch?v=mkualZPRZCs

// AppRegistry.registerComponent("pineapple", () => pineapple);
