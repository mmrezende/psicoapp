import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

export type StackParamList = {
	Home: undefined;
	Login: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
    </NavigationContainer>
  );
}
