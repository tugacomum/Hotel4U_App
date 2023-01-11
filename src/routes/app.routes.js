import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';

import Home from '../views/app/HomeScreen';
import Details from '../views/app/DetailsScreen';
import Hotels from '../views/app/HotelsScreen';
import User from '../views/app/UserScreen';
import Favourite from '../views/app/FavouriteScreen'

import HotelTabBar from './HotelTabBar';

const Tab = createBottomTabNavigator();

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