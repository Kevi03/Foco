import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaPrincipal from './src/screens/PaginaPrincipal';
import ConfiguracionWiFi from './src/screens/ConfiguracionWiFi';
import ControlFoco from './src/screens/ControlFoco';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PaginaPrincipal">
        <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
        <Stack.Screen name="ConfiguracionWiFi" component={ConfiguracionWiFi} />
        <Stack.Screen name="ControlFoco" component={ControlFoco} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
