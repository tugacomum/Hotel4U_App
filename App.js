import * as React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import COLORS from './src/consts/colors';
import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';

const App = () => {
  // meter o AuthProvider depois de fazer o getProfile
  // <AuthProvider></AuthProvider>
  return (
    <>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
};

export default App;