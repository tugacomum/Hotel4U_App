import React, {useState} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import COLORS from './src/consts/colors';
import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;