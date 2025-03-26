import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ESP32IpContext } from './context/ESP32IpContext';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const { esp32Ip } = useContext(ESP32IpContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Simula un tiempo de carga y luego redirige
    const timer = setTimeout(() => {
      if (!esp32Ip) {
        navigation.replace('ConfiguracionWiFi');
      } else {
        navigation.replace('PaginaPrincipal');
      }
    }, 1500); // 1.5 segundos de "splash"

    return () => clearTimeout(timer);
  }, [esp32Ip]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
