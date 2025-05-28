// src/redux/actions/alertActions.js
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Action to set an alert message
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // Remove the alert after timeout milliseconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
