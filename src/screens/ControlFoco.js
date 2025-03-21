import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../style/GlobalStyles'; 

const imagenApagado = require('../../assets/focoApagado.jpg');
const imagenPrendido = require('../../assets/focoPrendido.jpg');

const ControlFoco = () => {
  const [estaConectado, setEstaConectado] = useState(false);
  const [ws, setWs] = useState(null);
  const [hayError, setHayError] = useState(false);
  const [imagen, setImagen] = useState(imagenApagado);
  const navigation = useNavigation();

  useEffect(() => {
    const socket = new W3CWebSocket('ws://<IP_DEL_ESP32>:<PUERTO>');

    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
      setEstaConectado(true);
      setHayError(false);
      setWs(socket);
    };

    socket.onerror = (error) => {
      console.log('Error de conexión WebSocket', error);
      setEstaConectado(false);
      setHayError(true);
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
      setEstaConectado(false);
      setHayError(true);
    };

    socket.onmessage = (message) => {
      if (message.data === 'on') {
        setImagen(imagenPrendido);
      } else if (message.data === 'off') {
        setImagen(imagenApagado);
      }
    };

    setWs(socket);

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

    if (ws && ws.readyState === W3CWebSocket.OPEN) {
      const nuevoEstado = imagen === imagenApagado ? 'on' : 'off';
      ws.send(nuevoEstado);
      console.log('Enviado:', nuevoEstado);
    } else {
      setHayError(true);
    }
  };

  const reintentarConexion = () => {
    setHayError(false);
    // Aquí podrías implementar la lógica para reconectar el WebSocket
  };

  return (
    <View style={globalStyles.contenedor}>
      <Text style={globalStyles.titulo}>Control del Foco</Text>

      {hayError && <Text style={globalStyles.error}>No hay conexión, no se puede controlar el foco.</Text>}

      <TouchableOpacity onPress={manejarPresionImagen}>
        <Image source={imagen} style={globalStyles.imagenFoco} />
      </TouchableOpacity>

      {!estaConectado && (
        <Button
          title="Reintentar conexión"
          onPress={reintentarConexion}
          color="#6200ee"
        />
      )}
    </View>
  );
};

export default ControlFoco;