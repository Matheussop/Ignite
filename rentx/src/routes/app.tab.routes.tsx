import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from '../screens/Profile';
import { MyCars } from '../screens/MyCars';
import { StackAppRoutes } from './app.stack.routes';

import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import HomeSvg from '../assets/home.svg';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){
  const theme = useTheme();

  return(
    <Navigator   
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS == 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    
    >
      <Screen name="Home" component={StackAppRoutes}
       options={{
        tabBarIcon: ({ color, size}) => (
          <HomeSvg color={color} width={size} height={size} fill={color} />),
        }}
      />
      <Screen name="MyCars" component={MyCars}
       options={{
        tabBarIcon: ({ color, size }) => (
          <CarSvg   color={color} width={size} height={size} fill={color}/>),
        }}
      />
      <Screen name="Profile" component={Profile}
        options={{
        tabBarIcon: ({ color, size }) => (
          <PeopleSvg  color={color} width={size} height={size} fill={color}/>),
        }}
      />
    </Navigator>
  )
}