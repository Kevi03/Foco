import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import * as Network from 'expo-network';
import { useNavigation } from '@react-navigation/native';

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
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Información de Conexión</Text>
      <View style={styles.contenedorInformacionRed}>
        {informacionRed ? (
          <>
            <Text style={styles.texto}>Tipo: {informacionRed.type}</Text>
            <Text style={styles.texto}>Conectado: {informacionRed.isConnected ? 'Sí' : 'No'}</Text>
            {informacionRed.type === 'WIFI' && (
              <Text style={styles.texto}>
                Nombre de la Red (SSID): {informacionRed.isConnected ? 'No disponible en Expo Go' : 'No conectado'}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.texto}>Cargando...</Text>
        )}
      </View>
      
      <Button
        title="Conectarse manualmente"
        onPress={() => navigation.navigate('ConfiguracionWiFi')}
      />

      <Button
        title="Controlar foco"
        onPress={() => navigation.navigate('ControlFoco')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  contenedorInformacionRed: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  texto: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default PaginaPrincipal;
