import React from 'react'
import {StyleSheet, View, TextInput, Text, Button, Dimensions, TouchableOpacity} from 'react-native'
import config from "../config.json"
import * as firebase from 'firebase';
//import { TouchableOpacity } from 'react-native-gesture-handler';

//init firebase
const firebaseConfig = {
    apiKey: config.firebaseConfig.apiKey,
    authDomain: config.firebaseConfig.authDomain,
    projectId: config.firebaseConfig.projectId,
    storageBucket: config.firebaseConfig.storageBucket,
    messagingSenderId: config.firebaseConfig.messagingSenderId,
    appId: config.firebaseConfig.appId

}
try{
    firebase.initializeApp(firebaseConfig);
}
catch (error){
    console.log(error.toString())
}

// screen where to login
class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        email: '',
        password: '',
        is_email_valid: true,
        is_password_valid: true,
        uid: false
    }
  }

  _moveToLogIn = () => {
    if (this.state.uid){
        this.props.navigation.navigate('Login')
    }
  }

  // Sign up with this email and password
  signUpUser = (email, password) => {
    try{
        console.log('signing up '+email+password)
        this.verifyEmail()
        this.verifyPassword()
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {this.setState({uid: userCredential.user.uid})})
        .then(() => this._moveToLogIn())
    }
    catch (error){
        console.log(error.toString())
    }
  }


  // check if email is valid format xxx@xxx.xx
  verifyEmail(){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = this.state.email;
      if (!re.test(String(email))){
        this.setState({is_email_valid: false})
        return(true)
      }
      else{
        this.setState({is_email_valid: true})
        return(false)
      }
  }

  // check if password is long enought
  verifyPassword(){
    const password = this.state.password;
    if (password.length < 6){
      this.setState({is_password_valid: false})
      return(true)
    }
    else{
      this.setState({is_password_valid: true})
      return(false)
    }
}

  render(){
    return(
      <View style={styles.container}>
        <View>
            <Text
            style={styles.inputTextTitle}>
                email:
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={(value) => this.setState({email: value})}
                onEndEditing={() => this.verifyEmail()}
                placeholder="exemple@exemple.com"
                //autoCompleteType="email"
                keyboardType="email-address"
                autoFocus={true}
            />
            {this.state.is_email_valid? null:
                <Text
                style={styles.invalidText}>
                    email must be valid format
                </Text>}
        </View>
        
        <View>
            <Text
            style={styles.inputTextTitle}>
                password:
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={(value) => this.setState({password: value})}
                onEndEditing={() => this.verifyPassword()}
                placeholder="password"
                //autoCompleteType="password"
                secureTextEntry={true}
            />
            {this.state.is_password_valid? null:
                <Text
                style={styles.invalidText}>
                    password must be at least 8 characters
                </Text>}
        </View>

        <TouchableOpacity
        onPress={() => this.signUpUser(this.state.email, this.state.password)}
        style={styles.signUpButton}>
            <Text
            style={styles.signUpText}>
                SignUp
            </Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        },
    inputTextTitle: {
        backgroundColor: '#ffffff',
        margin: 2,
    },
    inputText:{
        backgroundColor: '#eeeeee',
        marginBottom: 10,
        width: Dimensions.get('window').width*0.8,
        borderRadius: 30,
        paddingHorizontal: 15,
    },
    invalidText:{
        color: 'red'
    },
    signUpButton:{
        backgroundColor:'blue',
        width: Dimensions.get('window').width*0.4,
        padding: 10,
        borderRadius: 30,
        marginTop: 20
    },
    signUpText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 15
    },
});

export default SignUp
