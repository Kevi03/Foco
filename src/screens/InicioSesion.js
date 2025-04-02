import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import globalStyles from '../style/GlobalStyles';

export default function InicioSesion({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const userList = [{ user: 'Kevin', pass: '123' }];

  const goIn = () => {
    const userFound = userList.some(({ user, pass }) => user === usuario && pass === password);
    if (userFound) {
      navigation.replace('PaginaPrincipal');
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
