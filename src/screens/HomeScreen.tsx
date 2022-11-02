import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../auth/AuthContext';

export default function HomeScreen() {
    const { authState } = useContext(AuthContext);
    
    return(
        <View style={styles.container}>
            <Text>Autenticado!</Text>
            <Text>{authState.user?.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});