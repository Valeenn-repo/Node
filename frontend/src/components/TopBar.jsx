import React, {useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.login);
  const isLoggedin = userData.isAutenticated;
  const userRole = useSelector(state => state.login.userRol);

  const salir = () => {
    dispatch(loginActions.logout());
    navigate('/');
  };

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin, navigate]);


  return (
    <>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6} sm={2} container alignItems="center">
                {userRole === 'user' && <PermIdentityIcon />}
                {userRole === 'admin' && <AdminPanelSettingsIcon />}
                <Typography variant="h6">{userData.userName}</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} container justifyContent="space-around">
                <Link to='/home'>Inicio</Link>
                <Link to='/help'>Ayuda</Link>
                {userRole === 'admin' && <Link to='/informes'>Informes</Link>}
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2} container justifyContent="flex-end">
                <Button variant="contained" onClick={salir}>Salir</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default TopBar;
