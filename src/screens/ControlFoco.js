import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import globalStyles from '../style/GlobalStyles'; 

const imagenApagado = require('../../assets/focoApagado.jpg');
const imagenPrendido = require('../../assets/focoPrendido.jpg');

const ControlFoco = () => {
  const [ledStatus, setLedStatus] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('wss://echo.websocket.events');

    websocket.onopen = () => {
      Alert.alert('Conexión WebSocket', 'Conexión establecida');
      setWs(websocket);
    };

    websocket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        Alert.alert('Mensaje recibido', JSON.stringify(data));
        setLedStatus(data.led_status);
      } catch (error) {
        console.error('Error al analizar JSON:', error);
      }
    };
    
    websocket.onerror = (error) => {
      Alert.alert('Error de conexión', JSON.stringify(error));
    };
    
    websocket.onclose = () => {
      Alert.alert('Conexión WebSocket', 'Conexión cerrada');
      setWs(null);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const toggleLed = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      Alert.alert('Error', 'No hay conexión con el servidor.');
      return;
    }
    
    const newStatus = !ledStatus;
    ws.send(JSON.stringify({ led_status: newStatus }));
  };

  return (
    <View style={globalStyles.contenedor}>
      <Text style={globalStyles.titulo}>Control del Foco</Text>
      <TouchableOpacity onPress={toggleLed}>
        <Image 
          source={ledStatus ? imagenPrendido : imagenApagado} 
          style={globalStyles.imagenFoco} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default ControlFoco;
