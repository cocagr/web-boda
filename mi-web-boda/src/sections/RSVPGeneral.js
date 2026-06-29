import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { supabase } from '../config/supabaseClient';

export default function RSVPGeneral() {
  const [formData, setFormData] = useState({
    nombre: '',
    asistencia: null, // 'si', 'no'
    menu: null, // 'lubina', 'solomillo'
    alergias: '',
    alojamiento: null, // 'priego', 'cabra', 'otro'
    usaAutobus: null // 'si', 'no'
  });

  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = async () => {
    if (!formData.nombre.trim() || !formData.asistencia || !formData.alojamiento) {
      alert('Por favor, completa los campos obligatorios (Nombre, Asistencia y Alojamiento).');
      return;
    }

    setCargando(true);
    try {
      const { error } = await supabase.from('asistencias').insert([{
        nombre: formData.nombre.trim(),
        asistencia: formData.asistencia,
        menu_principal: formData.menu,
        alergias_principal: formData.alergias,
        alojamiento: formData.alojamiento,
        usa_autobus: formData.alojamiento === 'otro' ? false : formData.usaAutobus === 'si'
      }]);

      if (error) throw error;
      setEnviado(true);
    } catch (e) {
      console.error(e);
      alert('Error al enviar. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  if (enviado) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>¡MUCHAS GRACIAS!</Text>
          <Text style={styles.text}>Tu confirmación ha sido recibida correctamente.</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CONFIRMACIÓN DE ASISTENCIA</Text>
      
      <View style={styles.card}>
        <CustomInput label="Nombre y Apellidos" value={formData.nombre} onChangeText={(t) => setFormData({...formData, nombre: t})} />

        <Text style={styles.label}>¿PODRÁS ACOMPAÑARNOS?</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setFormData({...formData, asistencia: 'si'})} style={[styles.option, formData.asistencia === 'si' && styles.selected]}><Text>SÍ</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setFormData({...formData, asistencia: 'no'})} style={[styles.option, formData.asistencia === 'no' && styles.selected]}><Text>NO</Text></TouchableOpacity>
        </View>

        {formData.asistencia === 'si' && (
          <>
            <Text style={styles.label}>¿MENÚ?</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setFormData({...formData, menu: 'lubina'})} style={[styles.option, formData.menu === 'lubina' && styles.selected]}><Text>LUBINA</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setFormData({...formData, menu: 'solomillo'})} style={[styles.option, formData.menu === 'solomillo' && styles.selected]}><Text>SOLOMILLO</Text></TouchableOpacity>
            </View>
            <CustomInput label="Alergias" value={formData.alergias} onChangeText={(t) => setFormData({...formData, alergias: t})} />
          </>
        )}

        <Text style={styles.label}>¿DÓNDE TE ALOJAS?</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setFormData({...formData, alojamiento: 'priego'})} style={[styles.option, formData.alojamiento === 'priego' && styles.selected]}><Text>PRIEGO</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setFormData({...formData, alojamiento: 'cabra'})} style={[styles.option, formData.alojamiento === 'cabra' && styles.selected]}><Text>CABRA</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setFormData({...formData, alojamiento: 'otro'})} style={[styles.option, formData.alojamiento === 'otro' && styles.selected]}><Text>OTRO</Text></TouchableOpacity>
        </View>

        {formData.alojamiento && formData.alojamiento !== 'otro' && (
          <>
            <Text style={styles.label}>¿USARÁS AUTOBÚS?</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setFormData({...formData, usaAutobus: 'si'})} style={[styles.option, formData.usaAutobus === 'si' && styles.selected]}><Text>SÍ</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setFormData({...formData, usaAutobus: 'no'})} style={[styles.option, formData.usaAutobus === 'no' && styles.selected]}><Text>NO</Text></TouchableOpacity>
            </View>
          </>
        )}

        {cargando ? <ActivityIndicator size="large" /> : <CustomButton title="Confirmar todo" onPress={handleEnviar} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 50, alignItems: 'center' },
  card: { width: '90%', maxWidth: 600, padding: 30, backgroundColor: COLORS.blanco, borderRadius: 8 },
  title: { fontFamily: FONTS.titulo, fontSize: 28, marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 12, marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  option: { flex: 1, padding: 15, borderWidth: 1, borderColor: '#ccc', marginHorizontal: 5, alignItems: 'center' },
  selected: { borderColor: COLORS.verdeOlivo, backgroundColor: '#f0f0f0' },
  text: { textAlign: 'center', fontSize: 16 }
});