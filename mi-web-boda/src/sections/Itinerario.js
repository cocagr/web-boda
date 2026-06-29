import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Linking } from 'react-native';
import { COLORS, FONTS } from '../styles/theme';

export default function Itinerario() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const renderPin = (address, url) => (
    <Text style={styles.pin} onPress={() => Linking.openURL(url)}>
      📍 {address}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>ITINERARIO</Text>

      {/* BLOQUE 1: Texto - Imagen */}
      <View style={[styles.section, { flexDirection: isMobile ? 'column' : 'row' }]}>
        <View style={styles.textContainer}>
          <Text style={styles.time}>12:00h - Servicio de Autobús desde Priego de Córdoba</Text>
          <Text style={styles.desc}>Para aquellos invitados alojados en Priego de Córdoba, se habilitará un servicio de traslado en autobús con destino a la ceremonia a las 12:00h. El punto exacto de salida está aún pendiente de confirmación.</Text>
          
          <Text style={styles.time}>13:00h- Ceremonia religiosa</Text>
          <Text style={styles.desc}>La ceremonia comenzará a las 13:00h en la Parroquia de Nuestra Señora de la Asunción y Ángeles, en Cabra.</Text>
          {renderPin('C. Mayor, 2, 14940 Cabra, Córdoba', 'https://maps.app.goo.gl/JVk8vm8CA84LcwAr8')}
        </View>
        <Image source={require('../assets/Itinerario2.jpeg')} style={styles.image} resizeMode="contain" />
      </View>

      {/* BLOQUE 2: Imagen - Texto */}
      <View style={[styles.section, { flexDirection: isMobile ? 'column-reverse' : 'row' }]}>
        <Image source={require('../assets/Itinerario1.jpeg')} style={styles.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.time}>14:00h- Traslado al lugar de la celebración</Text>
          <Text style={styles.desc}>Tras la finalización del oficio religioso, los autobuses recogerán a los invitados junto a la propia parroquia para proceder al traslado conjunto hacia el lugar de la celebración.</Text>
          
          <Text style={styles.time}>14:30h - Celebración</Text>
          <Text style={styles.desc}>La celebración tendrá lugar en Cortijo de Vargas.</Text>
          {renderPin('Cortijo de Vargas, Diseminados, 138, 14940 Cabra, Córdoba', 'https://maps.app.goo.gl/jY6TuqNKHZFErMFD7')}
          
          {/* En escritorio (no mobile), el texto se queda aquí dentro del textContainer */}
          {!isMobile && (
            <Text style={[styles.desc, { fontWeight: 'bold', marginTop: 10 }]}>
              Servicio de autobús de vuelta hacia Priego de Córdoba y Cabra. Horario y paradas aún por determinar.
            </Text>
          )}
        </View>
      </View>

      {/* En móvil, el texto se renderiza aquí fuera de la sección, quedando justo debajo de la imagen */}
      {isMobile && (
        <Text style={[styles.desc, { fontWeight: 'bold', marginTop: 20, textAlign: 'center', paddingHorizontal: 20 }]}>
          Servicio de autobús de vuelta hacia Priego de Córdoba y Cabra. Horario y paradas aún por determinar.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', backgroundColor: COLORS.bgCremaAlt, paddingVertical: 80, paddingHorizontal: 24, alignItems: 'center' },
  mainTitle: { fontFamily: FONTS.titulo, fontSize: 40, color: COLORS.negroSuave, marginBottom: 60, letterSpacing: 2 },
  section: { maxWidth: 1000, width: '100%', marginBottom: 60, alignItems: 'center', justifyContent: 'space-between' },
  textContainer: { flex: 1, padding: 20 },
  image: { width: '100%', maxWidth: 400, height: 300, borderRadius: 10 },
  time: { fontFamily: FONTS.titulo, fontSize: 20, color: COLORS.verdeOlivo, marginBottom: 8 },
  desc: { fontFamily: FONTS.cuerpo, fontSize: 15, color: COLORS.negroSuave, lineHeight: 22, marginBottom: 10 },
  pin: { fontFamily: FONTS.cuerpo, fontSize: 14, color: COLORS.doradoSuave, fontWeight: '700', textDecorationLine: 'underline', marginBottom: 15 }
});