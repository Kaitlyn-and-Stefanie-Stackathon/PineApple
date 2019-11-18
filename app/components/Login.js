import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import styles from "../../public/styles";
import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  // componentDidMount() {
  //   this.checkIfLoggedIn();
  // }
  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        // console.log("USERRR", user);
        if (user) {
          this.props.navigation.navigate("Profile");
        } else {
          this.props.navigation.navigate("SignUp");
        }
      }.bind(this)
    );
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
          console.log("firebaseUser", firebaseUser);

          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            // googleUser.getAuthResponse().id_token
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log("User Signed In");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref("users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
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
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "1092741347333-ib5cc70g5m8djcgk3kv1o64hnuoju28r.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        this.props.navigation.navigate("Profile"); // MIGHT BE A PROBLEM??

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.props.navigation.navigate("Profile"));
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
          <Item floatingLabel>
            <Label> Email </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email: email })}
            />
          </Item>

          <Item floatingLabel>
            <Label> Password </Label>

            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password: password })}
            />
          </Item>

          <Button
            style={styles.sumbitBtn}
            full
            rounded
            success
            onPress={() =>
              this.loginUser(this.state.email, this.state.password)
            }
          >
            <Text style={styles.sumbitBtnText}>Login</Text>
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: -450
          }}
        >
          <Button
            style={styles.sumbitBtn}
            full
            rounded
            success
            onPress={() => this.signInWithGoogleAsync()}
          >
            <Text style={styles.sumbitBtnText}>Sign In With Google</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default Login;
