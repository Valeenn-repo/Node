 //Valentín Sánchez López
import React, { useState } from 'react';
import Button from '@mui/material/Button'
import {Box} from '@mui/material';
import { Container, TextField } from '@mui/material';
import { Typography } from '@mui/material';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

//Importamos el useSelector del react-redux
import { useSelector } from 'react-redux';
//import login from '../store/storelogin';
import { loginActions } from '../store/storelogin';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'


function Home() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   //Almacenamos en la variable userData el estado del store
   const userData = useSelector(state => state.login)

   //Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente
   const isLoggedin = userData.isAutenticated
   useEffect(() => {
      if (!isLoggedin) {
         navigate('/')
      }
   }, [isLoggedin, navigate])

   //Comprobamos por la consola qué obtenemos en userData
   console.log(userData)

   const salir = (e) => {
      dispatch(loginActions.logout())
      navigate('/')
    }
  
   return <>
      <Grid
         container
         justifyContent="center" // Centra el contenido horizontalmente
         alignItems="center" // Centra el contenido verticalmente
         sx={{ height: '25vh' }}
      >
         <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
            }}
          >
            <h1>Página de Home de Valentín Sánchez López</h1>
            <h2>Nombre de usuario: {userData.userName} <br/> Rol: {userData.userRol}</h2>
            <Button type = "exit"
                     fullWidth
                     variant="contained"
                     sx={{ mt:3 }}
                     onClick={salir}
                  >
                     Salir
            </Button>
         </Box>
      </Grid>
   </>
}
export default Home