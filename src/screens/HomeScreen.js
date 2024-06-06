import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Cadastrar Usuários"
        onPress={() => navigation.navigate('Users')}
      />
      <Button
        title="Cadastrar Livros"
        onPress={() => navigation.navigate('Books')}
      />
      <Button
        title="Emprestar Livros"
        onPress={() => navigation.navigate('Loan')}
      />
    </View>
  );
};

export default HomeScreen;
