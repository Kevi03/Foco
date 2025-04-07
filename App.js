import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaPrincipal from './src/screens/PaginaPrincipal';
import ConfiguracionWiFi from './src/screens/ConfiguracionWiFi';
import ControlFoco from './src/screens/ControlFoco';
import InicioSesion from './src/screens/InicioSesion';
import { ESP32IpProvider } from './src/context/ESP32IpContext';
import globalStyles from './src/style/GlobalStyles';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ESP32IpProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="InicioSesion"
          screenOptions={{
            headerStyle: globalStyles.header,
            headerTitleStyle: globalStyles.headerTitle,
            headerTintColor: globalStyles.headerBackButton.color,
            cardStyle: globalStyles.card
          }}
        >
          <Stack.Screen 
            name="InicioSesion" 
            component={InicioSesion} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PaginaPrincipal" 
            component={PaginaPrincipal} 
            options={{ title: 'Página Principal' }}
          />
          <Stack.Screen 
            name="ConfiguracionWiFi" 
            component={ConfiguracionWiFi} 
            options={{ title: 'Configuración WiFi' }}
          />
          <Stack.Screen 
            name="ControlFoco" 
            component={ControlFoco} 
            options={{ title: 'Control de Foco' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ESP32IpProvider>
  );
}