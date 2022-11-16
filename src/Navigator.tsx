import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from './auth/AuthContext';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { LogoutButton } from './components/LogoutButton';
import FormScreen from './screens/FormScreen';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    const authContext = useContext(AuthContext);
    const navigationRef = useNavigationContainerRef<any>();

    useEffect(() => {
        if(!authContext.authState.authenticated) {
            navigationRef.navigate('Login');
        }else {
            navigationRef.navigate('Home');
        }
    }, [authContext.authState]);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerRight: LogoutButton}}>
                <Stack.Screen name="Login" component={LoginScreen}
                    options={{ headerRight: null}}/>
                <Stack.Screen name="Home" component={HomeScreen}
                    options={{ headerBackVisible: false }} />
                <Stack.Screen name="Form" options={{headerTitle: "Formulário"}} component={FormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}