import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import globalStyles from '../style/GlobalStyles'; 

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
    <View style={globalStyles.contenedor}>
      <Text style={globalStyles.titulo}>Configuración Wi-Fi</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Nombre de la red (SSID)"
        value={ssid}
        onChangeText={setSsid}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Conectar" onPress={conectar} color="#6200ee" />
    </View>
  );
};

export default ConfiguracionWiFi;