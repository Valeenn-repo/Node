import React, { useState, useEffect } from 'react';
import TopBar from "./TopBar";
import InformeColeccion from './InformeColeccion';
import { Button, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';


function Informes() {

    
    const [items, setItems] = useState([]);

    // Estado para almacenar la variable
    const [variable, setVariable] = useState(false);

    // Función para cambiar la variable a true al hacer clic
    const handleClick = () => {
        setVariable(true);
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
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography align="center">
                    <Button variant="contained" onClick={handleClick}>Generar Informe</Button>
                </Typography>
            </Paper>
            {variable && 
                <Paper elevation={15} style={{ background:'#FFF', padding: '20px', marginTop: '20px' }}>
                    <InformeColeccion datos={items} />
                </Paper>
            }
        </>
    );
}

export default Informes;
