import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// importação icones
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// componente de classe p/ Historico
export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            role: '',
            nomeMedico:'',
            nomePaciente:''
        };
    }

    // função para buscar no token o email e o tipo de usuário que está logado 
    buscarDadosStorage = async () => {

        try {

            const valorToken = await AsyncStorage.getItem('userToken');
            // console.warn(jwtDecode(valorToken));

            if (valorToken !== null) {

                this.setState({ email: jwtDecode(valorToken).email });
                this.setState({ role: jwtDecode(valorToken).role });
                this.setState({ nomePaciente: jwtDecode(valorToken).nomePaciente });
                this.setState({ nomeMedico: jwtDecode(valorToken).nomeMedico });
            }

        } catch (error) {

            console.warn(error);

        }
    }

    // função para realizar o logout 
    realizarLogout = async () => {

        try {

            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login');

        } catch (error) {

            console.warn(error);

        }

    }

    // função que será solicitada assim que a tela for renderizada
    componentDidMount() {
        this.buscarDadosStorage();
    }

    // conteúdo a ser renderizado na tela Perfil
    render() {

        return (

            <View style={styles.contentConsulta}>

                <View style={styles.headerConsulta}>

                    <Text style={styles.title}>SPMG</Text>

                </View>

                <View style={styles.subTitleContent}>

                    <Text style={styles.subTitle}>Perfil do usuário</Text>

                    <View style={styles.mainHeaderLine} />

                </View>

                <View style={styles.emailText}>

                    <FontAwesome5 name="hospital-user" size={30} color="#080F5A" />

                    {(this.state.role === "2" &&
                        <Text style={styles.textInfo}>Nome: {this.state.nomePaciente}</Text>                        
                    )}
                    {(this.state.role === "2" &&
                        <Text style={styles.textInfo}>Usuário: Paciente</Text>                        
                    )}

                    {(this.state.role === "3" &&
                        <Text style={styles.textInfo}>Nome: Dr.(a) {this.state.nomeMedico}</Text>
                    )}
                    {(this.state.role === "3" &&
                        <Text style={styles.textInfo}>Tipo de usuário: Médico</Text>
                    )}


                    <Text style={styles.textInfo}>Email: {this.state.email}</Text>
                    
                </View>

                <View>

                    <TouchableOpacity
                        style={styles.btnLogout}
                        onPress={this.realizarLogout}
                    >
                        <AntDesign name="logout" size={35} color="#080F5A" />
                    </TouchableOpacity>


                </View>

            </View>

        )

    }

}

// constante para guardar a estilização
const styles = StyleSheet.create({

    contentHistorico: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    headerHistorico: {
        // flex: .2,
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080F5A99'
    },

    title: {
        color: '#08db94',
        fontSize: 25,
        // fontWeight:600,
        marginTop: 10,
        textDecorationLine: 'underline'
    },

    subTitleContent: {
        // backgroundColor:'pink',       
        justifyContent: 'center',
        height: '10%',

    },

    subTitle: {
        color: '#080F5A',
        fontSize: 18,
        paddingLeft: 30,

    },

    mainHeaderLine: {
        width: 135,
        borderBottomColor: '#080F5A',
        borderBottomWidth: 1,
        marginLeft: 30
    },

    emailText: {

        borderWidth: 1.5,
        borderColor: '#080F5A',
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        shadowColor: "#F1F1F1",
        shadowRadius: 2,
        marginLeft: 30,
        padding: 10,
        width: '80%',
        justifyContent: 'center',
        // alignItems: 'center'
    },

    textInfo: {
        color: '#080F5A',
        fontSize: 14,
        marginTop: 5
    },

    btnLogout: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    }

});