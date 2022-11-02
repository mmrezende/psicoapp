import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import { TextField } from './components/TextField';

import { API_URL } from '@env'; 

import { Error } from '../helpers/types'

interface Data {
    email: string;
    password: string;
}

export default function LoginScreen({ navigation }) {
    const { register, setValue, handleSubmit } = useForm();

    const [ errors, setErrors ] = useState<{[field: string]: Error}>({});

    useEffect(() => {
            register('email')
            register('password')
        }, [register]
    );

    const onSubmit = ({email, password} : Data) => {
        // axios.get("https://pcare.nextline.com.br")
        //     .then(() => Alert.alert(email, password))
        //     .catch(console.error)
        console.log(API_URL)
    };

    return(
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
                    onChangeText={(text) => setValue('email', text)}
                    error={errors?.email}
                />
                <TextField
                    label='Senha'
                    placeholder='Digite sua senha'
                    autoComplete='password'
                    secureTextEntry={true}
                    onChangeText={(text) => setValue('password', text)}
                    error={errors?.password}
                />
                <View style={styles.button}>
                    <Button 
                        title='Entrar'
                        onPress={handleSubmit(onSubmit)}
                    />
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
    },
    header: {
        marginTop: 50,
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
        marginTop: 8
    }
});