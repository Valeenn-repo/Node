  import React, { useState, useEffect } from 'react';
  import Button from '@mui/material/Button';
  import { Box, Container, TextField } from '@mui/material';
  import Typography from '@mui/material/Typography';
  import Grid from '@mui/material/Grid';
  import Paper from '@mui/material/Paper';
  import AppBar from '@mui/material/AppBar';
  import Toolbar from '@mui/material/Toolbar';
  import { Link, useNavigate } from 'react-router-dom';
  import { useSelector, useDispatch } from 'react-redux';
  import { loginActions } from '../store/storelogin';
  import DeleteIcon from '@mui/icons-material/Delete';
  import Tooltip from '@mui/material/Tooltip';
  import PermIdentityIcon from '@mui/icons-material/PermIdentity';

  function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.login);
    const isLoggedin = userData.isAutenticated;

    useEffect(() => {
      if (!isLoggedin) {
        navigate('/');
      }
    }, [isLoggedin, navigate]);

    const salir = () => {
      dispatch(loginActions.logout());
      navigate('/');
    };

    const [formValues, setFormValues] = useState({
      nombre: '',
      marca: '',
      tipo: '',
      precio:''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSaveItem = (event) => {
      event.preventDefault();
      console.log(formValues);
      realizarCons(); // Realizar la solicitud GET con los valores del formulario
    };

    
    

    // En el componente Home
  const [items, setItems] = useState([]); // Estado para almacenar los datos obtenidos

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



  const realizarCons = () => {
    const { nombre, marca, tipo, precio } = formValues;
    console.log(nombre, marca, tipo, precio);
    const url = `http://localhost:3030/addItem?nombre=${nombre}&marca=${marca}&tipo=${tipo}&precio=${precio}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Datos insertados:', data);
        alert("Datos insertados con éxito");
        
        // Obtener datos actualizados después de la inserción
        fetch('http://localhost:3030/getItems')
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
  
    /*const realizarCons = () => {
      const { nombre, marca, tipo, precio } = formValues;
      console.log(nombre, marca, tipo, precio);
      const url = `http://localhost:3030/addItem?nombre=${nombre}&marca=${marca}&tipo=${tipo}&precio=${precio}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('Datos insertados:', data);
          alert("Datos insertados con éxito");

          
        })
        .catch(error => {
          console.error('Error al insertar datos:', error);
          // Manejar errores o mostrar mensajes de error
        });
  };
*/

  const handleDeleteItem = (itemId) => {
    // Realiza una solicitud DELETE al servidor para eliminar el elemento con el ID proporcionado
    fetch(`http://localhost:3030/deleteItem?id=${itemId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Elemento eliminado:', data);
        // Actualiza la lista de elementos después de eliminar uno
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        alert("Datos eliminados con éxito");
      })
      .catch(error => {
        console.error('Error al eliminar elemento:', error);
        // Manejar errores o mostrar mensajes de error
      });
  };

    return (
      <>
        <AppBar position='static'>
          <Container>
            <Toolbar>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={6} sm={2} container alignItems="center">
                  <PermIdentityIcon/>
                  <Typography variant="h6">{userData.userName}</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} container justifyContent="space-around">
                  <Link to='/home'>Inicio</Link>
                  <Link to='/help'>Ayuda</Link>
                  <Link to='/informs'>Informes</Link>
                </Grid>
                <Grid item xs={6} sm={3} md={2} lg={2} container justifyContent="flex-end">
                  <Button variant="contained" onClick={salir}>Salir</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        
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
                  label='Marca'
                  name="marca"
                  value={formValues.marca}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label='Tipo'
                  name="tipo"
                  value={formValues.tipo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label='Precio'
                  name="precio"
                  value={formValues.precio}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
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
          <Typography variant="h5">Marca</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">Tipo</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">Precio</Typography>
        </Grid>
        {items.map((item) => (
          <Grid container item spacing={2} key={item.id}>
            <Grid item xs={3}>
              <Typography color="secondary" variant="body1">{item.nombre}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="secondary" variant="body1">{item.marca}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="secondary" variant="body1">{item.tipo}</Typography>
            </Grid>
            <Grid container item xs={3} alignItems="center" spacing={1}>
              <Grid item xs={8}>
                <Typography color="secondary" variant="body1">{item.precio}</Typography>
              </Grid>
              <Grid item xs={4}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Eliminar" arrow>
                <DeleteIcon
                  onClick={() => handleDeleteItem(item.id)}
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
              </div>
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
