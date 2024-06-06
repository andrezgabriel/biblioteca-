import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import UsersScreen from './screens/UsersScreen';
import BooksScreen from './screens/BooksScreen';
import LoanScreen from './screens/LoanScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Books" component={BooksScreen} />
        <Stack.Screen name="Loan" component={LoanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;






