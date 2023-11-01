//Valentín Sánchez López
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Provider } from 'react-redux'
import store from './store/index'

const theme = createTheme({
  /*palette: {
    mode: 'light',
    primary: {
    main: '#130f14',
    light: '#c4c8e0',
    dark: '#14247b',
    contrastText: '#dacdcd',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#d6e8db',
      paper: '#daacac',
    },
    text: {
      primary: 'rgba(43,40,39,0.87)',
      secondary: 'rgba(129,118,89,0.6)',
      disabled: 'rgba(103,83,83,0.38)',
      hint: '#565269',
    },
  },

  typography: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeightLight: 1000,
    fontWeightRegular: 100,
    h1: {
      fontFamily: 'Open Sans',
    },
  },
})*/
  
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffcc80',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    secondary: {
      main: '#ffcc80',
    },
    background: {
      default: 'rgba(95,95,162,0.55)',
      paper: 'rgba(160,137,137,0.97)',
    },
    text: {
      primary: '#efebe9',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Droid Serif',
      color: '#f1c40f',
    },
    fontFamily: 'Lora',
    h3: {
      fontFamily: 'Montserrat',
      color: '#e74c3c',
    },
    h2: {
      fontFamily: 'PT Sans',
      color: '#3498db',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <CssBaseline />
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeProvider>
  </React.StrictMode>
);

