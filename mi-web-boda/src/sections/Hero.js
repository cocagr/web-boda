// src/sections/Hero.js
import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';

export default function Hero() {
  const { width, height } = useWindowDimensions();
  const deviceType = getDeviceType(width);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  // Ajustamos dinámicamente la altura del bloque de la pintura según la pantalla
  const getIllustrationHeight = () => {
    if (isMobile) return height * 0.45;  // En móvil ocupa menos vertical para dejar espacio al texto
    if (isTablet) return height * 0.55;  // En tablet un tamaño intermedio
    return height * 0.65;                // En escritorio luce en gran formato
  };

  return (
    <View style={styles.container}>
      
      {/* Contenedor de la pintura con su máscara difuminada inferior */}
      <View style={[styles.imageWrapper, { height: getIllustrationHeight() }]}>
        <Image
          source={require('../assets/ilustracion-hero.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
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
    paddingTop: Platform.OS === 'web' ? 70 : 60, // Espacio reservado para que el Navbar fijo no tape la pintura
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradientFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120, // Altura de la transición difuminada
    ...Platform.select({
      web: {
        // En entorno web aplicamos un degradadoCSS real hacia el crema exacto
        background: `linear-gradient(to bottom, rgba(247, 244, 239, 0) 0%, ${COLORS.bgCrema} 100%)`,
      },
      default: {
        // Fallback para plataformas móviles si es necesario
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
    fontStyle: 'italic', // Toque clásico y premium para el lugar
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(44, 44, 44, 0.1)',
    marginTop: 40,
    marginBottom: 20,
  },
});