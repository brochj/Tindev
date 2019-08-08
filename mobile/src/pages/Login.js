import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Image, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';

import api from '../services/api';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            } 
        })
    }, [])

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { _id })
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
                    <Image source={logo} style={styles.contanier} />
                    <TextInput style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Digite seu usuário do Github'
                        placeholderTextColor='#999'
                        value={user}
                        onChangeText={setUser}
                    />
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonTxt}>Entrar</Text>
                    </TouchableOpacity>
        </KeyboardAvoidingView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
});