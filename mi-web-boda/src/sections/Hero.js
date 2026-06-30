// src/sections/Hero.js
import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';

export default function Hero() {
  const { width, height } = useWindowDimensions();
  const deviceType = getDeviceType(width);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = !isMobile && !isTablet;

  // Control estricto de la altura para garantizar que el texto siempre sea visible al entrar
  const getIllustrationHeight = () => {
    if (isMobile) return height * 0.45;
    if (isTablet) return height * 0.50;
    return height * 0.55; // Reducimos a un 55% en escritorio para asegurar espacio al infoContainer
  };

  return (
    <View style={styles.container}>
      
      {/* Contenedor de la pintura con su máscara difuminada inferior */}
      <View style={[styles.imageWrapper, { height: getIllustrationHeight() }]}>
        <Image
          source={require('../assets/ilustracion-hero.jpg')}
          // Usamos un estilo específico en escritorio para forzar el encuadre superior
          style={isDesktop ? styles.heroImageDesktop : styles.heroImage}
          resizeMode="cover" // Cover en todos para que rellene el ancho completo
        />
        {/* Efecto de degradado suave para fundirse con el fondo crema */}
        <View style={styles.gradientFade} />
      </View>

      {/* Bloque de Información Tipográfica Central */}
      <View style={styles.infoContainer}>
        <Text style={[
          styles.title, 
          { fontSize: isMobile ? 36 : isTablet ? 48 : 56 }
        ]}>
          LAURA & LEANDRO
        </Text>
        
        <Text style={[
          styles.date, 
          { fontSize: isMobile ? 16 : 20 }
        ]}>
          19 SEPTIEMBRE 2026
        </Text>
        
        <Text style={[
          styles.location, 
          { fontSize: isMobile ? 18 : 22 }
        ]}>
          Cabra, Córdoba
        </Text>
      </View>

      {/* Línea divisoria fina y sutil de diseño */}
      <View style={[styles.divider, { width: isMobile ? '80%' : '60%' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.bgCrema,
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 70 : 60,
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden', // Clave para que lo que sobre por abajo se recorte
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageDesktop: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      web: {
        // TRUCO CLAVE: Alinea la imagen arriba del todo en la web.
        // Al estirarse al 100% del ancho, el recorte pasará automáticamente ABAJO.
        objectPosition: 'top center',
      },
    }),
  },
  gradientFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    ...Platform.select({
      web: {
        background: `linear-gradient(to bottom, rgba(247, 244, 239, 0) 0%, ${COLORS.bgCrema} 100%)`,
      },
      default: {
        backgroundColor: 'rgba(247, 244, 239, 0.7)',
      },
    }),
  },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 25,
  },
  title: {
    fontFamily: FONTS.titulo,
    color: COLORS.negroSuave,
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: '400',
    marginBottom: 12,
  },
  date: {
    fontFamily: FONTS.cuerpo,
    color: COLORS.negroSuave,
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: '300',
    marginBottom: 8,
  },
  location: {
    fontFamily: FONTS.titulo,
    color: COLORS.negroSuave,
    textAlign: 'center',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(44, 44, 44, 0.1)',
    marginTop: 40,
    marginBottom: 20,
  },
});