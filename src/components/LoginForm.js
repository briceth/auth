import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
 }

 onButtonPress() { //callack with firebase
   const { email, password } = this.state;
   this.setState({ error: '', loading: true })

   //ceci est une Promise donc on peut faire une autre asynchronne avec catch
   firebase.auth().signInWithEmailAndPassword(email, password)
     .then(this.onLoginSuccess.bind(this)) //because is called in the future
     .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
    });
 }

 onLoginFailed() {
   this.setState({
     error: 'Authenticated failed ! ',
     loading: false,
   });
 }

 onLoginSuccess() {
   this.setState({
     email: '',
     password: '',
     loading: false,
     error: ''
   });
 }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            secureTextEntry={false}
            placeholder="batman@gmail.com"
            label='Email'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry={true}
            placeholder="password"
            label='Password'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            />
        </CardSection>

        <Text style={styles.errorStyle}>{this.state.error}</Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles ={
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
