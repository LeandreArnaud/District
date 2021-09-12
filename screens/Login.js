import React from 'react'
import {StyleSheet, View, TextInput, Text, ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native'
import {isEmailValid, isPasswordValid} from '../utile/VerifyInputsFormat'
import {get_token} from '../API/mvp-district-API.js'
import { connect } from 'react-redux'







// screen where to login
class Login extends React.Component{
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
  

  _moveToMapGuesser = () => {
    this.props.navigation.navigate('MapGuesser')
  }

  _moveToSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }


  _get_token(email, password){
    get_token(email, password)
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

  // Login with email and passsword
  logInUser = (email, password) => {
    try{
        // TODO: check token and move to map guesser if valid
        if (this.props.token){
            this._moveToMapGuesser()
        }
        else{
            this.setState({wait_connection: true})
            console.log('login up'+email+'...')
            // call api to get token
            this._get_token(email, password)
        }
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
                //autoFocus={true}
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
        onPress={() => this.logInUser(this.state.email, this.state.password)}
        style={(this.state.is_password_valid & this.state.is_email_valid & 
            this.state.email != '' & this.state.password != '')?
            styles.logInButtonOn:styles.logInButtonOff}
        disabled={!(this.state.is_password_valid & this.state.is_email_valid & 
            this.state.email != '' & this.state.password != '')}>
            <Text
            style={styles.logInText}>
                Login
            </Text>
        </TouchableOpacity>
            
        
        {this.state.wait_connection?
            <ActivityIndicator
            style={styles.ActivityIndicator}
            color='#000000'
            size='large'>
            </ActivityIndicator>
        : null}

        {this.props.token?
            <Text style={styles.ActivityIndicator}>Connected !</Text>
        : null}

        <TouchableOpacity
        onPress={() => this._moveToSignUp()}
        style={styles.SignUpButton}>
            <Text style={styles.SignUpText}>
                No accound yet? please 
                <Text style={styles.BoldSignUpText}> SignUp</Text>
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
    logInButtonOn:{
        backgroundColor:'green',
        width: Dimensions.get('window').width*0.4,
        padding: 10,
        borderRadius: 30,
        marginTop: 20
    },
    logInButtonOff:{
        backgroundColor:'#dddddd',
        width: Dimensions.get('window').width*0.4,
        padding: 10,
        borderRadius: 30,
        marginTop: 20
    },
    logInText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 15
    },
    ActivityIndicator:{
        marginTop: 20
    },
    SignUpButton:{
        marginTop: 50
    },
    SignUpText:{
    },
    BoldSignUpText:{
        fontWeight: 'bold',
        color: 'blue'
    }
});

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(Login)
