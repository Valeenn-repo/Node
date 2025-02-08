import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TopBar from './TopBar';

/**
 * @description Componente principal que muestra la página de inicio.
 * Permite a los usuarios agregar, ver y eliminar elementos.
 */
function Home() {
  /**
   * @description Obtiene el rol del usuario desde el estado global.
   * @returns {string} El rol del usuario.
   */
  const userRole = useSelector(state => state.login.userRol);

  /**
   * @description Estado para los valores del formulario de agregar elemento.
   */
  const [formValues, setFormValues] = useState({
    nombre: '',
    marca: '',
    tipo: '',
    precio: ''
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
   * @description Maneja el envío del formulario para guardar un nuevo elemento.
   * @param {object} event El evento de envío del formulario.
   */
  const handleSaveItem = (event) => {
    event.preventDefault();
    console.log(formValues);
    realizarCons(); // Realiza la solicitud POST para guardar el elemento

    // Limpia los campos del formulario después de guardar
    setFormValues({
      nombre: '',
      marca: '',
      tipo: '',
      precio: '',
    });
  };

  /**
   * @description Estado para almacenar la lista de elementos.
   */
  const [items, setItems] = useState([]);

  /**
   * @description Efecto secundario para cargar los elementos al montar el componente.
   */
  useEffect(() => {
    fetchItems();
  }, []);

  /**
   * @description Función para obtener los elementos del servidor.
   */
  const fetchItems = () => {
    fetch('http://localhost:3030/getItems')
      .then(response => response.json())
      .then(data => {
        console.log("Datos recuperados: ", data);
        if (Array.isArray(data.data)) {
          setItems(data.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };


  /**
   * @description Realiza la solicitud POST para agregar un nuevo elemento.
   */
  const realizarCons = () => {
    const { nombre, marca, tipo, precio } = formValues;
    console.log(nombre, marca, tipo, precio);
    const url = `http://localhost:3030/addItem?nombre=${nombre}&marca=${marca}&tipo=${tipo}&precio=${precio}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Datos insertados:', data);
        alert("Datos insertados con éxito");
        fetchItems(); // Actualiza la lista de elementos después de la inserción
      })
      .catch(error => {
        console.error('Error al insertar datos:', error);
      });
  };

  /**
   * @description Maneja la eliminación de un elemento.
   * @param {number} itemId El ID del elemento a eliminar.
   */
  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:3030/deleteItem?id=${itemId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Elemento eliminado:', data);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        alert("Datos eliminados con éxito");
      })
      .catch(error => {
        console.error('Error al eliminar elemento:', error);
      });
  };

  return (
    <>
      <TopBar />

      {/* Formulario para agregar elementos (solo visible para usuarios no invitados) */}
      {!(userRole === 'invitado') && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Box component='form' autoComplete='off' onSubmit={handleSaveItem}>
            <Grid container spacing={2}>
              {/* Campos del formulario */}
              <Grid item xs={12} md={3}>
                <TextField label='Nombre' name="nombre" required value={formValues.nombre} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label='Marca' name="marca" value={formValues.marca} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label='Tipo' name="tipo" value={formValues.tipo} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label='Precio' name="precio" value={formValues.precio} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12}>
                <Tooltip title="Insertar campos" placement="right-start" arrow>
                  <Button variant="contained" type="submit">Guardar</Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}

      {/* Lista de elementos */}
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={2}>
          {/* Encabezados de la tabla */}
          <Grid item xs={3}><Typography variant="h5">Nombre</Typography></Grid>
          <Grid item xs={3}><Typography variant="h5">Marca</Typography></Grid>
          <Grid item xs={3}><Typography variant="h5">Tipo</Typography></Grid>
          <Grid item xs={3}><Typography variant="h5">Precio</Typography></Grid>

          {/* Mapeo de los elementos */}
          {items.map((item) => (
            <Grid container item spacing={2} key={item.id}>
              <Grid item xs={3}><Typography color="secondary" variant="body1">{item.nombre}</Typography></Grid>
              <Grid item xs={3}><Typography color="secondary" variant="body1">{item.marca}</Typography></Grid>
              <Grid item xs={3}><Typography color="secondary" variant="body1">{item.tipo}</Typography></Grid>
              <Grid container item xs={3} alignItems="center" spacing={1}>
                <Grid item xs={8}><Typography color="secondary" variant="body1">{item.precio}</Typography></Grid>
                <Grid item xs={4}>
                  {/* Botón de eliminar (solo visible para administradores) */}
                  {userRole === 'admin' && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title="Eliminar" arrow>
                        <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
}

export default Home;