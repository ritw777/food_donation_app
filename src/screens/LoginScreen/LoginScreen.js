import React, { useState } from 'react'
import { Input, Text, Button, ThemeProvider } from 'react-native-elements';
import firebase from '../../firestore.js';
import theme from "../GlobalStyles";
import { View, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen = ({ navigation }) => {

    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const emailHandler = (value) => {
        setemailAddress(value);
        console.log(emailAddress);
    }

    const passwordHandler = (value) => {
        setPassword(value);
        console.log(password);
    }

    const addToLocalStorage = async (value) => {
        try {
            await AsyncStorage.setItem('key', value)
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = () => {
        console.log('Button Pressed!!')
        firebase.auth().signInWithEmailAndPassword(emailAddress, password).then(() => {
            console.log("You are in !!");
            addToLocalStorage(emailAddress);
            navigation.navigate('BottomNav');
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log("This is the error : ", errorCode);
                var errorMessage = error.message;
                console.log(errorMessage);
                if (errorCode === "auth/invalid-email") {
                    setemailError(errorMessage);
                }
                else { setemailError('') }

                if (errorCode === "auth/wrong-password") {
                    setPasswordError(errorMessage);
                }
                else { setPasswordError('') }
            })
        
    }
    return (
        <View style={theme.appearanceContainer}>
            <StatusBar barStyle="light-content" backgroundColor='#101010' />
            <ThemeProvider theme={theme}>
                <View style={[theme.mainContainer, theme.mainContainer.center]}>

                    <Text style={theme.headerText}>Welcome{"\n"}Back !</Text>

                    <Input

                        placeholder=' Email Address'
                        onChangeText={(val) => { emailHandler(val) }}
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                        errorMessage={emailError}
                    />

                    <Input
                        placeholder=' Password'
                        secureTextEntry={true}
                        onChangeText={(val) => { passwordHandler(val) }}
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        errorMessage={passwordError}
                    />

                    <Button
                        title="LOG IN"
                        onPress={handleSubmit}
                    />


                    <Button
                        title="Bypass (DEV) "
                        onPress={() => navigation.navigate('BottomNav')}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Registeration')}>

                        <Text style={theme.centerText}>I'm new here</Text>

                    </TouchableOpacity>
                </View>
            </ThemeProvider>
        </View>
    )
}

export default LoginScreen;
