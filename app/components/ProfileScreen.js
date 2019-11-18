import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";
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
import * as firebase from "firebase";
import styles from "../../public/styles";

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: firebase.auth().currentUser,
      safeWordList: [],
      word: ""
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .update({
        safeWords: this.state.safeWordList
      })
      .then(() => {
        console.log("INSERTED SAFEWORDS INTO FIREBASE!");
      })
      .catch(error => {
        console.log(error);
      });
  }
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(this.props.navigation.navigate("Welcome"));
  }

  addWord(word) {
    let wordObj = {
      word: word
    };
    this.state.safeWordList.push(wordObj);
  }

  render() {
    // console.log("CURRENT USER", firebase.auth().currentUser);
    // console.log("SAFEWORD LIST", this.state.safeWordList);
    // console.log("WORDDDDSS>>>", this.state.word);

    const user = this.state.currentUser;

    return (
      <View style={styles.title}>
        <Text style={styles.textBoxes}>Welcome, {user["displayName"]}!</Text>
        <Text style={styles.textBoxesSmall}>
          What's a 'PineApple' you ask? It's a code word to get you out of a
          sticky situation. Need to get out of that weird awkward date? Say
          'PineApple', 'PreCalculus',
          'supercalifragilisticexpialidocious'...Anything! Just make it unique
          to you.
        </Text>
        <Text style={styles.textBoxesSmall}>
          You have {this.state.safeWordList.length} PineApples
        </Text>
        <View style={styles.list}>
          {this.state.safeWordList.map((word, idx) => {
            return (
              <View key={idx}>
                <Text>{word.word}</Text>
              </View>
            );
          })}
        </View>
        <Container style={styles.inputPineApples}>
          <Item floatingLabel>
            <Label> Enter SafeWord (ie 'PineApple') </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={word => this.setState({ word })}
            />
          </Item>

          <Button
            style={styles.sumbitBtn}
            full
            rounded
            success
            onPress={() => this.addWord(this.state.word)}
          >
            <Text style={styles.sumbitBtnText}>Add PineApple</Text>
          </Button>

          <Button
            style={styles.sumbitBtn}
            full
            rounded
            success
            onPress={() => this.props.navigation.navigate("Listen")}
          >
            <Text style={styles.sumbitBtnText}>Go to Listen Page</Text>
          </Button>
        </Container>

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
