
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TextField } from '../components/TextField';
import { Error, LoginData } from '../helpers/types'
import { AuthContext } from '../auth/AuthContext';
import { Spinner } from '../components/Spinner';
import { registerForPushNotificationsAsync, schedulePushNotification } from '../notifications';
import { Button } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);

    const { register, setValue, getValues, handleSubmit } = useForm({shouldUnregister: true});
    const [ errors, setErrors ] = useState<{[field: string]: Error}>(null);
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
            register('email')
            register('password')
        }, [register]
    );

    const onSubmit = (data: LoginData) => {
        setLoading(true);
        setErrors(null);
        login(data)
            .then(() => {
                registerForPushNotificationsAsync()
                    .then(() => schedulePushNotification());
            })
            .catch((err) => {
                const fields = err.response?.data?.errors;
                setErrors(fields);
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
                    value={getValues('email')}
                    onChangeText={(text) => setValue('email', text)}
                    error={errors !== null}
                    errorMessage={errors?.email}
                />
                <TextField
                    label='Senha'
                    placeholder='Digite sua senha'
                    autoComplete='password'
                    secureTextEntry={true}
                    onChangeText={(text) => setValue('password', text)}
                    error={errors !== null}
                    errorMessage={errors?.password}
                />
                <View style={styles.button}>
                    <Button
                        onPress={handleSubmit(onSubmit)}
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
        width: 128,
        height: 128
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