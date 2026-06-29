// src/components/Navbar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { COLORS, getDeviceType } from '../styles/theme';

export default function Navbar({ activeSection, scrollToSection }) {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 'bienvenida', label: '¡BIENVENIDOS!' },
    { id: 'fecha', label: 'FECHA Y LUGAR' },
    { id: 'rsvp', label: 'CONFIRMA TU ASISTENCIA' },
    { id: 'regalo', label: '2 CORINTIOS 9:7'},
  ];

  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return (
      <View style={styles.navContainer}>
        <View style={styles.mobileHeader}>
          <Text style={styles.logoText}>L & L</Text>
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Text style={styles.menuButton}>{menuOpen ? '✕' : '☰'}</Text>
          </TouchableOpacity>
        </View>

        {menuOpen && (
          <View style={styles.mobileMenu}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.mobileItem}
                onPress={() => {
                  scrollToSection(item.id);
                  setMenuOpen(false);
                }}
              >
                <Text style={[styles.menuText, activeSection === item.id && styles.activeItemMobile]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.desktopNav}>
      {menuItems.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => scrollToSection(item.id)}>
          <Text style={[styles.menuText, activeSection === item.id && styles.activeItem]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.bgCrema,
  },
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  logoText: {
    fontFamily: 'Playfair Display',
    fontSize: 20,
    color: COLORS.negroSuave,
  },
  menuButton: {
    fontSize: 24,
    color: COLORS.negroSuave,
  },
  mobileMenu: {
    backgroundColor: COLORS.bgCrema,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  mobileItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  desktopNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingVertical: 25,
    backgroundColor: COLORS.bgCrema,
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  menuText: {
    fontFamily: 'Lato',
    fontSize: 13,
    letterSpacing: 2,
    color: COLORS.negroSuave,
  },
  activeItem: {
    color: COLORS.verdeOlivo,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.verdeOlivo,
  },
  activeItemMobile: {
    color: COLORS.verdeOlivo,
    fontWeight: '700',
  }
});