// client/src/App.js - Main application component

// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import { loadUser } from './redux/actions/authActions';
// import setAuthToken from './utils/setAuthToken';

// import PrivateRoute from './components/routing/PrivateRoute';
// import Alert from './components/layout/Alert';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import Dashboard from './components/dashboard/Dashboard';
// import Navbar from './components/layout/Navbar';

// import './App.css';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

// const App = () => {
//   useEffect(() => {
//     store.dispatch(loadUser());
//   }, []);

//   return (
//     <Provider store={store}>
//       <Router>
//         <div className="App">
//           <Navbar />
//           <Alert />
//           <Switch>
//             <Route exact path="/login" component={Login} />
//             <Route exact path="/register" component={Register} />
//             <PrivateRoute exact path="/" component={Dashboard} />
//           </Switch>
//         </div>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


// Final App.js with All Enhancements
// client/src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store';
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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Alert />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/products" component={Products} />
                <PrivateRoute exact path="/customers" component={Customers} />
                <PrivateRoute exact path="/analytics" component={Analytics} />
                <PrivateRoute exact path="/settings" component={Settings} />
              </Switch>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;