// Importa ReactDOM para renderizar el componente principal
import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa el componente principal App
import App from './App.jsx';
// Importa Bootstrap para estilos y componentes visuales
import 'bootstrap/dist/css/bootstrap.min.css';
// Crea el punto de entrada raíz y renderiza la App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);