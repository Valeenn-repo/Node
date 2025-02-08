import React, { useState, useEffect } from 'react';
import TopBar from "./TopBar";
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * @description Componente para la gestión de usuarios. Permite agregar y ver usuarios.
 */
function Usuarios() {

  /**
   * @description Estado para los valores del formulario de usuario.
   */
  const [formValues, setFormValues] = useState({
    id: '',
    nombre: '',
    login: '',
    password: '',
    rol: ''
  });

  /**
   * @description Maneja los cambios en los campos del formulario.
   * @param {object} e El evento de cambio.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /**
   * @description Estado para almacenar la lista de usuarios.
   */
  const [items, setItems] = useState([]);

  /**
   * @description Efecto secundario para cargar los usuarios al montar el componente.
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * @description Función para obtener los usuarios del servidor.
   */
  const fetchUsers = () => {
    fetch('http://localhost:3030/getItemsUser')
      .then(response => response.json())
      .then(data => {
        console.log("Datos recuperados (usuarios): ", data);
        if (Array.isArray(data.data)) {
          setItems(data.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos de usuarios:', error);
      });
  };

  /**
   * @description Realiza la solicitud POST para agregar un nuevo usuario.
   */
  const realizarCons = () => {
    const { id, nombre, login, password, rol } = formValues;
    console.log(id, nombre, login, password, rol);
    const url = `http://localhost:3030/addItemUser?id=${id}&nombre=${nombre}&login=${login}&password=${password}&rol=${rol}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Datos insertados (usuario):', data);
        alert("Datos insertados con éxito");
        fetchUsers(); // Actualiza la lista de usuarios después de la inserción
      })
      .catch(error => {
        console.error('Error al insertar datos de usuario:', error);
      });
  };

  /**
   * @description Maneja el envío del formulario para guardar un nuevo usuario.
   * @param {object} event El evento de envío del formulario.
   */
  const handleSaveItem = (event) => {
    event.preventDefault();
    console.log(formValues);
    realizarCons();

    setFormValues({
      id: '',
      nombre: '',
      login: '',
      password: '',
      rol: ''
    });
  };

  return (
    <>
      <TopBar />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Box component='form' autoComplete='off' onSubmit={handleSaveItem}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField label='Nombre' name="nombre" required value={formValues.nombre} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label='Login' name="login" value={formValues.login} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label='Password' name="password" value={formValues.password} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label='Rol' name="rol" value={formValues.rol} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title="Insertar campos" placement="right-start" arrow>
                <Button variant="contained" type="submit">Guardar</Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}><Typography variant="h5">Nombre</Typography></Grid>
          <Grid item xs={3}><Typography variant="h5">Login</Typography></Grid>
          <Grid item xs={3}><Typography variant="h5">Password</Typography></Grid>
          <Grid item xs={3}><Typography variant="h5">Rol</Typography></Grid>
          {items.map((item) => (
            <Grid container item spacing={2} key={item.id}>
              <Grid item xs={3}><Typography color="secondary" variant="body1">{item.nombre}</Typography></Grid>
              <Grid item xs={3}><Typography color="secondary" variant="body1">{item.login}</Typography></Grid>
              <Grid item xs={3}><Typography color="secondary" variant="body1">{item.password}</Typography></Grid>
              <Grid container item xs={3} alignItems="center" spacing={1}>
                <Grid item xs={8}><Typography color="secondary" variant="body1">{item.rol}</Typography></Grid>
                <Grid item xs={4}></Grid> {/* Espacio para futuras acciones */}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
}

export default Usuarios;