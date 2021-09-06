import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import MapGuesser from '../Components/MapGuesser.js'


const GlobalStackNavigaor = createStackNavigator({
  // Guess an adress on a map
  MapGuesser:{
    screen:MapGuesser,
    navigationOptions: {
      title:'MapGuesser'
    }
  },
});

export default createAppContainer(GlobalStackNavigaor)
