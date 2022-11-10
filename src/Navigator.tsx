import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from './auth/AuthContext';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { LogoutButton } from './components/LogoutButton';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    const authContext = useContext(AuthContext);
    const navigationRef = useNavigationContainerRef<any>();

    useEffect(() => {
        if(!authContext.authState.authenticated) {
            authContext.logout();
            navigationRef.navigate('Login');
        }
    }, [authContext.authState]);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerRight: LogoutButton}}>
                <Stack.Screen name="Login" component={LoginScreen}
                    options={{ headerRight: null}}/>
                <Stack.Screen name="Home" component={HomeScreen}
                    options={{ headerBackVisible: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}