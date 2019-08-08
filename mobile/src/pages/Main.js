import React, { useState } from 'react';
import { View, Platform, Image, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

import logo from '../assets/logo.png';



export default function Main() {

    return (
        <View style={styles.container} >
            <Text style={styles.txtName}>MAIN</Text>
        </View>
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

});