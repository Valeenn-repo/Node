import React, { useState, useEffect } from 'react';
import TopBar from "./TopBar"
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Usuarios(){
    
  const [formValues, setFormValues] = useState({
      id:'',
      nombre: '',
      login: '',
      password: '',
      rol:''
    });

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues(prevState => ({
          ...prevState,
          [name]: value
      }));
  };



  const [items, setItems] = useState([]);

  useEffect(() =>{fetch('http://localhost:3030/getItemsUser')
      .then(response => response.json())
      .then(data => {
          console.log("Prueba")
          console.log("Datos recuperados: ", data);
          if (Array.isArray(data.data)) {
              setItems(data.data); // Si 'data' es un array, actualizar 'items'
          }
      })
      .catch(error => {
          console.error('Error al obtener los datos:', error);
      // Manejar errores o mostrar mensajes de error
      });
  },[]);

  const realizarCons = () => {
      const { id, nombre, login, password, rol } = formValues;
      console.log(id, nombre, login, password, rol);
      const url = `http://localhost:3030/addItemUser?id=${id}&nombre=${nombre}&login=${login}&password=${password}&rol=${rol}`;
    
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Datos insertados:', data);
          alert("Datos insertados con éxito");
          
          // Obtener datos actualizados después de la inserción
          fetch('http://localhost:3030/getItemsUser')
            .then(response => response.json())
            .then(data => {
              console.log("Datos recuperados después de la inserción: ", data);
              if (Array.isArray(data.data)) {
                setItems(data.data); // Actualizar 'items' con los datos insertados
              }
            })
            .catch(error => {
              console.error('Error al obtener los datos después de la inserción:', error);
              // Manejar errores o mostrar mensajes de error
            });
    
        })
        .catch(error => {
          console.error('Error al insertar datos:', error);
          // Manejar errores o mostrar mensajes de error
        });
    };
    

  const handleSaveItem = (event) => {
      event.preventDefault();
      console.log(formValues);
      realizarCons(); // Realizar la solicitud GET con los valores del formulario
      
      // Limpiar los campos
      setFormValues({
        id:'',
        nombre: '',
        marca: '',
        tipo: '',
        precio: '',
      });
  }; 

  
  return(
      <>
      <TopBar/>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Box component='form' autoComplete='off' onSubmit={handleSaveItem}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label='Nombre'
                name="nombre"
                required
                value={formValues.nombre}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label='Login'
                name="login"
                value={formValues.marca}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label='Password'
                name="password"
                value={formValues.tipo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label='Rol'
                name="rol"
                value={formValues.precio}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title="Insertar campos" placement="right-start" arrow>
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant="h5">Nombre</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5">Login</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5">Password</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5">rol</Typography>
      </Grid>
      {items.map((item) => (
        <Grid container item spacing={2} key={item.id}>
          <Grid item xs={3}>
            <Typography color="secondary" variant="body1">{item.nombre}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="secondary" variant="body1">{item.login}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="secondary" variant="body1">{item.password}</Typography>
          </Grid>
          <Grid container item xs={3} alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <Typography color="secondary" variant="body1">{item.rol}</Typography>
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Paper>
      </>
  )
}

export default Usuarios;