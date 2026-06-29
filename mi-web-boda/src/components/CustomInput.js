// src/components/CustomInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../styles/theme';

export default function CustomInput({ label, placeholder, value, onChangeText, multiline, numberOfLines = 3 }) {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          multiline && { height: 40 * numberOfLines }
        ]}
        placeholder={placeholder}
        placeholderTextColor="rgba(44, 44, 44, 0.4)"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: COLORS.negroSuave,
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#F9F8F6',
    borderWidth: 1,
    borderColor: '#E0DCD5',
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.negroSuave,
    fontFamily: FONTS.cuerpo,
    // Sombra sutil y segura multiplataforma
    ...Platform.select({
      web: {
        outlineStyle: 'none', // Evita el borde azul feo por defecto de los navegadores
      },
    }),
  },
  inputMultiline: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});