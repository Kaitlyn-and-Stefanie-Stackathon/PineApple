import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Image } from "react-native";
import Home from "./HomeScreen";
import Profile from "./Profile";
import Search from "./Search";
import Chat from "./ChatRoom";
import AllChats from "./AllChats";
import Login from "./Login";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import styles from "../../public/styles";

const ChatTab = createSwitchNavigator({
  Chat: { screen: Chat },
  AllChats: { screen: AllChats }
});

const ProfileTab = createSwitchNavigator({
  Profile: { screen: Profile },
  Login: { screen: Login }
});
const SearchTab = createSwitchNavigator({
  Search: { screen: Search },
  Chat: { screen: Chat }
});

const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require("../../public/homeIcon.png")}
            style={styles.bottomIcons}
          />
        )
      }
    },

    Search: {
      screen: SearchTab,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require("../../public/searchIcon.png")}
            style={styles.bottomIcons}
          />
        )
      }
    },
    Chat: {
      screen: ChatTab,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require("../../public/chatLogo.png")}
            style={styles.bottomIcons}
          />
        )
      }
    },
    Profile: {
      screen: ProfileTab,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require("../../public/profileLogo.png")}
            style={styles.bottomIcons}
          />
        )
      }
    }
  },
  {
    shifting: false,
    labeled: false,

    activeColor: "#000000",
    inactiveColor: "#404040",
    barStyle: {
      backgroundColor: "#F0F0F0"
    },
    initialRouteName: "Home",
    backBehavior: "none"
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

export default class BottomNavWrapper extends Component {
  render() {
    return <AppContainer />;
  }
}
