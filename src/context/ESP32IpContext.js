import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ESP32IpContext = createContext();

export const ESP32IpProvider = ({ children, onReady }) => {
  const [esp32Ip, setEsp32Ip] = useState(null);

  useEffect(() => {
    const loadIp = async () => {
      try {
        const savedIp = await SecureStore.getItemAsync('esp32_ip');
        setEsp32Ip(savedIp);
        if (onReady) onReady(!!savedIp);
      } catch (e) {
        console.error('Error loading IP', e);
        if (onReady) onReady(false);
      }
    };
    loadIp();
  }, []);

  const saveIp = async (ip) => {
    try {
      await SecureStore.setItemAsync('esp32_ip', ip);
      setEsp32Ip(ip);
      return true;
    } catch (e) {
      console.error('Error saving IP', e);
      return false;
    }
  };

  return (
    <ESP32IpContext.Provider value={{ esp32Ip, setESP32Ip: saveIp }}>
      {children}
    </ESP32IpContext.Provider>
  );
};