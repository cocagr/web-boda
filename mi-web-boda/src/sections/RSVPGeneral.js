import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { COLORS, FONTS } from '../styles/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { supabase } from '../config/supabaseClient';

export default function RSVPGeneral() {
  // Estado único para todo el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    asistencia: null,
    menu: null,
    alergias: '',
    tieneAcompanante: null,
    nombreAcompanante: '',
    alojamiento: null,
    usaAutobus: null
  });

  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = async () => {
    if (!formData.nombre.trim() || !formData.asistencia || !formData.alojamiento) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    setCargando(true);
    try {
      const { error } = await supabase.from('asistencias').insert([{
        nombre: formData.nombre.trim(),
        asistencia: formData.asistencia,
        menu_principal: formData.menu,
        alergias_principal: formData.alergias,
        tiene_acompanante: formData.tieneAcompanante,
        nombre_acompanante: formData.nombreAcompanante,
        alojamiento: formData.alojamiento,
        usa_autobus: formData.alojamiento === 'otro' ? false : formData.usaAutobus === 'si'
      }]);

      if (error) throw error;
      setEnviado(true);
    } catch (e) {
      alert('Error al enviar. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  if (enviado) return <Text style={styles.title}>¡Gracias por confirmar todo!</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONFIRMACIÓN COMPLETA</Text>
      
      <View style={styles.card}>
        <CustomInput 
          label="Nombre Completo" 
          value={formData.nombre} 
          onChangeText={(val) => setFormData({...formData, nombre: val})} 
        />
        
        {/* Aquí irían tus selectores de Asistencia, Alojamiento, etc. */}
        {/* Puedes mapear formData actualizando solo el campo necesario */}
        
        {cargando ? <ActivityIndicator /> : <CustomButton title="Enviar todo" onPress={handleEnviar} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  title: { fontFamily: FONTS.titulo, fontSize: 32, marginBottom: 20 },
  card: { width: '100%', maxWidth: 650, padding: 40, backgroundColor: COLORS.blanco, borderRadius: 8 }
});