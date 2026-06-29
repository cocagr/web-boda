// src/sections/Regalo.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';

export default function Regalo() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';
  
  const [copiado, setCopiado] = useState(false);
  const iban = "ES50 1583 0001 1591 9649 4149";

  const handleCopiar = () => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(iban.replace(/ /g, ''));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } else {
      alert('IBAN: ' + iban);
    }
  };

  return (
    <View style={styles.container}>
      {/* TÍTULO DE LA SECCIÓN */}
      <Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
        2 CORINTIOS 9:7
      </Text>

      {/* Cita Bíblica Elegante */}
      <View style={[styles.quoteContainer, { width: isMobile ? '100%' : 600 }]}>
        <Text style={styles.quoteText}>
          «Cada uno debe dar según lo que haya decidido en su corazón, no de mala gana ni por obligación, porque Dios ama al que da con alegría»
        </Text>
      </View>

      {/* Tarjeta con el Número de Cuenta */}
      <View style={[styles.card, { width: isMobile ? '100%' : 500 }]}>
        <Text style={styles.cardLabel}>NÚMERO DE CUENTA (IBAN)</Text>
        
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={handleCopiar}
          style={styles.ibanContainer}
        >
          <Text style={[styles.ibanText, { fontSize: isMobile ? 14 : 18 }]}>
            {iban}
          </Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>
          {copiado ? "¡Copiado al portapapeles! ✓" : "Haz clic sobre el número para copiarlo"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.bgCrema,
    paddingVertical: 90,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.titulo,
    color: COLORS.negroSuave,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 35, // Margen para separar el título de la cita bíblica
  },
  quoteContainer: {
    marginBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  quoteText: {
    fontFamily: FONTS.titulo,
    fontSize: 16,
    color: COLORS.negroSuave,
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: COLORS.verdeOlivo,
    letterSpacing: 2,
    marginTop: 15,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.blanco,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E2DA',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 20px rgba(44, 44, 44, 0.03)',
      },
    }),
  },
  cardLabel: {
    fontFamily: FONTS.cuerpo,
    fontSize: 11,
    color: COLORS.negroSuave,
    letterSpacing: 1.5,
    marginBottom: 16,
    fontWeight: '500',
  },
  ibanContainer: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E6E2DA',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
  },
  ibanText: {
    fontFamily: 'Courier',
    fontWeight: '700',
    color: COLORS.negroSuave,
    letterSpacing: 1,
  },
  helpText: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: COLORS.verdeOlivo,
    marginTop: 12,
    fontStyle: 'italic',
  },
});