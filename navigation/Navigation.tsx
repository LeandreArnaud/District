import MapGuesser from '../screens/mapGuesser/MapGuesser';
import Homepage from '../screens/homepage/Homepage';
import DistrictCreator from '../screens/homepage/DistrictCreator';
import Settings from '../screens/homepage/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import AboutPage from '../screens/homepage/AboutPage';

const Stack = createStackNavigator();

const MyStack = ()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homepage" component={Homepage} options={{headerShown: false}}/>
      <Stack.Screen name="MapGuesser" component={MapGuesser}  options={{headerShown: false}} />
      <Stack.Screen name="DistrictCreator" component={DistrictCreator} options={{headerShown: false}}/>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="AboutPage" component={AboutPage}/>
    </Stack.Navigator>
  );
}

export default MyStack;
