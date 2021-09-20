import React from 'react'
import {StyleSheet, View, TextInput, Text, ActivityIndicator, Dimensions, TouchableOpacity, Button} from 'react-native'
import {read_token, read_refresh_token} from '../API/mvp-district-API.js'
import { connect } from 'react-redux'



// screen where to login
class StartScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }


  

  try_app_token(){
    get_account_info(this.props.token)
    .then((data) => {
        // save accound info
        // move to main screen
    })
    .catch((error) => {
        this.is_phone_token()
    })
  }

  try_phone_token(token){
    get_account_info(token)
    .then((data) => {
        // save accound info
        // save phone token in app
        // move to main screen
    })
    .catch((error) => {
        this.is_app_RT()
    })
  }

  try_app_RT(){
    refresh_token(this.props.ref_token)
    .then((data) => {
        // save token in app and phone
        // save new RF in app and phone
        // get account info
        // move to main screen
    })
    .catch((error) => {
        this.is_phone_RT()
    })
  }

  try_phone_RT(RT){
    refresh_token(RT)
    .then((data) => {
        // save token in app and phone
        // save new RF in app and phone
        // get account info
        // move to main screen
    })
    .catch((error) => {
        // move to Login screen
    })
  }

  is_app_token(){
    if (this.props.token){
        this.try_app_token()
    }
    else{
        this.is_phone_token()
    }
  }

  is_phone_token(){
    read_token().then((data) => {
        if (data) {
            this.try_phone_token(data)
        }
        else{
            this.is_app_RT()
        }
    })
  }

  is_app_RT(){
    if (this.props.ref_token){
        this.try_app_RT()
    }
    else{
        this.is_phone_RT()
    }
  }

  is_phone_RT(){
    read_refresh_token().then((data) => {
        if (data) {
            this.try_phone_RT()
        }
        else{
            // move to Login screen
        }
    })
  }
  
  componentDidMount(){
      
  }

  render(){
    return(
      <View style={styles.container}>
        <View>
            <Text
            style={styles.text}>Coucou</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    text: {
        textAlign:'center'
    }
});


const mapStateToProps = (state) => {
    return {
        token: state.token,
        ref_token: state.ref_token
    }
}
export default connect(mapStateToProps)(StartScreen)
