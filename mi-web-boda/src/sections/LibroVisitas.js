// src/sections/LibroVisitas.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, FlatList, Platform } from 'react-native';
import { COLORS, FONTS, getDeviceType } from '../styles/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function LibroVisitas() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const isMobile = deviceType === 'mobile';

  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [dedicatoria, setDedicatoria] = useState('');
  
  // Datos de ejemplo (Mock data)
  const [mensajes, setMensajes] = useState([
    { id: '1', nombre: 'Familia García', texto: '¡Estamos deseando que llegue el gran día! Os queremos muchísimo.' },
    { id: '2', nombre: 'Carlos y Elena', texto: 'Gracias por hacernos partícipes de vuestra felicidad. ¡Va a ser una boda increíble!' },
    { id: '3', nombre: 'Abuela María', texto: 'Que Dios os bendiga en esta nueva etapa. Laura, estás preciosa en ese cuadro.' },
  ]);

  const handlePublicar = () => {
    if (nombre && dedicatoria) {
      const nuevoMensaje = {
        id: Date.now().toString(),
        nombre: nombre,
        texto: dedicatoria,
      };
      setMensajes([nuevoMensaje, ...mensajes]);
      setNombre('');
      setDedicatoria('');
      alert('¡Gracias por tu dedicatoria!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: isMobile ? 32 : 40 }]}>
        LIBRO DE VISITAS
      </Text>
      <Text style={styles.subtitle}>
        Dejadnos un mensaje, un deseo o una anécdota. Nos encantará leer vuestras palabras después del gran día.
      </Text>

      {/* Formulario de entrada */}
      <View style={[styles.formCard, { width: isMobile ? '100%' : 600 }]}>
        <CustomInput
          label="Tu Nombre"
          placeholder="¿Quién escribe?"
          value={nombre}
          onChangeText={setNombre}
        />
        <CustomInput
          label="Tu Dedicatoria"
          placeholder="Escribe aquí tu mensaje para Laura y Leandro..."
          value={dedicatoria}
          onChangeText={setDedicatoria}
          multiline
        />
        <CustomButton
          title="Dejar mi mensaje"
          onPress={handlePublicar}
          style={styles.btn}
        />
      </View>

      {/* Feed de Mensajes */}
      <View style={[styles.feedContainer, { width: isMobile ? '100%' : 800 }]}>
        {mensajes.map((item) => (
          <View key={item.id} style={styles.messageCard}>
            <Text style={styles.messageName}>{item.nombre}</Text>
            <View style={styles.separator} />
            <Text style={styles.messageText}>"{item.texto}"</Text>
          </View>
        ))}
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
    maxWidth: 600,
    lineHeight: 24,
    marginBottom: 50,
  },
  formCard: {
    backgroundColor: COLORS.blanco,
    padding: 30,
    borderRadius: 8,
    marginBottom: 60,
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 30px rgba(44, 44, 44, 0.05)',
      },
      default: {
        elevation: 3,
      }
    }),
  },
  btn: {
    marginTop: 10,
  },
  feedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  messageCard: {
    backgroundColor: COLORS.blanco,
    width: Platform.OS === 'web' ? 350 : '100%',
    padding: 25,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.doradoSuave, // Detalle artístico lateral
    marginBottom: 10,
    ...Platform.select({
      web: {
        transition: 'transform 0.3s ease',
      }
    })
  },
  messageName: {
    fontFamily: FONTS.titulo,
    fontSize: 18,
    color: COLORS.verdeOlivo,
    marginBottom: 8,
  },
  separator: {
    width: 30,
    height: 1,
    backgroundColor: '#E0DCD5',
    marginBottom: 12,
  },
  messageText: {
    fontFamily: FONTS.cuerpo,
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.negroSuave,
    lineHeight: 22,
    fontWeight: '300',
  },
});