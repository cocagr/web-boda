// src/App.js
import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { COLORS } from './styles/theme';
import Navbar from './components/Navbar';
import Regalo from './sections/Regalo';
import Hero from './sections/Hero';
import Bienvenida from './sections/Bienvenida';
import FechaLugar from './sections/Itinerario';
import RSVPGeneral from './sections/RSVPGeneral';
import Contacto from './sections/Contacto';
import Itinerario from './sections/Itinerario';

export default function App() {
  const scrollViewRef = useRef(null);
  const [activeSection, setActiveSection] = useState('bienvenida');
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);

    if (Platform.OS === 'web') {
      // Buscamos el elemento HTML real directamente por su ID
      const element = document.getElementById(sectionId);
      if (element) {
        // Hace que el navegador deslice de forma nativa e independiente
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Lógica nativa de fallback para móvil (iOS/Android) si fuera necesario
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Menú Superior Fijo en Pantalla */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Contenedor de Scroll Principal */}
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Usamos divs/views con IDs limpios y el truco de scrollMarginTop en estilos de línea para asegurar compatibilidad web */}
        <View id="hero" style={{ scrollMarginTop: 75 }}>
          <Hero />
        </View>

        <View id="bienvenida" style={{ scrollMarginTop: 75 }}>
          <Bienvenida />
        </View>

        <View id="itinerario" style={{ scrollMarginTop: 75 }}>
          <Itinerario />
        </View>

        <View id="rsvp" style={{ scrollMarginTop: 75 }}>
          <RSVPGeneral />
        </View>

        <View id="regalo" style={{ scrollMarginTop: 75 }}>
          <Regalo />
        </View>

        <View id="contacto" style={{ scrollMarginTop: 75 }}>
          <Contacto />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgCrema,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'column',
  },
});