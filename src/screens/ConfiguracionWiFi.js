import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const ConfiguracionWiFi = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  const conectar = async () => {
    if (ssid === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa tanto el SSID como la contraseña');
      return;
    }

    try {
      await WifiManager.connectToProtectedSSID(ssid, password, false);
      Alert.alert('Conexión exitosa', `Conectado a ${ssid}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar a la red Wi-Fi. Verifica los datos ingresados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración Wi-Fi</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la red (SSID)"
        value={ssid}
        onChangeText={setSsid}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Conectar" onPress={conectar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
});

export default ConfiguracionWiFi;
