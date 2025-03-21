import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import * as Network from 'expo-network';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../style/GlobalStyles';

const PaginaPrincipal = () => {
  const [informacionRed, setInformacionRed] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerInformacionRed = async () => {
      const estado = await Network.getNetworkStateAsync();
      setInformacionRed(estado);
    };

    obtenerInformacionRed();
  }, []);

  return (
    <SafeAreaView style={globalStyles.contenedor}>
      <Text style={globalStyles.titulo}>Información de Conexión</Text>
      <View style={globalStyles.contenedorInformacionRed}>
        {informacionRed ? (
          <>
            <Text style={globalStyles.texto}>Tipo: {informacionRed.type}</Text>
            <Text style={globalStyles.texto}>Conectado: {informacionRed.isConnected ? 'Sí' : 'No'}</Text>
            {informacionRed.type === 'WIFI' && (
              <Text style={globalStyles.texto}>
                Nombre de la Red (SSID): {informacionRed.isConnected ? 'No disponible en Expo Go' : 'No conectado'}
              </Text>
            )}
          </>
        ) : (
          <Text style={globalStyles.texto}>Cargando...</Text>
        )}
      </View>
      
      <View style={globalStyles.botonesContainer}>
        <Button
          title="Conectarse manualmente"
          onPress={() => navigation.navigate('ConfiguracionWiFi')}
          color="#6200ee"
        />
        <View style={globalStyles.espacioBotones} />
        <Button
          title="Controlar foco"
          onPress={() => navigation.navigate('ControlFoco')}
          color="#6200ee"
        />
      </View>
    </SafeAreaView>
  );
};

export default PaginaPrincipal;