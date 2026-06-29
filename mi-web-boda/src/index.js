// src/index.js
import { AppRegistry } from 'react-native';
import App from './App';

// Registramos la aplicación en React Native
AppRegistry.registerComponent('App', () => App);

// La hacemos correr en la web apuntando al contenedor "root" de tu index.html
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});