// src/sections/RSVP.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function RSVP() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';

  // Estados del formulario (Invitado Principal)
  const [nombre, setNombre] = useState('');
  const [asistencia, setAsistencia] = useState(null); // 'si' o 'no'
  const [menuPrincipal, setMenuPrincipal] = useState(null); // 'lubina' o 'solomillo'
  const [alergiasPrincipal, setAlergiasPrincipal] = useState('');
  
  // Estados para el acompañante
  const [tieneAcompanante, setTieneAcompanante] = useState(null); // 'si' o 'no'
  const [nombreAcompanante, setNombreAcompanante] = useState('');
  const [menuAcompanante, setMenuAcompanante] = useState(null); // 'lubina' o 'solomillo'
  const [alergiasAcompanante, setAlergiasAcompanante] = useState('');

  const handleEnviar = () => {
    let textoAlerta = `Gracias ${nombre || 'por tu respuesta'}. Se ha enviado tu confirmación.`;
    if (asistencia === 'si') {
      textoAlerta += `\nMenú: ${menuPrincipal === 'lubina' ? 'Lubina' : 'Solomillo de ternera'}.`;
      if (alergiasPrincipal) textoAlerta += ` Alergias: ${alergiasPrincipal}.`;
    }
    if (asistencia === 'si' && tieneAcompanante === 'si' && nombreAcompanante) {
      textoAlerta += `\n\nAcompañante: ${nombreAcompanante}\nMenú: ${menuAcompanante === 'lubina' ? 'Lubina' : 'Solomillo de ternera'}.`;
      if (alergiasAcompanante) textoAlerta += ` Alergias: ${alergiasAcompanante}.`;
    }
    alert(textoAlerta);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
        CONFIRMA TU ASISTENCIA
      </Text>
      
      <Text style={styles.subtitle}>
        Por favor, indícanos tu respuesta antes del 15 de agosto para ayudarnos con la organización.
      </Text>

      <View style={[styles.formCard, { width: isMobile ? '100%' : 650 }]}>
        
        {/* Campo: Nombre completo del invitado principal */}
        <CustomInput
          label="Nombre y Apellidos"
          placeholder="Escribe tu nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        {/* Campo: Selector de Asistencia */}
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>¿PODRÁS ACOMPAÑARNOS?</Text>
          <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAsistencia('si')}
              style={[
                styles.optionButton,
                asistencia === 'si' && styles.optionSelected,
                isMobile && { marginRight: 0, marginBottom: 12 }
              ]}
            >
              <Text style={[styles.optionText, asistencia === 'si' && styles.optionTextSelected]}>
                SÍ, ¡ALLÍ ESTARÉ!
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setAsistencia('no');
                setMenuPrincipal(null);
                setAlergiasPrincipal('');
                setTieneAcompanante(null);
                setNombreAcompanante('');
                setMenuAcompanante(null);
                setAlergiasAcompanante('');
              }}
              style={[
                styles.optionButton,
                asistencia === 'no' && styles.optionSelected,
                isMobile && { marginRight: 0 }
              ]}
            >
              <Text style={[styles.optionText, asistencia === 'no' && styles.optionTextSelected]}>
                NO PODRÉ ASISTIR
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CONDICIONAL: Elección de menú y alergias del Invitado Principal si asiste */}
        {asistencia === 'si' && (
          <View style={styles.seccionComensal}>
            <View style={styles.selectorContainer}>
              <Text style={styles.label}>EN EL MENÚ PREFERIRÉ:</Text>
              <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setMenuPrincipal('lubina')}
                  style={[
                    styles.optionButton,
                    menuPrincipal === 'lubina' && styles.optionSelected,
                    isMobile && { marginRight: 0, marginBottom: 12 }
                  ]}
                >
                  <Text style={[styles.optionText, menuPrincipal === 'lubina' && styles.optionTextSelected]}>
                    🐟 LUBINA
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setMenuPrincipal('solomillo')}
                  style={[
                    styles.optionButton,
                    menuPrincipal === 'solomillo' && styles.optionSelected,
                    isMobile && { marginRight: 0 }
                  ]}
                >
                  <Text style={[styles.optionText, menuPrincipal === 'solomillo' && styles.optionTextSelected]}>
                    🥩 SOLOMILLO DE TERNERA
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <CustomInput
              label="¿Tienes alguna alergia, intolerancia o menú especial?"
              placeholder="Ej: Celíaco, vegetariano, alergia a los frutos secos..."
              value={alergiasPrincipal}
              onChangeText={setAlergiasPrincipal}
            />
          </View>
        )}

        {/* CONDICIONAL: Preguntar por acompañante si el invitado principal dice que SÍ asiste */}
        {asistencia === 'si' && (
          <View style={[styles.selectorContainer, { marginTop: 15 }]}>
            <Text style={styles.label}>¿VIENES CON ACOMPAÑANTE?</Text>
            <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setTieneAcompanante('si')}
                style={[
                  styles.optionButton,
                  tieneAcompanante === 'si' && styles.optionSelected,
                  isMobile && { marginRight: 0, marginBottom: 12 }
                ]}
              >
                <Text style={[styles.optionText, tieneAcompanante === 'si' && styles.optionTextSelected]}>
                  SÍ, TRAIGO ACOMPAÑANTE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setTieneAcompanante('no');
                  setNombreAcompanante('');
                  setMenuAcompanante(null);
                  setAlergiasAcompanante('');
                }}
                style={[
                  styles.optionButton,
                  tieneAcompanante === 'no' && styles.optionSelected,
                  isMobile && { marginRight: 0 }
                ]}
              >
                <Text style={[styles.optionText, tieneAcompanante === 'no' && styles.optionTextSelected]}>
                  NO, VOY SOLO/A
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* BLOQUE DINÁMICO: Datos, Menú y Alergias del Acompañante */}
        {asistencia === 'si' && tieneAcompanante === 'si' && (
          <View style={styles.animatedField}>
            <CustomInput
              label="Nombre y Apellidos del Acompañante"
              placeholder="Escribe el nombre completo de tu acompañante"
              value={nombreAcompanante}
              onChangeText={setNombreAcompanante}
            />

            <View style={[styles.selectorContainer, { marginTop: 10 }]}>
              <Text style={styles.label}>MI ACOMPAÑANTE PREFERIRÁ EN EL MENÚ:</Text>
              <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setMenuAcompanante('lubina')}
                  style={[
                    styles.optionButton,
                    menuAcompanante === 'lubina' && styles.optionSelected,
                    isMobile && { marginRight: 0, marginBottom: 12 }
                  ]}
                >
                  <Text style={[styles.optionText, menuAcompanante === 'lubina' && styles.optionTextSelected]}>
                    🐟 LUBINA
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setMenuAcompanante('solomillo')}
                  style={[
                    styles.optionButton,
                    menuAcompanante === 'solomillo' && styles.optionSelected,
                    isMobile && { marginRight: 0 }
                  ]}
                >
                  <Text style={[styles.optionText, menuAcompanante === 'solomillo' && styles.optionTextSelected]}>
                    🥩 SOLOMILLO DE TERNERA
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <CustomInput
              label="¿Tu acompañante tiene alguna alergia o intolerancia?"
              placeholder="Ej: Intolerante a la lactosa, vegano..."
              value={alergiasAcompanante}
              onChangeText={setAlergiasAcompanante}
            />
          </View>
        )}

        {/* Mensaje Informativo de Logística (Niños) */}
        <View style={styles.infoNotaContainer}>
          <Text style={styles.infoNotaText}>
            Debido a motivos logísticos no podemos extender esta invitación a los niños.
          </Text>
        </View>

        {/* Botón de Envío */}
        <CustomButton
          title="Enviar Respuesta"
          onPress={handleEnviar}
          style={styles.submitBtn}
        />

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
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: FONTS.cuerpo,
    fontSize: 15,
    color: COLORS.negroSuave,
    textAlign: 'center',
    fontWeight: '300',
    maxWidth: 500,
    lineHeight: 24,
    marginBottom: 45,
  },
  formCard: {
    backgroundColor: COLORS.blanco,
    padding: Platform.OS === 'web' ? 40 : 24,
    borderRadius: 8,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 20px rgba(44, 44, 44, 0.04)',
      },
      default: {
        shadowColor: COLORS.negroSuave,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }
    }),
  },
  seccionComensal: {
    marginBottom: 10,
  },
  selectorContainer: {
    width: '100%',
    marginBottom: 25,
  },
  label: {
    fontFamily: FONTS.cuerpo,
    fontSize: 12,
    color: COLORS.negroSuave,
    letterSpacing: 1.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  optionsRow: {
    width: '100%',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0DCD5',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Platform.OS === 'web' ? 12 : 0,
    backgroundColor: COLORS.blanco,
  },
  optionSelected: {
    borderColor: COLORS.verdeOlivo,
    backgroundColor: 'rgba(107, 124, 74, 0.05)',
  },
  optionText: {
    fontFamily: FONTS.cuerpo,
    fontSize: 13,
    color: COLORS.negroSuave,
    letterSpacing: 1,
    fontWeight: '400',
  },
  optionTextSelected: {
    color: COLORS.verdeOlivo,
    fontWeight: '700',
  },
  animatedField: {
    width: '100%',
    borderLeftWidth: 2,
    borderLeftColor: COLORS.verdeOlivo,
    paddingLeft: 16,
    marginBottom: 25,
    marginTop: 10,
  },
  infoNotaContainer: {
    width: '100%',
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#E6E2DA',
    borderRadius: 4,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  infoNotaText: {
    fontFamily: FONTS.cuerpo,
    fontSize: 13,
    color: COLORS.negroSuave,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  submitBtn: {
    marginTop: 5,
    width: '100%',
  },
});