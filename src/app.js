import React, { Component } from 'react';
import { Text,  View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD2ubWSVq0PUclvjS30XDM-t6D2qSexmFo',
      authDomain: 'auth-d9f0f.firebaseapp.com',
      databaseURL: 'https://auth-d9f0f.firebaseio.com',
      storageBucket: 'auth-d9f0f.appspot.com',
      messagingSenderId: '288001321484'
    });

    //onAuthStateChanged is called whenever a user signin or sign out
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // User is signed in.
        this.setState({ loggedIn: true })
      } else { // User is signed out.
        this.setState({ loggedIn: false })
      }
    });
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
      case false:
        return <LoginForm />
      default:
        return <Spinner size='large' />
    }
  }

  render() {
    return (
      <View style={{ height: 110 }}>
        <Header headerText="authentication"/>
        {this.renderContent()}
      </View>
    );
  }
}
