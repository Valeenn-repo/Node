import React, { useState, useEffect } from 'react';
import TopBar from "./TopBar";
import InformeColeccion from './InformeColeccion';
import InformeUsuarios from './InformeUsuarios';
import { Button, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

/**
 * @description Componente que gestiona la visualización de informes de colección y usuarios.
 */
function Informes() {
  /**
   * @description Estado para almacenar los datos de la colección.
   */
  const [items, setItems] = useState([]);
  /**
   * @description Estado para almacenar los datos de los usuarios.
   */
  const [itemsUser, setItemsUser] = useState([]);

  /**
   * @description Estado para controlar la visibilidad del informe de colección.
   */
  const [variable, setVariable] = useState(false);
  /**
   * @description Estado para controlar la visibilidad del informe de usuarios.
   */
  const [variableUser, setVariableUser] = useState(false);

  /**
   * @description Función para mostrar el informe de colección.
   */
  const handleClick = () => {
    setVariable(true);
  };

  /**
   * @description Función para mostrar el informe de usuarios y cargar los datos.
   */
  const handleClickUser = () => {
    setVariableUser(true);
    recuperarUsuarios();
  };

  /**
   * @description Función para obtener los datos de los usuarios desde el servidor.
   */
  const recuperarUsuarios = () => {
    fetch('http://localhost:3030/getItemsUser')
      .then(response => response.json())
      .then(data => {
        console.log("Datos recuperados (usuarios): ", data);
        if (Array.isArray(data.data)) {
          setItemsUser(data.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos de usuarios:', error);
      });
  };

  /**
   * @description Efecto secundario para cargar los datos de la colección al montar el componente.
   */
  useEffect(() => {
    fetch('http://localhost:3030/getItems')
      .then(response => response.json())
      .then(data => {
        console.log("Datos recuperados (colección): ", data);
        if (Array.isArray(data.data)) {
          setItems(data.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos de la colección:', error);
      });
  }, []);

  return (
    <>
      <TopBar />
      <Paper elevation={3} style={{ padding: '50px', marginTop: '20px' }}>
        <Typography align="center" style={{ marginBottom: '25px' }}>
          <Tooltip title="Generar informe de colección" placement="right-start" arrow>
            <Button variant="contained" onClick={handleClick}>
              Generar Informe Coleccion
            </Button>
          </Tooltip>
        </Typography>

        <Typography align="center" style={{ marginBottom: '25px' }}>
          <Tooltip title="Generar informe de usuarios" placement="right-start" arrow>
            <Button variant="contained" onClick={handleClickUser}>
              Generar Informe Usuarios
            </Button>
          </Tooltip>
        </Typography>
      </Paper>

      {/* Condicional para mostrar los informes */}
      {(variableUser || variable) && (
        <Paper elevation={15} style={{ background: '#FFF', padding: '20px', marginTop: '20px' }}>
          {variable && <InformeColeccion datos={items} />}
          {variableUser && <InformeUsuarios datos={itemsUser} />}
        </Paper>
      )}
    </>
  );
}

export default Informes;