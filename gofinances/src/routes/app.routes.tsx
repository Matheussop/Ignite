import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components' 
import { MaterialIcons } from '@expo/vector-icons'
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();
 export default function AppRoutes() {
  const theme = useTheme();
  return (
      <Navigator
        tabBarOptions={{
          activeTintColor: theme.colors.secundary,
          inactiveTintColor: theme.colors.text,
          labelPosition: 'beside-icon',
          style: {
            paddingVertical: Platform.OS == 'ios' ? 20 : 0,
            height: 60
          }
        }}
      >
        <Screen name="Listagem" component={Dashboard} 
          options={{
            tabBarIcon: (({ size, color}) => (
              <MaterialIcons name="format-list-bulleted" color={color} size={size}/>
            ))
          }}
        />
        <Screen name="Register" component={Register} 
          options={{
            tabBarIcon: (({ size, color}) => (
              <MaterialIcons name="attach-money" color={color} size={size}/>
            ))
          }}
        />
        <Screen name="Resumo" component={Register} 
          options={{
            tabBarIcon: (({ size, color}) => (
              <MaterialIcons name="pie-chart" color={color} size={size}/>
            ))
          }}
        />
      </Navigator>
  );
}