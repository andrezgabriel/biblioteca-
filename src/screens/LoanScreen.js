import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Picker, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const LoanScreen = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchLoans();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsers(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/livros');
      setBooks(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/emprestimos');
      setLoans(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const makeLoan = async () => {
    if (selectedUser && selectedBook && date) {
      try {
        await axios.post('http://localhost:3000/emprestimos', {
          idLivro: selectedBook,
          idUsuario: selectedUser,
          dataDeEntrega: date.toISOString().split('T')[0]
        });
        fetchLoans();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View>
      <Picker
        selectedValue={selectedUser}
        onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}
      >
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.nome} value={user.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedBook}
        onValueChange={(itemValue, itemIndex) => setSelectedBook(itemValue)}
      >
        {books.map((book) => (
          <Picker.Item key={book.id} label={book.titulo} value={book.id} />
        ))}
      </Picker>
      <View>
        <Button onPress={showDatepicker} title="Escolher Data de Entrega" />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text>Data de Entrega: {date.toDateString()}</Text>
      </View>
      <Button title="Fazer Empréstimo" onPress={makeLoan} />
      <FlatList
        data={loans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Usuário: {item.usuario}</Text>
            <Text>Livro: {item.livro}</Text>
            <Text>Data de Entrega: {item.dataDeEntrega}</Text>
            <Text>Entrega Realizada: {item.entregaRealizada ? 'Sim' : 'Não'}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default LoanScreen;
