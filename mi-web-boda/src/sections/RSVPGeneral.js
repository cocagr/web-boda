// src/sections/RSVPGeneral.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomButton from '../components/CustomButton';
import { supabase } from '../config/supabaseClient';

export default function RSVPGeneral() {
  const { width } = useWindowDimensions();
  const isMobile = getDeviceType(width) === 'mobile';

  const [formData, setFormData] = useState({
    nombre: '', asistencia: null, menu: null, alergias: '',
    tieneAcompanante: null, nombreAcomp: '', menuAcomp: null, alergiasAcomp: '',
    alojamiento: null, usaAutobus: null
  });

  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = async () => {
    if (!formData.nombre.trim() || !formData.asistencia || !formData.alojamiento) {
      alert('Por favor, rellena los campos obligatorios.');
      return;
    }
    setCargando(true);
    try {
      const { error } = await supabase.from('asistencias').insert([{
        nombre: formData.nombre.trim(), asistencia: formData.asistencia,
        menu_principal: formData.menu, alergias_principal: formData.alergias,
        tiene_acompanante: formData.tieneAcompanante === 'si',
        nombre_acompanante: formData.nombreAcomp, menu_acompanante: formData.menuAcomp,
        alergias_acompanante: formData.alergiasAcomp,
        alojamiento: formData.alojamiento,
        usa_autobus: formData.alojamiento === 'otro' ? false : formData.usaAutobus === 'si'
      }]);
      if (error) throw error;
      setEnviado(true);
    } catch (e) { alert('Error al enviar.'); } finally { setCargando(false); }
  };

  if (enviado) return <View style={styles.container}><Text style={styles.title}>¡MUCHAS GRACIAS!</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>CONFIRMA TU ASISTENCIA</Text>
      <Text style={styles.mainSubtitle}>Por favor, indícanos tu respuesta antes del 15 de agosto para ayudarnos con la organización.</Text>
      
      <View style={[styles.card, { width: isMobile ? '100%' : 700 }]}>
        
        <Text style={styles.label}>NOMBRE Y APELLIDOS</Text>
        <TextInput style={styles.input} placeholder="Escribe tu nombre completo" placeholderTextColor="#A09B90" value={formData.nombre} onChangeText={(t) => setFormData({...formData, nombre: t})} />

        <Text style={styles.label}>¿PODRÁS ACOMPAÑARNOS?</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity onPress={() => setFormData({...formData, asistencia: 'si'})} style={[styles.optionButton, formData.asistencia === 'si' && styles.optionSelected]}><Text style={formData.asistencia === 'si' ? styles.optTextSel : styles.optText}>SÍ, ¡ALLÍ ESTARÉ!</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setFormData({...formData, asistencia: 'no'})} style={[styles.optionButton, formData.asistencia === 'no' && styles.optionSelected]}><Text style={formData.asistencia === 'no' ? styles.optTextSel : styles.optText}>NO PODRÉ ASISTIR</Text></TouchableOpacity>
        </View>

        {formData.asistencia === 'si' && (
          <View>
            <Text style={styles.label}>EN EL MENÚ PREFERIRÉ:</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity onPress={() => setFormData({...formData, menu: 'lubina'})} style={[styles.optionButton, formData.menu === 'lubina' && styles.optionSelected]}><Text style={formData.menu === 'lubina' ? styles.optTextSel : styles.optText}>🐟 LUBINA</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setFormData({...formData, menu: 'solomillo'})} style={[styles.optionButton, formData.menu === 'solomillo' && styles.optionSelected]}><Text style={formData.menu === 'solomillo' ? styles.optTextSel : styles.optText}>🥩 SOLOMILLO DE TERNERA</Text></TouchableOpacity>
            </View>

            <Text style={styles.label}>¿TIENES ALGUNA ALERGIA, INTOLERANCIA O MENÚ ESPECIAL?</Text>
            <TextInput style={styles.input} placeholder="Ej: Celíaco, vegetariano, alergia a los frutos secos..." placeholderTextColor="#A09B90" value={formData.alergias} onChangeText={(t) => setFormData({...formData, alergias: t})} />

            <Text style={styles.label}>¿TRAES ACOMPAÑANTE?</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity onPress={() => setFormData({...formData, tieneAcompanante: 'si'})} style={[styles.optionButton, formData.tieneAcompanante === 'si' && styles.optionSelected]}><Text style={formData.tieneAcompanante === 'si' ? styles.optTextSel : styles.optText}>SÍ</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setFormData({...formData, tieneAcompanante: 'no'})} style={[styles.optionButton, formData.tieneAcompanante === 'no' && styles.optionSelected]}><Text style={formData.tieneAcompanante === 'no' ? styles.optTextSel : styles.optText}>NO</Text></TouchableOpacity>
            </View>

            {formData.tieneAcompanante === 'si' && (
              <View>
                <Text style={styles.label}>NOMBRE Y APELLIDOS DEL ACOMPAÑANTE</Text>
                <TextInput style={styles.input} value={formData.nombreAcomp} onChangeText={(t) => setFormData({...formData, nombreAcomp: t})} />
                <Text style={styles.label}>PREFERENCIA DE MENÚ DEL ACOMPAÑANTE</Text>
                <View style={styles.optionsRow}>
                    <TouchableOpacity onPress={() => setFormData({...formData, menuAcomp: 'lubina'})} style={[styles.optionButton, formData.menuAcomp === 'lubina' && styles.optionSelected]}><Text style={formData.menuAcomp === 'lubina' ? styles.optTextSel : styles.optText}>🐟 LUBINA</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setFormData({...formData, menuAcomp: 'solomillo'})} style={[styles.optionButton, formData.menuAcomp === 'solomillo' && styles.optionSelected]}><Text style={formData.menuAcomp === 'solomillo' ? styles.optTextSel : styles.optText}>🥩 SOLOMILLO DE TERNERA</Text></TouchableOpacity>
                </View>
                <Text style={styles.label}>ALERGIAS DEL ACOMPAÑANTE</Text>
                <TextInput style={styles.input} value={formData.alergiasAcomp} onChangeText={(t) => setFormData({...formData, alergiasAcomp: t})} />
              </View>
            )}

            <View style={styles.infoAlojamiento}>
                <Text style={styles.infoText}>En cuanto al alojamiento, recomendamos la estancia en Cabra o Priego de Córdoba, ya que será desde donde haya servicio de autobús de ida y vuelta. Para hacerlo más fácil, hemos bloqueado habitaciones en los siguientes hoteles: </Text>
                <Text style={styles.hotelText}>• Hotel Fuente Las Piedras (Cabra): 957 52 97 40</Text>
                <Text style={styles.hotelText}>• Hotel Rio Piscina (Priego de Córdoba): 957 70 01 86</Text>
                <Text style={styles.infoText}>Para reservar, llamar diciendo que es la reserva para la boda de Laura y Leandro.</Text>
            </View>

            <Text style={styles.label}>¿DÓNDE TE ALOJAS?</Text>
            <View style={styles.optionsRow}>
                <TouchableOpacity onPress={() => setFormData({...formData, alojamiento: 'priego'})} style={[styles.optionButton, formData.alojamiento === 'priego' && styles.optionSelected]}><Text style={formData.alojamiento === 'priego' ? styles.optTextSel : styles.optText}>PRIEGO</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setFormData({...formData, alojamiento: 'cabra'})} style={[styles.optionButton, formData.alojamiento === 'cabra' && styles.optionSelected]}><Text style={formData.alojamiento === 'cabra' ? styles.optTextSel : styles.optText}>CABRA</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setFormData({...formData, alojamiento: 'otro'})} style={[styles.optionButton, formData.alojamiento === 'otro' && styles.optionSelected]}><Text style={formData.alojamiento === 'otro' ? styles.optTextSel : styles.optText}>OTRO</Text></TouchableOpacity>
            </View>

            {formData.alojamiento && formData.alojamiento !== 'otro' && (
                <View>
                    <Text style={styles.label}>¿USARÁS EL AUTOBÚS?</Text>
                    <View style={styles.optionsRow}>
                        <TouchableOpacity onPress={() => setFormData({...formData, usaAutobus: 'si'})} style={[styles.optionButton, formData.usaAutobus === 'si' && styles.optionSelected]}><Text style={formData.usaAutobus === 'si' ? styles.optTextSel : styles.optText}>SÍ</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setFormData({...formData, usaAutobus: 'no'})} style={[styles.optionButton, formData.usaAutobus === 'no' && styles.optionSelected]}><Text style={formData.usaAutobus === 'no' ? styles.optTextSel : styles.optText}>NO</Text></TouchableOpacity>
                    </View>
                </View>
            )}
          </View>
        )}
        
        {cargando ? <ActivityIndicator size="small" /> : <CustomButton title="Confirmar asistencia" onPress={handleEnviar} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 60, paddingHorizontal: 20, alignItems: 'center', backgroundColor: '#F9F7F2' },
  mainTitle: { fontFamily: FONTS.titulo, fontSize: 32, color: '#333', marginBottom: 20, textAlign: 'center', letterSpacing: 1 },
  mainSubtitle: { fontFamily: FONTS.cuerpo, fontSize: 15, color: '#666', marginBottom: 40, textAlign: 'center', maxWidth: 500 },
  card: { backgroundColor: '#FFFFFF', padding: 40, borderRadius: 2, borderWidth: 1, borderColor: '#EEE' },
  label: { fontSize: 11, color: '#444', fontWeight: '600', marginBottom: 12, letterSpacing: 1.5 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#DDD', borderRadius: 2, paddingHorizontal: 15, marginBottom: 25, backgroundColor: '#FFF' },
  optionsRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  optionButton: { flex: 1, paddingVertical: 15, borderWidth: 1, borderColor: '#DDD', alignItems: 'center', borderRadius: 2 },
  optionSelected: { borderColor: COLORS.verdeOlivo, backgroundColor: '#FDFDFC' },
  optText: { fontSize: 13, color: '#888' },
  optTextSel: { fontSize: 13, color: COLORS.verdeOlivo, fontWeight: '600' },
  infoAlojamiento: { marginVertical: 20, padding: 15, backgroundColor: '#F9F9F9', borderRadius: 2, borderWidth: 1, borderColor: '#EEE' },
  infoText: { fontSize: 13, color: '#666', marginBottom: 8, lineHeight: 20 },
  hotelText: { fontSize: 13, fontWeight: '600', color: COLORS.verdeOlivo, marginBottom: 5 }
});