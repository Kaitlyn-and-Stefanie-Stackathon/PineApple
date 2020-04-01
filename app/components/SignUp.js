import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import styles from "../../public/styles";
import * as firebase from "firebase";
import firebaseConfig from "../../secrets";

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
      email: "",
      password: ""
    };
  }

  async signUp(email, password) {
    try {
      if (this.state.password < 6) {
        alert("Please enter atleast 6 characters");
        return;
      }
      email = this.state.email;
      password = this.state.password;
      // username = this.state.username;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          // console.log(cred.user);
          firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid)
            .set({
              gmail: cred.user.email,
              profile_picture: `https://firebasestorage.googleapis.com/v0/b/pineappleproject-b05f4.appspot.com/o/images%2FNoUserIcon.png?alt=media&token=56e470a5-3657-4f38-9be6-a05c51dc03f4`, // might need to take out the token???
              locale: "en",
              first_name: null,
              last_name: null,
              created_at: Date.now(),
              uid: cred.user.uid
            });
          this.props.navigation.navigate("BottomNavWrapper");
        });
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

export default SignUp;
