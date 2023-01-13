import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Easing } from "react-native-reanimated";

import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';

import Home from '../views/app/HomeScreen';
import Details from '../views/app/DetailsScreen';
import Hotels from '../views/app/HotelsScreen';
import User from '../views/app/UserScreen';
import Favourite from '../views/app/FavouriteScreen'

import HotelTabBar from './HotelTabBar';

const Tab = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThresshold: 0.01,
      restSpeedThreshold: 0.01,
  }
}

const closeConfig = {
  animation: 'timing',
  config: {
      duration: 200,
      easing: Easing.linear,
  }
}

export default function AppRoutes() {
    if (!AppLoading) {
        return <AppLoading />;
    }
    return (
        <>
        <StatusBar barStyle='dark-content' />
        <Tab.Navigator initialRouteName='HomeScreen' tabBar={props => <HotelTabBar {...props} />}>
          <Tab.Screen name="HomeScreen" component={Home} />
          <Tab.Screen name="ProfileScreen" component={User} />
          <Tab.Screen name="FavouriteScreen" component={Favourite} />
          <Tab.Screen name="DetailsScreen" component={Details} />
          <Tab.Screen name="HotelsScreen" component={Hotels} />
        </Tab.Navigator>
      </> 
    )
}