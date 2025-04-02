import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import PaginaPrincipal from './src/screens/PaginaPrincipal';
import ConfiguracionWiFi from './src/screens/ConfiguracionWiFi';
import ControlFoco from './src/screens/ControlFoco';
import InicioSesion from './src/screens/InicioSesion';
import { ESP32IpProvider } from './src/context/ESP32IpContext';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('InicioSesion');

  return (
    <ESP32IpProvider onReady={(hasIp) => {
      setInitialRoute(hasIp ? 'PaginaPrincipal' : 'ConfiguracionWiFi');
    }}>
      {initialRoute ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="InicioSesion" component={InicioSesion} />
            <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
            <Stack.Screen name="ConfiguracionWiFi" component={ConfiguracionWiFi} />
            <Stack.Screen name="ControlFoco" component={ControlFoco} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </ESP32IpProvider>
  );
}
