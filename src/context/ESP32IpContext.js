import React, { createContext, useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';

export const ESP32IpContext = createContext();

// Crear instancia de almacenamiento MMKV
const storage = new MMKV();

export const ESP32IpProvider = ({ children, onReady }) => {
  const [esp32Ip, setEsp32Ip] = useState(null);

  useEffect(() => {
    const loadIp = () => {
      try {
        const savedIp = storage.getString('esp32_ip');
        setEsp32Ip(savedIp);
        if (onReady) onReady(!!savedIp);
      } catch (e) {
        console.error('Error cargando IP:', e);
        if (onReady) onReady(false);
      }
    };
    loadIp();
  }, []);

  const saveIp = (ip) => {
    try {
      storage.set('esp32_ip', ip);
      setEsp32Ip(ip);
      return true;
    } catch (e) {
      console.error('Error guardando IP:', e);
      return false;
    }
  };

  return (
    <ESP32IpContext.Provider value={{ esp32Ip, setESP32Ip: saveIp }}>
      {children}
    </ESP32IpContext.Provider>
  );
};
