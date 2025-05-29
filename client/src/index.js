// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';           
import store from './redux/store';                
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { StylesProvider } from '@mui/styles';      // Import StylesProvider
import { ThemeProvider, createTheme } from '@mui/material/styles';  // Import ThemeProvider and createTheme

const theme = createTheme({
  // Customize your theme here if needed, e.g. palette, typography, spacing, etc.
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StylesProvider injectFirst>                {/* Wrap app with StylesProvider */}
      <ThemeProvider theme={theme}>              {/* Wrap app with ThemeProvider */}
        <Provider store={store}>                  {/* Wrap app with Redux Provider */}
          <App />
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>
);

reportWebVitals();
