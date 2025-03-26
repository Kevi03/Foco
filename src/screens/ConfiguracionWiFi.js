import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import globalStyles from '../style/GlobalStyles';
import { ESP32IpContext } from '../context/ESP32IpContext';
import { useNavigation } from '@react-navigation/native';

const ConfiguracionWiFi = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const { setESP32Ip } = useContext(ESP32IpContext);
  const navigation = useNavigation();

  const isValidIP = (ip) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };

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

  const guardarIp = async () => {
    if (!ipAddress.trim()) {
      Alert.alert('Error', 'Por favor, ingresa una dirección IP');
      return;
    }

    if (!isValidIP(ipAddress)) {
      Alert.alert('Error', 'La dirección IP no tiene un formato válido (Ej: 192.168.1.1)');
      return;
    }

    const success = await setESP32Ip(ipAddress);
    if (success) {
      Alert.alert('IP guardada', `Dirección IP ${ipAddress} guardada correctamente`, [
        { text: 'OK', onPress: () => navigation.navigate('PaginaPrincipal') }
      ]);
    } else {
      Alert.alert('Error', 'No se pudo guardar la dirección IP');
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

      <Text style={[globalStyles.titulo, { marginTop: 20 }]}>Configuración ESP32</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Dirección IP de la tablilla ESP32"
        value={ipAddress}
        onChangeText={setIpAddress}
        keyboardType="numeric"
      />

      <Text style={{ color: 'gray', marginBottom: 10 }}>
        Ejemplo: 192.168.1.100
      </Text>

      <Button title="Guardar IP" onPress={guardarIp} color="#6200ee" />
    </View>
  );
};

export default ConfiguracionWiFi;
