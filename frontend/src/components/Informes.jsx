import React, { useState, useEffect } from 'react';
import TopBar from "./TopBar";
import InformeColeccion from './InformeColeccion';
import InformeUsuarios from './InformeUsuarios';
import { Button, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';


function Informes() {

    
    const [items, setItems] = useState([]);
    const [itemsUser, setItemsUser] = useState([])

    // Estado para almacenar la variable
    const [variable, setVariable] = useState(false);
    const [variableUser, setVariableUser] = useState(false);

    // Función para cambiar la variable a true al hacer clic
    const handleClick = () => {
        setVariable(true);
    }

    // Función para cambiar la variable a true al hacer clic
    const handleClickUser = () => {
        setVariableUser(true);
    }

    const recuperarUsuarios = () => {
        fetch('http://localhost:3030/getItemsUser')
        .then(response => response.json())
        .then(data => {
          console.log("Datos recuperados: ", data);
          if (Array.isArray(data.data)) {
            setItemsUser(data.data); // Si 'data' es un array, actualizar 'items'
            
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
          // Manejar errores o mostrar mensajes de error
        });
    }

    useEffect(() => {
        fetch('http://localhost:3030/getItems')
          .then(response => response.json())
          .then(data => {
            console.log("Datos recuperados: ", data);
            if (Array.isArray(data.data)) {
              setItems(data.data); // Si 'data' es un array, actualizar 'items'
              
            }
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
            // Manejar errores o mostrar mensajes de error
          });
      }, []);




    return (
        <>
            <TopBar />
            <Paper elevation={3} style={{ padding: '50px', marginTop: '20px'}}>
                <Typography align="center" style={{ marginBottom: '25px' }}>
                    <Tooltip title="Crear tabla" placement="right-start" arrow>
                        <Button variant="contained" onClick={handleClick}>
                            Generar Informe Coleccion
                        </Button>
                    </Tooltip>
                </Typography>

                <Typography align="center" style={{ marginBottom: '25px' }}>
                    <Tooltip title="Crear tabla" placement="right-start" arrow>
                        <Button variant="contained" onClick={() => { handleClickUser(); recuperarUsuarios(); }}>
                            Generar Informe Usuarios
                        </Button>
                    </Tooltip>
                </Typography>
            </Paper>

            {
            (variableUser || variable) && (
            <Paper elevation={15} style={{ background:'#FFF', padding: '20px', marginTop: '20px' }}>
                {variable && 
                    <InformeColeccion datos={items}/>
                }
                {
                variableUser && 
                    <InformeUsuarios datos={itemsUser}/>
                }
            
            </Paper>
            )}
        </>
    );
}

export default Informes;
