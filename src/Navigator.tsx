import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from './auth/AuthContext';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    const authContext = useContext(AuthContext);
    const navigationRef = useNavigationContainerRef<any>();

    useEffect(() => {
        if(!authContext.authState.authenticated) {
            navigationRef.navigate('Login');
        }
    }, [authContext.authState]);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}