import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import firebase from '../../service/firabse/firebaseConection'

export default function Login({ changeStatus }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [type, setType] = useState('login')


    const login = () => {
        if (type === 'login') {
            const user = firebase.auth().signInWithEmailAndPassword(email, password).then(value => {
                changeStatus(value.user.uid)
            }).catch(erro => alert(erro))

        } else {
            const user = firebase.auth().createUserWithEmailAndPassword(email, password).then(value => {
                changeStatus(value.user.uid)
            }).catch(erro => alert(erro))
            firebase.database().ref('tarefas').update('')
        }
    }

    return (
        <SafeAreaView style={styles.conteiner}>
            <TextInput
                placeholder='Seu email'
                style={styles.input}
                value={email}
                onChangeText={txt => setEmail(txt)}
            />
            <TextInput
                placeholder='***'
                style={styles.input}
                value={password}
                onChangeText={txt => setPassword(txt)}
            />

            <TouchableOpacity style={styles.botao} onPress={login}>
                <Text style={{ color: '#fff', fontSize: 17 }}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setType(t => t === 'login' ? 'cadastrar' : 'login')}>
                <Text style={{ textAlign: 'center' }}>
                    {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#f2f6fc',
        paddingHorizontal: 10
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 45,
        padding: 10,
        borderWidth: 1,
        boderColor: '#141414'
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141414',
        height: 45,
        marginBottom: 10,
    }
})