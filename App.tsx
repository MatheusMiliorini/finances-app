import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from './Pages/MainPage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Categories from './Pages/Categories';
import Accounts from './Pages/Accounts';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors } }}>
      <Drawer.Navigator initialRouteName="Visão Geral">
        <Drawer.Screen name="Visão Geral" component={MainPage} />
        <Drawer.Screen name="Categorias" component={Categories} />
        <Drawer.Screen name="Contas" component={Accounts} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
