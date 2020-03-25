import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button
} from "react-native";
import styles from "../../public/styles";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";

// import {
//   Container,
//   Content,
//   Header,
//   Form,
//   Input,
//   Item,
//   Button,
//   Label
// } from "native-base";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log("User logged in", result);
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        iosClientId:
          "1092741347333-rssnm81e0uqv1cl2d7g6aal7s7kntigb.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.props.navigation.navigate("BottomNavWrapper");
        } else {
          this.props.navigation.navigate("Login"); // IF YOU CHANGE THIS TO "WELCOME", IT WILL ALWAYS STAY IN WELCOME SCREEN
        }
      }.bind(this)
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.loginPage}>
        <Text>LOGGIN PAGE</Text>
        <Button
          title="SIGN IN WITH GOOGLE"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}

export default Login;

/*
{/* <View style={styles.loginPage}>
          <ActivityIndicator size="large" />
        </View> */

/*{/* <Container style={styles.loginPage}>
          <Form>
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
                this.loginUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ color: "white" }}> Login</Text>
            </Button>
          </Form>
        </Container> */
