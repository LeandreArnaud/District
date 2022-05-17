import MapGuesser from '../pages/mapGuesser/MapGuesser';
import Homepage from '../pages/homepage/Homepage';
import DistrictCreator from '../pages/homepage/DistrictCreator';
import Settings from '../pages/homepage/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import AboutPage from '../pages/homepage/AboutPage';

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
