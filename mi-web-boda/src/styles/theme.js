// src/styles/theme.js
import { Dimensions } from 'react-native';

// 1. Paleta de colores oficial del plan de diseño
export const COLORS = {
  bgCrema: '#F7F4EF',       // Fondo principal elegante
  bgCremaAlt: '#F1EDE6',    // Para contrastar secciones (un tono más oscuro)
  verdeOlivo: '#6B7C4A',    // Color de acento, botones, enlaces y hojas
  verdeOlivoOscuro: '#5A693E', // Variación para efectos hover / presionado
  negroSuave: '#2C2C2C',    // Para texto principal (más suave y elegante que el negro puro)
  doradoSuave: '#C9A96E',   // Detalles, bordes decorativos o fechas
  blanco: '#FFFFFF',        // Fondos de tarjetas y campos de entrada
};

// 2. Breakpoints para el diseño responsive (en píxeles)
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

// 3. Tipografías configuradas en el index.html
export const FONTS = {
  titulo: 'Playfair Display', // Para encabezados, nombres, fechas importantes
  cuerpo: 'Lato',             // Para textos largos, formularios y menús
};

/**
 * Función auxiliar para determinar dinámicamente el tipo de dispositivo 
 * en función del ancho de la pantalla en tiempo real.
 */
export const getDeviceType = (width) => {
  if (width < BREAKPOINTS.tablet) return 'mobile';
  if (width < BREAKPOINTS.desktop) return 'tablet';
  return 'desktop';
};