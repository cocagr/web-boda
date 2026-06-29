import React from 'react';
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { COLORS } from '../styles/theme';

export default function Itinerario() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/Itinerario.png')}
        style={[styles.image, { width: Math.min(width * 0.9, 1000) }]} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.bgCremaAlt, // Usando tu color de fondo definido
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    aspectRatio: 1.5, // Ajusta esto según las proporciones reales de tu archivo
    maxWidth: '100%',
  },
});