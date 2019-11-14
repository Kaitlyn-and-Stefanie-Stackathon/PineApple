import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>Profile</Text>
        <TextInput placeholder="Enter SafeWord"></TextInput>
      </View>
    );
  }
}

export default ProfileScreen;
