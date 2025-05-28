// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';           // ✅ Import Provider
import store from './redux/store';                // ✅ Import your store
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>                      {/* ✅ Provide store */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
