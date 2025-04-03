import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import globalStyles from '../style/GlobalStyles';
import { ESP32IpContext } from '../context/ESP32IpContext';

export default function InicioSesion({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { esp32Ip } = useContext(ESP32IpContext);
  
  const userList = [
    { user: 'Kevin', pass: '123' },
    { user: 'Cristian', pass: '456' }
  ];

  const goIn = () => {
    const userFound = userList.some(({ user, pass }) => user === usuario && pass === password);
    
    if (userFound) {
      if (esp32Ip) {
        navigation.replace('PaginaPrincipal');
      } else {
        navigation.replace('ConfiguracionWiFi');
      }
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Text style={globalStyles.titulo}>Iniciar Sesión</Text>
      
      <TextInput
        style={globalStyles.input}
        placeholder='Nombre De Usuario'
        maxLength={25}
        value={usuario}
        onChangeText={setUsuario}
      />
      
      <TextInput
        style={globalStyles.input}
        placeholder='Contraseña'
        maxLength={20}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Iniciar Sesión" onPress={goIn} color="#6200ee" />
    </View>
  );
}