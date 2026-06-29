// src/sections/Autobus.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomButton from '../components/CustomButton';

export default function Autobus() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  // Estados para el flujo interactivo
  const [alojamiento, setAlojamiento] = useState(null); // 'priego', 'cabra', 'otro'
  const [usaraBus, setUsaraBus] = useState(null); // 'si', 'no'

  const handleConfirmar = () => {
    alert('Preferencia de transporte guardada correctamente.');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
        ALOJAMIENTO Y AUTOBÚS
      </Text>
      
      <Text style={styles.subtitle}>
        Queremos facilitar vuestros traslados durante el gran día. Selecciona dónde vas a alojarte para conocer y reservar tus rutas disponibles.
      </Text>

      {/* NUEVO BLOQUE: Recomendación de alojamiento y Hoteles bloqueados */}
      <View style={[styles.infoAlojamientoCard, { width: isMobile ? '100%' : isTablet ? '85%' : 700 }]}>
        <Text style={styles.infoTextPrincipal}>
          En cuanto al alojamiento, recomendamos la estancia en <Text style={styles.bold}>Cabra</Text> o <Text style={styles.bold}>Priego de Córdoba</Text>, ya que será desde donde haya servicio de autobús de ida y vuelta.
        </Text>
        
        <Text style={styles.infoTextSecundario}>
          Para hacerlo más fácil, hemos bloqueado habitaciones en los siguientes hoteles:
        </Text>

        <View style={styles.hotelesContainer}>
          <View style={[styles.hotelRow, isMobile && styles.hotelRowMobile]}>
            <View>
              <Text style={styles.hotelName}>Hotel Fuente Las Piedras</Text>
              <Text style={styles.hotelLocalidad}>Cabra</Text>
            </View>
            <Text style={styles.hotelPhone}>957 52 97 40</Text>
          </View>

          <View style={[styles.hotelRow, styles.hotelRowBorder, isMobile && styles.hotelRowMobile]}>
            <View>
              <Text style={styles.hotelName}>Hotel Río Piscina</Text>
              <Text style={styles.hotelLocalidad}>Priego de Córdoba</Text>
            </View>
            <Text style={styles.hotelPhone}>957 70 01 86</Text>
          </View>
        </View>

        <Text style={styles.notaReserva}>
          <Text style={{ fontWeight: '500' }}>Para reservar:</Text> Llamar diciendo que es la reserva para la boda de Laura y Leandro.</Text>
      </View>


      {/* BLOQUE INTERACTIVO: ¿Dónde te alojas? */}
      <View style={[styles.card, { width: isMobile ? '100%' : isTablet ? '85%' : 700 }]}>
        <Text style={styles.label}>¿DÓNDE TE ALOJAS?</Text>
        
        <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAlojamiento('priego');
              setUsaraBus(null);
            }}
            style={[styles.optionButton, alojamiento === 'priego' && styles.optionSelected]}
          >
            <Text style={[styles.optionText, alojamiento === 'priego' && styles.optionTextSelected]}>
              PRIEGO DE CÓRDOBA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAlojamiento('cabra');
              setUsaraBus(null);
            }}
            style={[styles.optionButton, alojamiento === 'cabra' && styles.optionSelected, !isMobile && { marginHorizontal: 10 }]}
          >
            <Text style={[styles.optionText, alojamiento === 'cabra' && styles.optionTextSelected]}>
              CABRA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAlojamiento('otro');
              setUsaraBus(null);
            }}
            style={[styles.optionButton, alojamiento === 'otro' && styles.optionSelected]}
          >
            <Text style={[styles.optionText, alojamiento === 'otro' && styles.optionTextSelected]}>
              OTRO
            </Text>
          </TouchableOpacity>
        </View>

        {/* SUB-BLOQUE CONDICIONAL: ¿Usarás autobús? */}
        {alojamiento && alojamiento !== 'otro' && (
          <View style={styles.subSection}>
            <Text style={styles.label}>¿USARÁS EL SERVICIO DE AUTOBÚS?</Text>
            
            <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setUsaraBus('si')}
                style={[styles.checkboxButton, usaraBus === 'si' && styles.checkboxSelected]}
              >
                <View style={[styles.checkboxCircle, usaraBus === 'si' && styles.checkboxCircleActive]} />
                <Text style={styles.checkboxLabel}>SÍ, LO USARÉ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setUsaraBus('no')}
                style={[styles.checkboxButton, usaraBus === 'no' && styles.checkboxSelected, !isMobile && { marginLeft: 15 }]}
              >
                <View style={[styles.checkboxCircle, usaraBus === 'no' && styles.checkboxCircleActive]} />
                <Text style={styles.checkboxLabel}>NO, IRÉ POR MI CUENTA</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* RUTAS ESPECÍFICAS: Priego de Córdoba -> SÍ */}
        {alojamiento === 'priego' && usaraBus === 'si' && (
          <View style={styles.rutasContainer}>
            <Text style={styles.rutasTitle}>TUS RUTAS INCLUIDAS:</Text>
            <View style={styles.rutaItem}><Text style={styles.rutaText}>➔ Priego de Córdoba ➔ Iglesia</Text></View>
            <View style={styles.rutaItem}><Text style={styles.rutaText}>➔ Iglesia ➔ Finca</Text></View>
            <View style={styles.rutaItem}><Text style={styles.rutaText}>➔ Finca ➔ Priego de Córdoba</Text></View>
          </View>
        )}

        {/* RUTAS ESPECÍFICAS: Cabra -> SÍ */}
        {alojamiento === 'cabra' && usaraBus === 'si' && (
          <View style={styles.rutasContainer}>
            <Text style={styles.rutasTitle}>TUS RUTAS INCLUIDAS:</Text>
            <View style={styles.rutaItem}><Text style={styles.rutaText}>➔ Iglesia ➔ Finca</Text></View>
            <View style={styles.rutaItem}><Text style={styles.rutaText}>➔ Finca ➔ Cabra</Text></View>
          </View>
        )}

        {/* MENSAJE ESPECÍFICO: Otro Alojamiento */}
        {alojamiento === 'otro' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>
              Si te alojas en otra ubicación, ponte en contacto con nosotros para que podamos ayudarte a coordinar tu transporte de la mejor manera.
            </Text>
          </View>
        )}

        {/* BOTÓN FINAL DE CONFIRMACIÓN */}
        {alojamiento && (usaraBus || alojamiento === 'otro') && (
          <CustomButton
            title="Confirmar preferencia"
            onPress={handleConfirmar}
            style={styles.confirmBtn}
          />
        )}

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
    lineHeight: 26,
    marginBottom: 35,
  },
  infoAlojamientoCard: {
    backgroundColor: COLORS.blanco,
    padding: Platform.OS === 'web' ? 30 : 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E2DA',
    marginBottom: 25,
  },
  infoTextPrincipal: {
    fontFamily: FONTS.cuerpo,
    fontSize: 15,
    color: COLORS.negroSuave,
    lineHeight: 24,
    fontWeight: '300',
  },
  infoTextSecundario: {
    fontFamily: FONTS.cuerpo,
    fontSize: 14,
    color: COLORS.negroSuave,
    marginTop: 15,
    fontWeight: '400',
  },
  bold: {
    fontWeight: '600',
    color: COLORS.verdeOlivo,
  },
  hotelesContainer: {
    backgroundColor: '#FAF8F5',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E6E2DA',
    marginTop: 15,
    paddingHorizontal: 16,
  },
  hotelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  hotelRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#E6E2DA',
  },
  hotelRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  hotelName: {
    fontFamily: FONTS.titulo,
    fontSize: 16,
    color: COLORS.negroSuave,
  },
  hotelLocalidad: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: 'rgba(44, 44, 44, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  hotelPhone: {
    fontFamily: FONTS.cuerpo,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.verdeOlivo,
    letterSpacing: 0.5,
  },
  notaReserva: {
    fontFamily: FONTS.cuerpo,
    fontSize: 13.5,
    color: COLORS.negroSuave,
    marginTop: 18,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.blanco,
    padding: Platform.OS === 'web' ? 40 : 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E2DA',
  },
  label: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: COLORS.negroSuave,
    letterSpacing: 1.5,
    marginBottom: 16,
    fontWeight: '600',
  },
  optionsRow: {
    width: '100%',
    justifyContent: 'space-between',
    gap: Platform.OS === 'web' ? 0 : 12,
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0DCD5',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blanco,
    marginBottom: Platform.OS === 'web' ? 0 : 4,
  },
  optionSelected: {
    borderColor: COLORS.verdeOlivo,
    backgroundColor: 'rgba(107, 124, 74, 0.05)',
  },
  optionText: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: COLORS.negroSuave,
    letterSpacing: 1,
  },
  optionTextSelected: {
    color: COLORS.verdeOlivo,
    fontWeight: '700',
  },
  subSection: {
    marginTop: 35,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#F1EDE6',
  },
  checkboxButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0DCD5',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.blanco,
    marginBottom: Platform.OS === 'web' ? 0 : 4,
  },
  checkboxSelected: {
    borderColor: COLORS.verdeOlivo,
  },
  checkboxCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C0BBAF',
    marginRight: 12,
    backgroundColor: COLORS.blanco,
  },
  checkboxCircleActive: {
    borderColor: COLORS.verdeOlivo,
    backgroundColor: COLORS.verdeOlivo,
  },
  checkboxLabel: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: COLORS.negroSuave,
    letterSpacing: 0.5,
  },
  rutasContainer: {
    marginTop: 30,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E6E2DA',
    borderRadius: 4,
    padding: 20,
  },
  rutasTitle: {
    fontFamily: FONTS.cuerpo,
    fontSize: 11,
    color: COLORS.verdeOlivo,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  rutaItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EDE6',
  },
  rutaText: {
    fontFamily: FONTS.titulo,
    fontSize: 14,
    color: COLORS.negroSuave,
  },
  infoBox: {
    marginTop: 30,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E6E2DA',
    borderRadius: 4,
    padding: 20,
  },
  infoBoxText: {
    fontFamily: FONTS.cuerpo,
    fontSize: 13,
    color: COLORS.negroSuave,
    fontStyle: 'italic',
    lineHeight: 22,
    textAlign: 'center',
  },
  confirmBtn: {
    marginTop: 30,
    width: '100%',
  },
});