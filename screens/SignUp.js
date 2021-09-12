import React from 'react'
import {StyleSheet, View, TextInput, Text, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import {isEmailValid, isPasswordValid} from '../utile/VerifyInputsFormat'
import {signUp} from '../API/mvp-district-API.js'
import { connect } from 'react-redux'



// screen where to login
class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        email: '',
        password: '',
        is_email_valid: true,
        is_password_valid: true,
        wait_connection: false
    }
  }

  _moveToLogIn = () => {
    this.props.navigation.navigate('Login')
  }

  _moveToMapGuesser = () => {
    this.props.navigation.navigate('MapGuesser')
  }

  _get_token(email, password){
    signUp(email, password)
    .then((response) => {
      console.log(response.status)
      if (response.status !== 200){
          // prompt status
          console.log('error not 200 status')
          this.setState({wait_connection: false})
      }
      else{
        response.json().then((data) => {
            // save token and go to mapguesser
            const action = {type: 'REFRESH_TOKEN', value: data.token}
            this.props.dispatch(action)
            this.setState({wait_connection: false})
            this._moveToMapGuesser()
            
        })
      }
    })
  }

  // Sign up with this email and password
  signUpUser = (email, password) => {
    try{
        this.setState({wait_connection: true})
        console.log('signing up '+email+password)
        // add api login
        this._get_token(email, password)
    }
    catch (error){
        console.log(error.toString())
        this.setState({wait_connection: false})
    }
  }


  // check if email is valid format xxx@xxx.xx
  verifyEmail(value){
    this.setState({is_email_valid: !isEmailValid(value)})
  }

  // check if password is long enought
  verifyPassword(value){
  this.setState({is_password_valid: isPasswordValid(value)})
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
                onChangeText={(value) => {this.setState({email: value})
                                          this.verifyEmail(value)}}
                //onEndEditing={() => this.verifyEmail()}
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
                onChangeText={(value) => {this.setState({password: value})
                                          this.verifyPassword(value)}}
                //onEndEditing={() => this.verifyPassword()}
                placeholder="password"
                //autoCompleteType="password"
                secureTextEntry={true}
            />
            {this.state.is_password_valid? null:
                <Text
                style={styles.invalidText}>
                    password must be at least 6 characters
                </Text>}
        </View>

        <TouchableOpacity
        onPress={() => this.signUpUser(this.state.email, this.state.password)}
        style={(this.state.is_password_valid & this.state.is_email_valid & 
            this.state.user != '' & this.state.password != '')?
            styles.signUpButtonOn:styles.signUpButtonOff}
        disabled={!(this.state.is_password_valid & this.state.is_email_valid & 
            this.state.email != '' & this.state.password != '')}>
            <Text
            style={styles.signUpText}>
                SignUp
            </Text>
        </TouchableOpacity>

        {this.state.wait_connection?
            <ActivityIndicator
            style={styles.ActivityIndicator}
            color='#000000'
            size='large'>
            </ActivityIndicator>
        : null}
        
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
    signUpButtonOn:{
        backgroundColor:'blue',
        width: Dimensions.get('window').width*0.4,
        padding: 10,
        borderRadius: 30,
        marginTop: 20
    },
    signUpButtonOff:{
        backgroundColor:'#dddddd',
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
    ActivityIndicator:{
        marginTop: 20
    },
});

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(SignUp)
