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

  // Modificamos la altura solo para móviles y tablets.
  // En escritorio devolvemos 'auto' para que mande el aspect ratio o el ancho total.
  const getIllustrationHeight = () => {
    if (isMobile) return height * 0.45;
    if (isTablet) return height * 0.55;
    return 'auto'; 
  };

  return (
    <View style={styles.container}>
      
      {/* Contenedor de la pintura */}
      <View style={[
        styles.imageWrapper, 
        { height: getIllustrationHeight() },
        isDesktop && styles.imageWrapperDesktop // Aplicamos aspecto proporcional en escritorio
      ]}>
        <Image
          source={require('../assets/ilustracion-hero.jpg')}
          style={isDesktop ? styles.heroImageDesktop : styles.heroImage}
          // En escritorio usamos "cover" porque el contenedor ya tiene la proporción exacta de la imagen
          resizeMode={isDesktop ? "cover" : "cover"} 
        />
        {/* Efecto de degradado suave */}
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

      {/* Línea divisoria */}
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
    overflow: 'hidden',
  },
  imageWrapperDesktop: {
    // CAMBIA ESTO según la proporción real de tu pintura (Ancho / Alto).
    // Ejemplo: Si tu pintura es de 16:9 usa 16/9. Si es más cuadrada, usa 4/3 o lo que corresponda.
    // Al forzar el aspect ratio, la imagen ocupará el 100% del ancho y crecerá hacia abajo perfectamente sin recortar nada.
    aspectRatio: 16 / 9, 
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
        // Evita que en monitores ultra-wide la imagen se corte por arriba
        objectPosition: 'top center', 
      }
    })
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