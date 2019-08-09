import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, View, Platform, Image, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

import logo from '../assets/logo.png';
import likeIMG from '../assets/like.png';
import dislikeIMG from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

import api from '../services/api';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id
                }
            });
            console.log(response.data);
            setUsers(response.data)
        }

        loadUsers();
    }, [id]);

    // Conectar backend atraves do socket
    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: id }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        });
    }, [id])

    async function handleLike() {
        const [user, ...rest] = users;

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id }
        });

        setUsers(rest);
    }
    async function handleDislike() {
        const [user, ...rest] = users;

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id }
        });

        setUsers(rest);
    }

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.cardContainer}>
                {users.length === 0
                    ? <Text style={styles.empty}>Acabou :(</Text>
                    : (
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]} >
                                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                    )}

            </View>
            {users.length > 0 && (
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislikeIMG} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={likeIMG} />
                    </TouchableOpacity>

                </View>
            )}

            {matchDev && (
                <View style={styles.matchContainer} >
                    <Image style={styles.matchImg} source={itsamatch} />
                    <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />
                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>
                    <TouchableOpacity onPress={() => { setMatchDev(false) }} style={styles.txtName}>
                        <Text style={styles.closeMatch}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        marginTop: 30
    },
    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },
    avatar: {
        flex: 1,
        height: 300,
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },

    buttons: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 }
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    matchContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,


    },
    matchImg:{
        height: 60,
        resizeMode: 'contain',
    },
    matchAvatar:{
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
    },
    matchName:{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
    },
    matchBio:{
        marginTop: 10,
          fontSize: 16,
          color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
          lineHeight: 24,
          paddingHorizontal: 30,

    },
    closeMatch:{
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
          marginTop: 30,
          fontWeight: 'bold'
        
    },
});
