import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
// import store from "../store/index";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
});

const App = createAppContainer(MainNavigator);

export default App;

// export default class pineapple extends Component {
//   render() {
//     return (
//       <View store={store} style={styles.container}>
//         <Text>This is the App.js</Text>
//         <Component1 />
//       </View>
//     );
//   }
// }

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
