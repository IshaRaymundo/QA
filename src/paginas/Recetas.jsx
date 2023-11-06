import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsEye, BsPencil } from 'react-icons/bs';
import Navbar from '../componentes/Navbar';
import { Link } from 'react-router-dom';

const ListaRecetas = () => {
  const nombreQuesoCellStyle = {
    width: '40%',
  };

  const nombreRecetaCellStyle = {
    width: '40%',
  };

  const tableStyle = {
    border: '2px solid black',
  };

  const tableCellStyle = {
    border: '1px solid #ccc',
  };

  const accionesCellStyle = {
    width: '20%',
  };

  const yellowBackgroundStyle = {
    backgroundColor: '#FCDB30',
  };

  const addButtonStyle = {
    background: '#f78c29',
    border: '1px solid #f78c29',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '5px 10px',
    color: 'white',
    marginBottom: '20px',
  };

  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/obtenerRecetas')
      .then((response) => response.json())
      .then((data) => {
        setRecetas(data.recetas);
      })
      .catch((error) => {
        console.error('Error al obtener las recetas:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <table className="table table-bordered" style={tableStyle}>
          <thead>
            <tr>
              <th colSpan="4" style={{ ...yellowBackgroundStyle, border: '2px solid black' }}>
                Lista de Recetas
              </th>
            </tr>
            <tr>
              <th style={tableCellStyle}>ID</th>
              <th style={{ ...nombreQuesoCellStyle, ...tableCellStyle }}>Nombre del Queso</th>
              <th style={{ ...nombreRecetaCellStyle, ...tableCellStyle }}>Nombre de la Receta</th>
              <th style={{ ...accionesCellStyle, ...tableCellStyle }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recetas.map((receta) => (
              <tr key={receta.id}>
                <td style={tableCellStyle}>{receta.id}</td>
                <td style={{ ...nombreQuesoCellStyle, ...tableCellStyle }}>{receta.nombre_queso}</td>
                <td style={{ ...nombreRecetaCellStyle, ...tableCellStyle }}>{receta.nombre_receta}</td>
                <td style={{ ...accionesCellStyle, ...tableCellStyle }}>
                  <Link to={`/verReceta/${receta.id}`}>
                    <BsEye size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} />
                  </Link>
                  <Link to={`/editarReceta/${receta.id}`}>
                    <BsPencil size={20} style={{ cursor: 'pointer', color: 'green' }} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={addButtonStyle}>Agregar Receta</button>
      </div>
    </div>
  );
};

export default ListaRecetas;
