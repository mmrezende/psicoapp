
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, View, Image, Alert, Platform } from 'react-native';
import { TextField } from '../components/TextField';
import { Error, LoginData } from '../helpers/types'
import { AuthContext } from '../auth/AuthContext';
import { Spinner } from '../components/Spinner';
import { BinaryInput } from '../components/BinaryInput';
import { registerForPushNotificationsAsync, schedulePushNotification } from '../notifications';
import { Button, DefaultTheme, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [ errors, setErrors ] = useState<{[field: string]: Error}>(null);
    const [ remember, setRemember ] = useState<boolean>(false);
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        AsyncStorage
            .getItem('login')
            .then((cachedData) => {
                if(cachedData !== null){
                    handleSubmit(JSON.parse(cachedData))
                }
            });
    },[]);

    const handleSubmit = (data: LoginData) => {
        setLoading(true);
        setErrors(null);
        login(data, remember)
            .then(() => {
                registerForPushNotificationsAsync()
                    .then(() => schedulePushNotification());
            })
            .catch((err: AxiosError<LoginData>) => {
                if(err.code === 'ERR_NETWORK') {
                    Alert.alert("Erro no login", "Falha de conexão com o servidor");
                    return;
                }
                const fields = err.response?.data?.errors;
                setErrors(fields);
                console.log(err.toJSON());
            })
            .finally(() => setLoading(false))
    };

    return(
        loading ? 
            <Spinner/>
        :
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <Text style={styles.title}>PsicoApp</Text>
            </View> 
            <View style={styles.form}>
                <TextField
                    label='E-mail'
                    placeholder='Digite seu e-mail'
                    keyboardType='email-address'
                    autoComplete='email'
                    value={email}
                    onChangeText={setEmail}
                    error={errors !== null}
                    errorMessage={errors?.email}
                    theme={DefaultTheme}
                    autoCapitalize='none'
                />
                <TextField
                    label='Senha'
                    placeholder='Digite sua senha'
                    autoComplete='password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    error={errors !== null}
                    errorMessage={errors?.password}
                    theme={DefaultTheme}
                    autoCapitalize='none'
                />
                <BinaryInput
                    value={remember}
                    setValue={setRemember}
                    label="Lembrar de mim"
                />
                <View style={styles.button}>
                    <Button
                        onPress={() => handleSubmit({email, password})}
                        mode='contained'
                    >Entrar</Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    header: {
        marginTop: 48,
        marginBottom: 12,
        alignItems: 'center'
    },
    logo: {
        width: 96,
        height: 96
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        width: 256
    },
    button: {
        marginTop: 12,
        width: 120,
        alignSelf: 'center'
    }
});