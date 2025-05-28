import { combineReducers } from 'redux';
// Import your reducers here
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import analyticsReducer from './analyticsReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  analytics: analyticsReducer,
});
