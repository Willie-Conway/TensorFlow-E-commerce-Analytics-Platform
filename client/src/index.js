// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';           
import store from './redux/store';                
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';  // <-- import ThemeProvider & createTheme

const theme = createTheme({
  // You can customize the theme here if needed
  // e.g. palette, typography, spacing, etc.
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>                  {/* <-- Wrap app with ThemeProvider */}
      <Provider store={store}>                      
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
