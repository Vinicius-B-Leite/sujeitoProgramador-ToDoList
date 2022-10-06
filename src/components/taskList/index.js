import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TaskList({ data, deleteTask, update }) {
    console.log(data)
    return (
        <View style={style.conteiner}>

            <TouchableOpacity onPress={()=> deleteTask(data.item.id)}>
                <Feather name="trash-2" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableWithoutFeedback style={{margin: 10}} onPress={()=> update(data.item)}>
                <Text style={{ color: '#fff' }}>{data.item.nome}</Text>

            </TouchableWithoutFeedback>

        </View>
    );
}

const style = StyleSheet.create({
    conteiner: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4
    }
})