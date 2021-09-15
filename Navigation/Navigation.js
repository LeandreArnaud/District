import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import MapGuesser from '../screens/MapGuesser.js'
import Login from '../screens/Login.js';
import SignUp from '../screens/SignUp.js';


const GlobalStackNavigaor = createStackNavigator({
  Login:{
    screen:Login,
    navigationOptions: {
      title:'Login',
      headerShown:false
    }
  },
  SignUp:{
    screen:SignUp,
    navigationOptions: {
      title:'SignUp'
    }
  },
  // Guess an adress on a map
  MapGuesser:{
    screen:MapGuesser,
    navigationOptions: {
      title:'MapGuesser'
    }
  },
});

export default createAppContainer(GlobalStackNavigaor)
