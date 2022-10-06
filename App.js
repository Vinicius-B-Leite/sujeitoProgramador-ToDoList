import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Login from './src/components/login';
import TaskList from './src/components/taskList';
import firebase from './src/service/firabse/firebaseConection'

export default function App() {
  const [user, setUser] = useState(null)
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef()

  const [task, setTask] = useState([])
  const [key, setKey] = useState('')

  const deleteTask = (id) => {
    firebase.database().ref('tarefas').child(user).child(id).remove()
    .then(()=>{
      const findTask = task.filter(item=> item.id !== id)
      setTask(findTask)
    })
  }
  const update = (data) => {
    setNewTask(data.nome)
    inputRef.current?.focus()
    setKey(data.id)
    
  }
  const addTask = () => {
    if (newTask === '') return

    if (key){
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      }).then(()=>{
        const index = task.findIndex(i => i.id === key)
        let taskClone = task
        taskClone[index] = newTask
        setTask([...taskClone]) 
      })
      return
    }

    let tarefa = firebase.database().ref('tarefas').child(user)
    let chave = tarefa.push().key

    tarefa.child(chave).set({
      nome: newTask,
    }).then(() => {
      setTask(oldTask => [...oldTask, { id: chave, nome: newTask }])
      Keyboard.dismiss()
      setNewTask('')
    })

  }

  useEffect(() => {
    const getTask = () => {
      if (!user) return

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTask([])

        snapshot?.forEach(item => {
          let data = {
            id: item.key,
            nome: item.val().nome
          }
          setTask(task => [...task, data])
        })

      })
    };

    getTask()
  }, [user])

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }


  return (
    <SafeAreaView style={styles.conteiner}>
      <View style={styles.conteinerTask}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder='Sua tarefa'
          value={newTask}
          onChangeText={txt => setNewTask(txt)}
        />
        <TouchableOpacity style={styles.botao} onPress={() => addTask()}>
          <Text style={{ color: '#fff', fontSize: 22 }}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={task}
        keyExtractor={item => item.id}
        renderItem={(item) => <TaskList update={update} deleteTask={deleteTask} data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc'
  },
  conteinerTask: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
  },
  botao: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 24,
    borderRadius: 4
  }
})