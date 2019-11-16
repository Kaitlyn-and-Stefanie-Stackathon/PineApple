import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import styles from "../../public/styles";
import * as firebase from "firebase";

import { Input, Item, Button, Label } from "native-base";

class LoginWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
      email: "",
      password: ""
    };
  }

  signUp(email, password) {
    try {
      if (this.state.password < 6) {
        alert("Please enter atleast 6 characters");
        return;
      }
      email = this.state.email;
      password = this.state.password;
      // username = this.state.username;
      firebase.auth().createUserWithEmailAndPassword(email, password);

      // firebase.auth().currentUser.providerData[0].displayName = username;
      // console.log("CURRENT USER", firebase.auth());

      this.props.navigation.navigate("Profile");
    } catch (error) {
      console.log(error.toString());
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        style={styles.title}
        source={require("../../public/PineAppleBackGround.jpg")}
      >
        <TouchableOpacity onPress={() => navigate("Welcome")}>
          <Image
            source={require("../../public/Arrow.png")}
            style={{ height: 40, width: 70, marginTop: 60, marginLeft: 15 }}
          ></Image>
        </TouchableOpacity>

        <View style={styles.loginPage}>
          {/* <View>
            <TextInput
              style={styles.inputBox}
              placeholder="Username"
              placeholderTextColor="#ffffff"
              onChangeText={username => this.setState({ username })}
            />
          </View> */}

          <Item floatingLabel>
            <Label> Email </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label> Password </Label>

            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>

          <Button
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
            <Text style={styles.sumbitBtnText}> Sign Up</Text>
          </Button>
        </View>

        {/* <Container style={styles.loginPage}>
          <Form>
            <Item floatingLabel>
              <Label> Username </Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={username => this.setState({ username })}
              />
            </Item>
            <Item floatingLabel>
              <Label> Email </Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
            </Item>

            <Item floatingLabel>
              <Label> Password </Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            <Button
              style={{ marginTop: 10 }}
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
              <Text style={{ color: "white" }}> Sign Up</Text>
            </Button>
          </Form>
        </Container> */}
      </ImageBackground>
    );
  }
}

export default LoginWithGoogle;
