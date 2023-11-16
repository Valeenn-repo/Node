//Valentín Sánchez López
import React, { useState } from 'react';
import Button from '@mui/material/Button'
import {Box} from '@mui/material';
import {TextField } from '@mui/material';
import { Typography } from '@mui/material';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import { useNavigate } from 'react-router-dom';

//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux';
//Importamos el componente loginActions que está en el fichero storelogin.js
import { loginActions } from '../store/storelogin';



function LoginService() {
  
  // Define el estado para el nombre de usuario y la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

const isVerifiedUser = () => {
  if (!username || !password) {
    console.log('Por favor, introduce el nombre de usuario y la contraseña');
    return;
  }
  fetch(`http://localhost:3030/login?user=${username}&password=${password}`)
    .then(response => response.json())
    .then(response => {
        if (response && response.data.nombre && response.data.rol) {
            console.log('Autenticación exitosa:');
            console.log('Nombre:', response.data.nombre);
            console.log('Rol:', response.data.rol);
            if (response.data.nombre !== undefined) {
              console.log('entro, hago el dispatch y luego navego')
              //aquí pongo el dispatch para cambiar el estado a login en el store del redux
              dispatch(loginActions.login({
                name: response.data.nombre,
                rol: response.data.rol  
              }))
              navigate('/home')
            }    
          } else {
            console.log('Error de autenticación:', response);
          }
    })
    .catch(error => {
      console.error('Error al procesar la respuesta:', error);
    });
}

const handleLogin = (e) => {
    e.preventDefault();
    isVerifiedUser(); // Llama a la función
  }

  return (
    <Grid
      container
      justifyContent="center" // Centra el contenido horizontalmente
      alignItems="center" // Centra el contenido verticalmente
      sx={{ height: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} square>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* Ícono o imagen de usuario */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Acceder
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt:3 }}
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}


export default LoginService;

/*
function Login () {
const [login, setLogin] = useState('')

const isVerifiedUser = () => {
    fetch(`http://localhost:3030/login?user=${login}&password=${'123456789'}`)
    .then(response => response.json())
    .then(response => {
        if (response) {
          console.log(response)   
        }
})}

const handleSubmit = (e) => {
    e.preventDefault();

    isVerifiedUser()
    console.log(login)
}
return<>
    <Box
        component = "form"
        onSubmit={handleSubmit}
    >
        <TextField
            id = "login"
            label = "Usuario"
            variant = 'outlined'
            fullWidth
            autoFocus
            value = {login}
            onChange={(event) => setLogin(event.target.value)}
        >

        </TextField>
        <Button
            type='submit'
            variant='contained'
            fullWidth
        >
            Acceder
        </Button>
    </Box>

</>
}
export default Login
*/
/*
<Container>
        <text>HOLA</text>
        <Typography variant="h1">App con typography</Typography>
        <Typography variant="h2">App con typography</Typography>
        <Typography variant="h3">App con typography</Typography>
        <Button color="success" variant='text'>Hola</Button>
        <Button color="secondary" variant='outlined'>Hola</Button>
        <Button onClick={() => {
            alert('Pulsado');
        }}
            color="primary" variant="contained">Click 
        </Button>
    </Container>
*/
