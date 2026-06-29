// src/sections/RSVP.js
// Busca la línea del título en RSVP.js y cámbiala un momento para testear:
<Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
  CONFIRMA TU ASISTENCIA (V2)
</Text>
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

// Importamos el cliente de Supabase que acabas de crear
import { supabase } from '../config/supabaseClient'; 

export default function RSVP() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';

  // Estados del formulario (Invitado Principal)
  const [nombre, setNombre] = useState('');
  const [asistencia, setAsistencia] = useState(null); 
  const [menuPrincipal, setMenuPrincipal] = useState(null); 
  const [alergiasPrincipal, setAlergiasPrincipal] = useState('');
  
  // Estados para el acompañante
  const [tieneAcompanante, setTieneAcompanante] = useState(null); 
  const [nombreAcompanante, setNombreAcompanante] = useState('');
  const [menuAcompanante, setMenuAcompanante] = useState(null); 
  const [alergiasAcompanante, setAlergiasAcompanante] = useState('');

  // Estados de carga (mientras sube a la BD) y éxito
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

    const handleEnviar = async () => {
    if (!nombre.trim()) {
      alert('Por favor, introduce tu nombre completo.');
      return;
    }
    if (!asistencia) {
      alert('Por favor, indica si podrás acompañarnos o no.');
      return;
    }

    setCargando(true);

    try {
      // Insertamos los datos mapeando correctamente los nombres de las variables en español
      const { error } = await supabase
        .from('asistencias')
        .insert([
          {
            nombre: nombre.trim(),
            asistencia: asistencia,
            menu_principal: asistencia === 'si' ? menuPrincipal : null,
            alergias_principal: asistencia === 'si' ? alergiasPrincipal.trim() : null,
            tiene_acompanante: asistencia === 'si' ? tieneAcompanante : null,
            nombre_acompanante: (asistencia === 'si' && tieneAcompanante === 'si') ? nombreAcompanante.trim() : null,
            menu_acompanante: (asistencia === 'si' && tieneAcompanante === 'si') ? menuAcompanante : null,
            alergias_acompanante: (asistencia === 'si' && tieneAcompanante === 'si') ? alergiasAcompanante.trim() : null,
          }
        ]);

      if (error) throw error;

      setEnviado(true);
    } catch (error) {
      console.error('Error al enviar la asistencia:', error.message);
      alert('Hubo un problema al enviar tu respuesta. Por favor, inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  // Pantalla de agradecimiento que se muestra tras confirmar con éxito
  if (enviado) {
    return (
      <View style={styles.container}>
        <View style={[styles.formCard, { width: isMobile ? '100%' : 650, alignItems: 'center', paddingVertical: 60 }]}>
          <Text style={[styles.title, { fontSize: 28, color: COLORS.verdeOlivo }]}>¡MUCHAS GRACIAS!</Text>
          <Text style={[styles.subtitle, { marginBottom: 0 }]}>
            Tu respuesta ha sido registrada correctamente. {asistencia === 'si' ? '¡Nos vemos muy pronto en la celebración!' : 'Lamentamos que no puedas venir, te echaremos de menos.'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
        CONFIRMA TU ASISTENCIA
      </Text>
      
      <Text style={styles.subtitle}>
        Por favor, indícanos tu respuesta antes del 15 de agosto para ayudarnos con la organización.
      </Text>

      <View style={[styles.formCard, { width: isMobile ? '100%' : 650 }]}>
        
        {/* Nombre completo */}
        <CustomInput
          label="Nombre y Apellidos"
          placeholder="Escribe tu nombre completo"
          value={nombre}
          onChangeText={setNombre}
          editable={!cargando}
        />

        {/* Selector: ¿Asiste? */}
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>¿PODRÁS ACOMPAÑARNOS?</Text>
          <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <TouchableOpacity
              disabled={cargando}
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
              disabled={cargando}
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

        {/* Campos condicionales del menú del invitado principal */}
        {asistencia === 'si' && (
          <View style={styles.seccionComensal}>
            <View style={styles.selectorContainer}>
              <Text style={styles.label}>EN EL MENÚ PREFERIRÉ:</Text>
              <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
                <TouchableOpacity
                  disabled={cargando}
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
                  disabled={cargando}
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
              editable={!cargando}
            />
          </View>
        )}

        {/* Pregunta por el acompañante */}
        {asistencia === 'si' && (
          <View style={[styles.selectorContainer, { marginTop: 15 }]}>
            <Text style={styles.label}>¿VIENES CON ACOMPAÑANTE?</Text>
            <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
              <TouchableOpacity
                disabled={cargando}
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
                disabled={cargando}
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

        {/* Campos condicionales del acompañante */}
        {asistencia === 'si' && tieneAcompanante === 'si' && (
          <View style={styles.animatedField}>
            <CustomInput
              label="Nombre y Apellidos del Acompañante"
              placeholder="Escribe el nombre completo de tu acompañante"
              value={nombreAcompanante}
              onChangeText={setNombreAcompanante}
              editable={!cargando}
            />

            <View style={[styles.selectorContainer, { marginTop: 10 }]}>
              <Text style={styles.label}>MI ACOMPAÑANTE PREFERIRÁ EN EL MENÚ:</Text>
              <View style={[styles.optionsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
                <TouchableOpacity
                  disabled={cargando}
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
                  disabled={cargando}
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
              editable={!cargando}
            />
          </View>
        )}

        <View style={styles.infoNotaContainer}>
          <Text style={styles.infoNotaText}>
            Debido a motivos logísticos no podemos extender esta invitación a los niños.
          </Text>
        </View>

        {/* Botón final con loader integrado */}
        {cargando ? (
          <ActivityIndicator size="small" color={COLORS.verdeOlivo} style={{ marginTop: 20 }} />
        ) : (
          <CustomButton
            title="Enviar Respuesta"
            onPress={handleEnviar}
            style={styles.submitBtn}
          />
        )}

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