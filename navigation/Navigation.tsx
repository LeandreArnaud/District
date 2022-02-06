import MapGuesser from '../screens/MapGuesser'
import Homepage from '../screens/Homepage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyStack = ()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="MapGuesser" component={MapGuesser} />
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  );
}

export default MyStack;
