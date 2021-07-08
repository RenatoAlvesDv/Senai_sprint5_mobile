import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//importação da api
import api from '../services/api';

// importação icones
import { MaterialCommunityIcons } from '@expo/vector-icons';

// componente de classe p/ Historico
export default class Historico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Consulta: []
        }
    }

    // função para buscar na API o histórico de consultas realizadas e canceladas do usuário
    getHistorico = async () => {

        try {

            // constante para armazenar o valor do token
            const valorToken = await AsyncStorage.getItem('userToken');

            // constante para armazenar a resposta da requisição
            const resposta = await api.get('/consulta/minhas', {

                // autorização
                headers: {
                    'Authorization': 'Bearer ' + valorToken
                }
            })

            // atualiza o state da lista com a resposta da requisição
            this.setState({ consulta: resposta.data })

            // // exibe a resposta no app
            // console.warn(resposta)

            // //exibe a lista de consultas no app
            // console.warn(this.state.Historico)

        } catch (error) {

            // exibe o erro no dispositivo
            console.warn(error)

        }

    }

    // função que será solicitada assim que a tela for renderizada
    componentDidMount() {
        this.getHistorico();
    }

    // conteúdo a ser renderizado na tela Histórico
    render() {

        return (

            <View style={styles.contentConsulta}>

                <View style={styles.headerConsulta}>

                    <Text style={styles.title}>SPMG</Text>

                </View>

                <View style={styles.subTitleContent}>

                    <Text style={styles.subTitle}>
                        <MaterialCommunityIcons
                        name="history"
                        size={18}
                        color="#080F5A"
                        />
                        Histórico de consultas
                    </Text>

                    <View style={styles.mainHeaderLine} />

                </View>

                <ScrollView style={styles.mainBody}>

                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.Consulta}
                        keyExtractor={item => item.IdConsulta}
                        renderItem={this.renderItem}
                    />

                </ScrollView>

            </View>
        )
    }

    // conteudo renderizado dentro do flat list
    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                <Text style={styles.flatItemInfo}>Status: {(item.idStatusConsultaNavigation.descricaoStatusConsulta)}</Text>
                <Text style={styles.flatItemInfo}>Paciente: {(item.idPacienteNavigation.nomePaciente)}</Text>
                <Text style={styles.flatItemInfo}>Médico: {(item.idMedicoNavigation.nomeMedico)}</Text>
                <Text style={styles.flatItemInfo}>Especialidade: {(item.idMedicoNavigation.idEspecialidadeNavigation.descricaoEspecialidade)}</Text>
                <Text style={styles.flatItemInfo}>Data: {(item.dataConsulta)}</Text>
                <Text style={styles.flatItemInfo}>Horário: {(item.horarioConsulta)}</Text>
                <Text style={styles.flatItemInfo}>Descrição: {(item.descricaoAtendimento)}</Text>

            </View>

        </View>
    )

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
        backgroundColor: '#94D1FF'
    },

    title: {
        color: '#08db94',
        fontSize: 25,
       
        marginTop: 10,
        textDecorationLine: 'underline'
    },

    subTitleContent: {     
        justifyContent: 'center',
        height: '10%'
    },

    subTitle: {
        color: '#080F5A',
        fontSize: 18,
        paddingLeft: 30
    },

    mainHeaderLine: {
        width: 200,
        borderBottomColor: '#94D1FF',
        borderBottomWidth: 1,
        marginLeft: 30
    },    

    mainBody: {
     
    },

    mainBodyContent: {
        paddingTop: 5,
        paddingRight: 30,
        paddingLeft: 30
    },

    flatItemRow: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: '#080F5A',
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        shadowColor: "#F1F1F1",
        shadowRadius: 2
    },

    flatItemContainer: {
        flex: 1
    },

    flatItemInfo: {
        fontSize: 14,
        color: '#080F5A',
        lineHeight: 20,
        // fontFamily: 'Open Sans Light',
        paddingLeft: 10
    }

})