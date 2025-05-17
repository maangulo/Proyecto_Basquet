// Importa React
import React from 'react';
// Importa tu componente RosterTable
import RosterTable from './components/RosterTable';

// Componente App (punto central del frontend)
function App() {
  return (
    <div className="App">
      {/* Se muestra la tabla de jugadores */}
      <RosterTable />
    </div>
  );
}

export default App;
