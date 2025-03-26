import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import * as Network from 'expo-network';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../style/GlobalStyles';
import { ESP32IpContext } from '../context/ESP32IpContext';

const PaginaPrincipal = () => {
  const [informacionRed, setInformacionRed] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { esp32Ip } = useContext(ESP32IpContext);

  useEffect(() => {
    const obtenerInformacionRed = async () => {
      try {
        setLoading(true);
        const estado = await Network.getNetworkStateAsync();
        setInformacionRed(estado);
      } catch (error) {
        console.error("Error obteniendo estado de red:", error);
        setInformacionRed({
          type: 'desconocido',
          isConnected: false
        });
      } finally {
        setLoading(false);
      }
    };

    obtenerInformacionRed();
  }, []);

  const renderNetworkInfo = () => {
    if (loading) {
      return (
        <View style={globalStyles.contenedorCarga}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={globalStyles.textoCarga}>Obteniendo información de red...</Text>
        </View>
      );
    }

    return (
      <>
        <Text style={globalStyles.texto}>
          Tipo de conexión: {informacionRed?.type || 'Desconocido'}
        </Text>
        <Text style={globalStyles.texto}>
          Estado: {informacionRed?.isConnected ? (
            <Text style={{ color: 'green' }}>Conectado</Text>
          ) : (
            <Text style={{ color: 'red' }}>Desconectado</Text>
          )}
        </Text>
        <Text style={globalStyles.texto}>
          IP ESP32: {esp32Ip ? (
            <Text style={{ color: '#6200ee' }}>{esp32Ip}</Text>
          ) : (
            <Text style={{ color: 'orange' }}>No configurada</Text>
          )}
        </Text>
      </>
    );
  };

  return (
    <SafeAreaView style={globalStyles.contenedor}>
      <Text style={globalStyles.titulo}>Información de Conexión</Text>
      
      <View style={globalStyles.contenedorInformacionRed}>
        {renderNetworkInfo()}
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
          disabled={!esp32Ip}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaginaPrincipal;