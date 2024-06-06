import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import axios from 'axios';

const BooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/livros');
      setBooks(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const addBook = async () => {
    try {
      await axios.post('http://localhost:3000/livros', { titulo: title, anoPublicacao: parseInt(year) });
      fetchBooks();
      setTitle('');
      setYear('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Ano de Publicação" value={year} onChangeText={setYear} keyboardType="numeric" />
      <Button title="Adicionar Livro" onPress={addBook} />
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Text>{item.anoPublicacao}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BooksScreen;
