import MapGuesser from '../screens/mapGuesser/MapGuesser';
import Homepage from '../screens/Homepage';
import DistrictCreator from '../screens/mapGuesser/DistrictCreator';
import Settings from '../screens/Settings';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyStack = ()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homepage" component={Homepage} options={{headerShown: false}}/>
      <Stack.Screen name="MapGuesser" component={MapGuesser}  options={{headerShown: false}} />
      <Stack.Screen name="DistrictCreator" component={DistrictCreator} options={{headerShown: false}}/>
      <Stack.Screen name="Settings" component={Settings}/>
    </Stack.Navigator>
  );
}

export default MyStack;
