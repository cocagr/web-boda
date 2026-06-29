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
          En septiembre NOS CASAMOS!
        </Text>
        
        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 17 }]}>
          ¡Estamos super felices de poder compartir contigo el día de nuestra boda!
        </Text>
        
        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 17, marginTop: 15 }]}>
          Mientras llega el día hemos creado esta web con un montón de secciones para que estés al día de todo y para compartir la información más importante para el evento.
        </Text>

        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 17, marginTop: 15 }]}>
          Confírmanos tu asistencia lo antes posible, así organizarlo todo nos será mucho más fácil.
        </Text>

        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 17, marginTop: 15 }]}>
          Nos vemos muy pronto, muchos besos!
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