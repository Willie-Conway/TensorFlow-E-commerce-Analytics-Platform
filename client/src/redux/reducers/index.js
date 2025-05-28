// client/src/redux/reducers/index.js

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import analyticsReducer from './analyticsReducer';
import ordersReducer from '../orders/orderSlice'; // <-- Import your ordersSlice

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  analytics: analyticsReducer,
  orders: ordersReducer, // <-- Add it to the root reducer
});

