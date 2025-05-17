// Importa los módulos necesarios de React y react-bootstrap
import React, { useState, useEffect } from 'react';
import { Pagination, Button, Form, Table } from 'react-bootstrap';
// Importa los estilos personalizados para el componente RosterTable
import '../styles/rosterTable.css';
// Importa los datos de los jugadores
import { players as allPlayers } from '../data/players';

// Define el componente funcional RosterTable
const RosterTable = () => {
  // Hook de estado para gestionar la lista de jugadores a mostrar
  const [players, setPlayers] = useState(allPlayers);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightEven, setHighlightEven] = useState(false);
  const [highlightOdd, setHighlightOdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5;

  // Hook de efecto para filtrar jugadores según el término de búsqueda
  useEffect(() => {
    const filtered = allPlayers.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPlayers(filtered);
    setCurrentPage(1);
    setHighlightEven(false);
    setHighlightOdd(false);
  }, [searchTerm]);

  // Función para filtrar jugadores por un rango de números
  const filterRange = (min, max) => {
    const filtered = allPlayers.filter(p => p.number >= min && p.number <= max);
    setPlayers(filtered);
    setCurrentPage(1);
    setHighlightEven(false);
    setHighlightOdd(false);
  };

  // Función para restablecer la tabla a su estado inicial
  const resetFilters = () => {
    setPlayers(allPlayers);
    setSearchTerm('');
    setHighlightEven(false);
    setHighlightOdd(false);
    setCurrentPage(1);
  };

  // Calcula los jugadores a mostrar en la página actual
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(players.length / playersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="roster container mt-4">
      <h2 className="roster__title mb-4">ROSTER</h2>

      <Form.Control
        type="text"
        placeholder="Buscar por nombre jugador..."
        className="roster__search mb-3"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="roster__buttons mb-3">
        <Button variant="primary" className="me-2" onClick={() => {
          setHighlightEven(true);
          setHighlightOdd(false);
        }}>
          Pintar Pares
        </Button>

        <Button variant="secondary" className="me-2" onClick={() => {
          setHighlightOdd(true);
          setHighlightEven(false);
        }}>
          Pintar Impares
        </Button>

        <Button variant="success" className="me-2" onClick={() => filterRange(1, 10)}>
          Traer de 1 a 10
        </Button>

        <Button variant="warning" className="me-2" onClick={() => filterRange(11, 20)}>
          Traer de 11 a 20
        </Button>

        {/* Botón para limpiar la tabla */}
        <Button variant="danger" className="me-2" onClick={resetFilters}>
          Limpiar
        </Button>
      </div>

      <Table striped bordered hover className="roster__table">
        <thead>
          <tr className="roster__table-header">
            <th>#</th>
            <th>PLAYER</th>
            <th>TEAM</th>
            <th>POSITION</th>
          </tr>
        </thead>
        <tbody>
          {currentPlayers.map((player) => {
            const isEven = highlightEven && player.number % 2 === 0;
            const isOdd = highlightOdd && player.number % 2 !== 0;

            return (
              <tr
                key={player.number}
                className={`roster__row ${isEven ? "roster__row--highlight" : ""} ${isOdd ? "roster__row--highlight" : ""}`}
              >
                <td>{String(player.number).padStart(2, '0')}</td>
                <td>{player.name.toUpperCase()}</td>
                <td>{player.team}</td>
                <td>{player.position.toUpperCase()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => paginate(idx + 1)}>
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default RosterTable;