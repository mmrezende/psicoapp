import { StyleSheet, Text, View, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamList } from '../App';

type props = NativeStackScreenProps<StackParamList, 'Login'>;

export default function LoginScreen({ navigation } : props) {
    return(
        <View style={styles.container}>
            <Button onPress={() => navigation.navigate('Home')} title="Login"/>
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