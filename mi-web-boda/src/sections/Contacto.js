import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Linking, Platform, Image } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function Contacto() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
        OS ESPERAMOS!
      </Text>
      <Text style={styles.subtitle}>
        Si necesitas consultarnos algo sobre los hoteles, tienes algún problema con el transporte o cualquier otra duda, estamos a tu total disposición.
      </Text>

      {/* Aquí insertamos la imagen */}
      <Image 
        source={require('../assets/Contacto.jpeg')} 
        style={styles.heroImage}
        resizeMode="contain"
      />

      <View style={[styles.contentLayout, { flexDirection: isMobile || isTablet ? 'column' : 'row', alignItems: 'center', justifyContent: 'center' }]}>
        {/* El resto de tu código de contactos se mantiene igual */}
        <View style={[styles.infoBlock, { width: isMobile || isTablet ? '100%' : '400px' }]}>
          <Text style={styles.blockTitle}>CONTACTO DIRECTO</Text>
          {/* ... tarjetas de contacto ... */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    maxWidth: 300,
    aspectRatio: 0.75,
    marginBottom: 40,
    borderRadius: 8,
  },
  contentLayout: {
    width: '100%',
    maxWidth: 900,
    // Eliminamos space-between para poder centrar
    justifyContent: 'center', 
    alignItems: 'center',
  },
  infoBlock: {
    // Definimos un ancho fijo o máximo para que no se estire
    maxWidth: 400,
    alignItems: 'center', // Centra los elementos internos (título y tarjetas)
  },
  blockTitle: {
    fontFamily: FONTS.cuerpo,
    fontSize: 13,
    color: COLORS.verdeOlivo,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center', // Centrado para que coincida con el diseño
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.bgCremaAlt,
    paddingVertical: 90,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.titulo,
    color: COLORS.negroSuave,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: FONTS.cuerpo,
    fontSize: 15,
    color: COLORS.negroSuave,
    textAlign: 'center',
    fontWeight: '300',
    maxWidth: 600,
    lineHeight: 24,
    marginBottom: 60,
  },
  contentLayout: {
    width: '100%',
    maxWidth: 900,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  infoBlock: {
    justifyContent: 'center',
  },
  blockTitle: {
    fontFamily: FONTS.cuerpo,
    fontSize: 13,
    color: COLORS.verdeOlivo,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
  },
  contactCard: {
    backgroundColor: COLORS.blanco,
    padding: 20,
    borderRadius: 4,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E6E2DA',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(44, 44, 44, 0.02)',
      }
    })
  },
  novioName: {
    fontFamily: FONTS.titulo,
    fontSize: 18,
    color: COLORS.negroSuave,
    marginBottom: 4,
  },
  phoneText: {
    fontFamily: FONTS.cuerpo,
    fontSize: 14,
    color: COLORS.doradoSuave,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: 'rgba(44, 44, 44, 0.1)',
    marginHorizontal: 30,
  },
  formBlock: {
    justifyContent: 'center',
  },
  submitBtn: {
    width: '100%',
  },
});