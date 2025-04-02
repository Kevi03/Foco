import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import { ESP32IpContext } from '../context/ESP32IpContext';
import globalStyles from '../style/GlobalStyles'; 

const ConfiguracionWiFi = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const { setESP32Ip } = useContext(ESP32IpContext);

  const conectar = async () => {
    if (ssid === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa tanto el SSID como la contraseña');
      return;
    }

    try {
      await WifiManager.connectToProtectedSSID(ssid, password, false);
      Alert.alert('Conexión exitosa', `Conectado a ${ssid}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar a la red Wi-Fi');
    }
  };

  const guardarIp = async () => {
    if (!ipAddress.trim()) {
      Alert.alert('Error', 'Por favor, ingresa una dirección IP');
      return;
    }

    await setESP32Ip(ipAddress);
    Alert.alert('IP guardada', `Dirección IP ${ipAddress} guardada correctamente`);
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

      <Text style={[globalStyles.titulo, { marginTop: 20 }]}>Configuración ESP32</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Dirección IP de la tablilla ESP32"
        value={ipAddress}
        onChangeText={setIpAddress}
        keyboardType="numeric"
      />

      <Button title="Guardar IP" onPress={guardarIp} color="#6200ee" />
    </View>
  );
};

export default ConfiguracionWiFi;
