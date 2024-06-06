import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import axios from 'axios';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsers(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post('http://localhost:3000/usuarios', { nome: name, cpf: cpf });
      fetchUsers();
      setName('');
      setCpf('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <Button title="Adicionar Usuário" onPress={addUser} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.cpf}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UsersScreen;
