import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import * as firebase from "firebase";

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      // currentUser: firebase.auth().currentUser.providerData[0]
    };
  }
  render() {
    return (
      <View>
        <Text>Profile</Text>
        {/* <Text>{this.state.currentUser.displayName}</Text> */}
        <TextInput placeholder="Enter SafeWord"></TextInput>
      </View>
    );
  }
}

export default ProfileScreen;
