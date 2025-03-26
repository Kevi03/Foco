import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaPrincipal from './src/screens/PaginaPrincipal';
import ConfiguracionWiFi from './src/screens/ConfiguracionWiFi';
import ControlFoco from './src/screens/ControlFoco';
import { ESP32IpProvider } from './src/context/ESP32IpContext';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

function AppWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('PaginaPrincipal');

  return (
    <ESP32IpProvider onReady={(hasIp) => {
      setIsLoading(false);
      setInitialRoute(hasIp ? 'PaginaPrincipal' : 'ConfiguracionWiFi');
    }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
            <Stack.Screen name="ConfiguracionWiFi" component={ConfiguracionWiFi} />
            <Stack.Screen name="ControlFoco" component={ControlFoco} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </ESP32IpProvider>
  );
}

export default AppWrapper;

