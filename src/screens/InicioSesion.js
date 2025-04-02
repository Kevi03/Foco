import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

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
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder='Nombre De Usuario'
        maxLength={25}
        value={usuario}
        onChangeText={setUsuario}
      />
      
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        maxLength={20}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity onPress={goIn} style={styles.botonesContainer}>
        <Text style={styles.texto}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
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
  texto: {
    fontSize: 16,
    marginBottom: 10,
  },
  botonesContainer: {
    marginTop: 10,
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  espacioBotones: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
});