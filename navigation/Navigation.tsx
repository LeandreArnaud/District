import MapGuesser from '../screens/mapGuesser/MapGuesser'
import Homepage from '../screens/Homepage';
import DistrictSelector from '../screens/mapGuesser/DistrictSelector'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyStack = ()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homepage" component={Homepage} options={{headerShown: false}}/>
      <Stack.Screen name="DistrictSelector" component={DistrictSelector} />
      <Stack.Screen name="MapGuesser" component={MapGuesser} />
    </Stack.Navigator>
  );
}

export default MyStack;
