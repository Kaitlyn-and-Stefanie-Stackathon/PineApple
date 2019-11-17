import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as firebase from "firebase";
import styles from "../../public/styles";
// import console = require("console");

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      // currentUser: firebase.auth().currentUser.providerData[0],
      safeWord: []
    };
  }
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(this.props.navigation.navigate("Welcome"));
  }
  render() {
    console.log("CURRENT USER", this.state.currentUser);
    const user = this.state.currentUser;
    return (
      <View style={styles.title}>
        {/* <Text style={styles.textBoxes}>Welcome, {user.displayName}!</Text> */}
        <Text style={styles.textBoxesSmall}>
          What's a 'PineApple' you ask? It's a code word to get you out
          {"\n"} of a sticky situation.{"\n"}
          Need to get out of that{"\n"}weird awkward date?{"\n"}Say 'PineApple',
          'PreCalculus',{"\n"}
          'supercalifragilisticexpialidocious'{"\n"}...Anything! {"\n"}Just make
          it unique to you.
        </Text>
        <Text style={styles.textBoxesSmall}>
          You have {this.state.safeWord.length} PineApples
        </Text>
        <View style={styles.textBoxes}>
          <TextInput
            placeholder="Enter SafeWord"
            style={styles.inputBox}
          ></TextInput>
          {/* <Button
            style={styles.sumbitBtn}
            full
            rounded
            success
            onPress={() =>
              this.signUp(
                this.state.username,
                this.state.email,
                this.state.password
              )
            }
          >
            <Text style={styles.sumbitBtnText}>Add PineApple</Text>
          </Button> */}
        </View>
        <View>
          <Button
            title="sign out"
            onPress={() => {
              this.signOut();
            }}
          ></Button>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
