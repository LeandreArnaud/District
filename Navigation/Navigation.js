import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import MapGuesser from '../screens/MapGuesser.tsx'
// import Login from '../screens/Login.js';
// import SignUp from '../screens/SignUp.js';


const GlobalStackNavigaor = createStackNavigator({
  // Guess an adress on a map
  MapGuesser:{
    screen:MapGuesser,
    navigationOptions: {
      title:'MapGuesser'
    }
  },
  // Login:{
  //   screen:Login,
  //   navigationOptions: {
  //     title:'Login',
  //     headerShown:false
  //   }
  // },
  // SignUp:{
  //   screen:SignUp,
  //   navigationOptions: {
  //     title:'SignUp'
  //   }
  // },
  
});

export default createAppContainer(GlobalStackNavigaor)
