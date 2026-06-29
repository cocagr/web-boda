import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { COLORS, FONTS } from '../styles/theme';

export default function Itinerario() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ITINERARIO</Text>
      
      <Image 
        source={require('../assets/Itinerario.png')}
        style={[styles.image, { width: Math.min(width * 0.9, 1000) }]} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.bgCremaAlt,
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.titulo,
    fontSize: 40,
    color: COLORS.negroSuave,
    letterSpacing: 2,
    marginBottom: 40,
    textAlign: 'center',
  },
  image: {
    aspectRatio: 1.5,
    maxWidth: '100%',
  },
});