// src/components/CustomButton.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../styles/theme';

export default function CustomButton({ title, onPress, style }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      // Añadimos eventos de ratón solo si estamos en Web para el efecto hover
      onMouseEnter={() => Platform.OS === 'web' && setIsHovered(true)}
      onMouseLeave={() => Platform.OS === 'web' && setIsHovered(false)}
      style={[
        styles.button,
        isHovered && styles.buttonHover,
        style
      ]}
    >
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.verdeOlivo,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4, // Bordes ligeramente suavizados, muy sutil
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.verdeOlivo,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  buttonHover: {
    backgroundColor: COLORS.verdeOlivoOscuro,
    borderColor: COLORS.verdeOlivoOscuro,
  },
  text: {
    fontFamily: FONTS.cuerpo,
    color: COLORS.blanco,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2, // Espaciado elegante entre letras
  },
});