import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WifiManager from 'react-native-wifi-reborn';
import { ESP32IpContext } from '../context/ESP32IpContext';
import globalStyles, { placeholderColor } from '../style/GlobalStyles'; 

const ConfiguracionWiFi = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const { setESP32Ip } = useContext(ESP32IpContext);
  const navigation = useNavigation();

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

    const success = await setESP32Ip(ipAddress);
    if (success) {
      Alert.alert('IP guardada', `Dirección IP ${ipAddress} guardada correctamente`, [
        { text: 'OK', onPress: () => navigation.replace('PaginaPrincipal') }
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
        placeholderTextColor={placeholderColor} 
        value={ssid}
        onChangeText={setSsid}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor={placeholderColor}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={globalStyles.botonPrimario}  onPress={conectar} >
      <Text style={globalStyles.textoBoton}>Conectarce</Text>
      </TouchableOpacity>

      <Text style={[globalStyles.titulo, { marginTop: 20 }]}>Configuración ESP32</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Dirección IP de la tablilla ESP32"
        placeholderTextColor={placeholderColor}
        value={ipAddress}
        onChangeText={setIpAddress}
        keyboardType="numeric"
      />

      <TouchableOpacity style={globalStyles.botonPrimario} onPress={guardarIp} >
        <Text style={globalStyles.textoBoton}>Guardar ip</Text>
        </TouchableOpacity>
      
    </View>
  );
};

export default ConfiguracionWiFi;
