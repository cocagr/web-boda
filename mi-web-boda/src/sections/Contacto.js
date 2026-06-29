// src/sections/Contacto.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Linking, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function Contacto() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  const [duda, setDuda] = useState('');

  const enviarDuda = () => {
    alert('Tu mensaje ha sido enviado. ¡Os responderemos lo antes posible!');
    setDuda('');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
        ¿TIENES ALGUNA DUDA?
      </Text>
      <Text style={styles.subtitle}>
        Si necesitas consultarnos algo sobre los hoteles, tienes algún problema con el transporte o cualquier otra duda, estamos a tu total disposición.
      </Text>

      <View style={[styles.contentLayout, { flexDirection: isMobile || isTablet ? 'column' : 'row' }]}>
        
        {/* BLOQUE IZQUIERDO: Teléfonos directos */}
        <View style={[styles.infoBlock, { width: isMobile || isTablet ? '100%' : '45%' }]}>
          <Text style={styles.blockTitle}>CONTACTO DIRECTO</Text>
          
          <View style={styles.contactCard}>
            <Text style={styles.novioName}>Laura</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+34600000000')}>
              <Text style={styles.phoneText}>+34 600 00 00 00</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.novioName}>Leandro</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+34611111111')}>
              <Text style={styles.phoneText}>+34 611 11 11 11</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Separador visual para móvil/escritorio */}
        {!isMobile && !isTablet && <View style={styles.verticalDivider} />}

        {/* BLOQUE DERECHO: Formulario rápido */}
        <View style={[styles.formBlock, { width: isMobile || isTablet ? '100%' : '45%', marginTop: isMobile || isTablet ? 40 : 0 }]}>
          <Text style={styles.blockTitle}>ENVIAR UN MENSAJE</Text>
          
          <CustomInput
            placeholder="Escribe aquí tu consulta de forma detallada..."
            value={duda}
            onChangeText={setDuda}
            multiline
            numberOfLines={4}
          />
          
          <CustomButton
            title="Enviar consulta"
            onPress={enviarDuda}
            style={styles.submitBtn}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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