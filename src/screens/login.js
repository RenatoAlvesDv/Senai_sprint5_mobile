import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//importação da api
import api from '../services/api';

// componente de classe p/ Login
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'adm@spmg.com',
            senha: 'admim'
        }
    }

    // função para login    
    login = async () => {

        try {
            // // console para dispositivo
            // console.warn(this.state.email + ' ' + this.state.senha);

            // constante para armazenar a resposta da requisição
            const response = await api.post('/login', {

                // corpo da requisição
                email: this.state.email,
                senha: this.state.senha
            })

            // constante para receber o token da requisição
            const token = response.data.token
            // console.log(token)

            // console.warn(response)

            // AsyncStorage armazena o token na chave userToken 
            await AsyncStorage.setItem('userToken', token)

            // após realizar o login, navegará até a tela main
            this.props.navigation.navigate('Main')

        } catch (error) {

            console.warn(error)

        }

    }


    // conteúdo a ser renderizado na tela login
    render() {

        return (

            <ImageBackground
            source={require('../../assets/img/logo.png')}
                style={styles.absoluteFillObject}
                
            >
                <View style={styles.overlay} />

                <View style={styles.containerLogo}>
                
                    

                </View>

                <View style={styles.container}>

                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.title}>Acesse</Text>

                    <TextInput
                        autoCorrect={false}
                        style={styles.inputLogin}
                        placeholder='email'
                        placeholderTextColor='#00000'
                        keyboardType='email-address'
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        autoCorrect={false}
                        style={styles.inputLogin}
                        placeholder='senha'
                          placeholderTextColor='#00000'
                        secureTextEntry={true}
                        onChangeText={senha => this.setState({ senha })}
                    />

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this.login}
                    >
                      <Text style={styles.title}>Entra</Text>

                    </TouchableOpacity>

                </View>

            </ImageBackground>

        )
    }
}

// constante para guardar a estilização
const styles = StyleSheet.create({

    absoluteFillObject: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: .6,
        backgroundColor: '#94D1FF'
    },

    containerLogo: {
        flex: 1,
        justifyContent: 'flex-end',
       
        width: '%'
    },


    imgLogo: {
        width: 105,
        height: 112
    },

    container: {
        flex: 2,
        alignItems: 'center',
        width: '90%'
    },

    title: {
        color: '#FFF',
        fontSize: 25,
        marginBottom: 15
    },

    inputLogin: {
        backgroundColor: '#F6F4F4',
        opacity: .6,
        width: '90%',
        marginBottom: 15,
        padding: 10,
        fontSize: 17,
        borderRadius: 5,
    },

    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '90%',
        backgroundColor: '#A1F1F7',
        borderColor: '#08db94',
        borderRadius: 5,
        marginTop: 5
    }

})