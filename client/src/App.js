// Final App.js with All Enhancements
// client/src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';
import theme from './theme';

import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Products from './components/products/Products';
import Customers from './components/customers/Customers';
import Analytics from './components/analytics/Analytics';
import Settings from './components/settings/Settings';
import Navbar from './components/layout/Navbar';

import './App.css';
import KpiCards from './components/dashboard/KpiCards';
import RecentOrders from './components/dashboard/RecentOrders';
import SalesChart from './components/dashboard/SalesChart';
import CustomerSegmentation from './components/dashboard/CustomerSegmentation';
import ProductPerformance from './components/dashboard/ProductPerformance';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Alert />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/productperformance" element={<ProductPerformance/>} /> For Testing the routes */}

                {/* Private routes wrapped with PrivateRoute */}
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/products" 
                  element={
                    <PrivateRoute>
                      <Products />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/customers" 
                  element={
                    <PrivateRoute>
                      <Customers />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <PrivateRoute>
                      <Analytics />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  } 
                  />
                <Route 
                  path="/kpicards" 
                  element={
                    <PrivateRoute>
                      <KpiCards />
                    </PrivateRoute>
                  }
                  />
                <Route 
                  path="/recentorders" 
                  element={
                    <PrivateRoute>
                      <RecentOrders />
                    </PrivateRoute>
                  }
                  />
                <Route 
                  path="/saleschart" 
                  element={
                    <PrivateRoute>
                      <SalesChart />
                    </PrivateRoute>
                  }
                  />
                <Route 
                  path="/customersegmentation" 
                  element={
                    <PrivateRoute>
                      <CustomerSegmentation />
                    </PrivateRoute>
                  }
                  />
                <Route 
                  path="productperformance" 
                  element={
                    <PrivateRoute>
                      <ProductPerformance />
                    </PrivateRoute>
                  }     
                />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
  );
};

export default App;
