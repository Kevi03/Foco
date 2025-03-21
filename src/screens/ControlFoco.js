import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import WebSocket from 'websocket';
import { useNavigation } from '@react-navigation/native';

const imagenApagado = require('../../assets/focoApagado.jpg');
const imagenPrendido = require('../../assets/focoPrendido.jpg');

const socket = new WebSocket.w3cwebsocket('ws://<IP_DEL_ESP32>:<PUERTO>');

const ControlFoco = () => {
  const [estaConectado, setEstaConectado] = useState(false);
  const [ws, setWs] = useState(null);
  const [hayError, setHayError] = useState(false);
  const [imagen, setImagen] = useState(imagenApagado);
  const navigation = useNavigation();

  useEffect(() => {
    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
      setEstaConectado(true);
      setHayError(false);
      setWs(socket);
    };

    socket.onerror = () => {
      console.log('Error de conexión WebSocket');
      setEstaConectado(false);
      setHayError(true);
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
      setEstaConectado(false);
      setHayError(true);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const manejarPresionImagen = () => {
    if (!estaConectado) {
      setHayError(true);
      return;
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('on');
      console.log('Enviado: on');
      setImagen(imagenPrendido);
    } else {
      setHayError(true);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Control del Foco</Text>

      {hayError && <Text style={styles.error}>No hay conexión, no se puede controlar el foco.</Text>}

      <TouchableOpacity onPress={manejarPresionImagen}>
        <Image source={imagen} style={styles.imagenFoco} />
      </TouchableOpacity>

      {!estaConectado && (
        <Button
          title="Reintentar conexión"
          onPress={() => navigation.goBack()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  imagenFoco: {
    width: 120,
    height: 120,
    margin: 20,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ControlFoco;
