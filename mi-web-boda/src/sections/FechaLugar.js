// src/sections/FechaLugar.js
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';

export default function FechaLugar() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: isMobile ? '100%' : isTablet ? '85%' : '70%' }]}>
        
        {/* Etiqueta de la fecha en formato limpio y espaciado */}
        <Text style={[styles.dateLabel, { fontSize: isMobile ? 18 : 22 }]}>
          SÁBADO, 19 DE SEPTIEMBRE DE 2026
        </Text>
        
        {/* Título de la localización con el color corporativo Verde Olivo */}
        <Text style={[styles.locationTitle, { fontSize: isMobile ? 36 : 46 }]}>
          Cabra, Córdoba
        </Text>

        {/* Detalles decorativos y textos explicativos */}
        <View style={styles.decoratorLine} />

        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 16 }]}>
          Nos hace una ilusión inmensa celebrar nuestro matrimonio rodeados de la belleza de la Subbética cordobesa, un paisaje de olivares muy especial para nosotros.
        </Text>

        <Text style={[styles.bodyText, { fontSize: isMobile ? 15 : 16, marginTop: 15 }]}>
          La ceremonia dará comienzo por la tarde. Muy pronto os facilitaremos la localización exacta de la finca, los detalles de los horarios y las recomendaciones de alojamiento para los que venís de fuera.
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.bgCremaAlt, // Fondo con sutil contraste
    paddingVertical: 90,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.bgCremaAlt,
    paddingHorizontal: Platform.OS === 'web' ? 40 : 10,
  },
  dateLabel: {
    fontFamily: FONTS.cuerpo,
    color: COLORS.negroSuave,
    letterSpacing: 4, // Espaciado premium para la fecha
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 10,
  },
  locationTitle: {
    fontFamily: FONTS.titulo,
    color: COLORS.verdeOlivo, // Color de acento de la paleta
    letterSpacing: 1.5,
    textAlign: 'center',
    fontWeight: '400',
  },
  decoratorLine: {
    width: 60,
    height: 1,
    backgroundColor: COLORS.doradoSuave, // Detalle fino en dorado sutil
    marginVertical: 30,
  },
  bodyText: {
    fontFamily: FONTS.cuerpo,
    color: COLORS.negroSuave,
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.5,
    fontWeight: '300',
    maxWidth: 600,
  },
});