// src/sections/Bienvenida.js
import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';

export default function Bienvenida() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  // Ajuste responsive del tamaño de las ramas de olivo
  const getOlivoSize = () => {
    if (isMobile) return { width: 280, height: 110 };
    if (isTablet) return { width: 420, height: 165 };
    return { width: 500, height: 195 }; // Escritorio
  };

  return (
    <View style={styles.container}>
      
      {/* Rama de Olivo Superior */}
      <Image
        source={require('../assets/olivo-arriba.png')}
        style={[styles.olivoImage, getOlivoSize()]}
        resizeMode="contain"
      />

      {/* Contenedor del Mensaje */}
      <View style={[styles.textContainer, { maxWidth: isMobile ? '90%' : 650 }]}>
        <Text style={[styles.title, { fontSize: isMobile ? 28 : 36 }]}>
          ¡Bienvenidos a nuestra Boda!
        </Text>
        
        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 17 }]}>
          Hay momentos en la vida que ya son especiales por sí solos, pero compartirlos con las personas que más queremos los hace inolvidables. 
        </Text>
        
        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 17, marginTop: 15 }]}>
          Estamos muy felices de dar forma a este día y nos encantaría que forméis parte de nuestra historia en este entorno tan nuestro. ¡Os esperamos con los brazos abiertos!
        </Text>
      </View>

      {/* Rama de Olivo Inferior */}
      <Image
        source={require('../assets/olivo-abajo.png')}
        style={[styles.olivoImage, getOlivoSize(), styles.marginTop]}
        resizeMode="contain"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.bgCrema,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  olivoImage: {
    // El tamaño se gestiona dinámicamente con la función getOlivoSize
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontFamily: FONTS.titulo,
    color: COLORS.negroSuave,
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: 25,
    fontWeight: '400',
  },
  bodyText: {
    fontFamily: FONTS.cuerpo,
    color: COLORS.negroSuave,
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.5,
    fontWeight: '300', // Estilo ligero (Lato Light) para un acabado limpio
  },
  marginTop: {
    marginTop: 10,
  },
});